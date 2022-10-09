import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { version } from '../../package.json';
import { assignid, accessLogStream } from './helper';
import { assignMorganToken } from './middlewares';
import config from '../../config';

export default async ({ app }) => {
  app.use(helmet()); // ? Use Helmet to add extra protection

  // ! ➡️ Enable Cors
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'development'
          ? config.devAdminURL
          : /admin.example.com$/,
      credentials: true,
    })
  );

  // ! ➡️ Use parser's
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(cookieParser());

  // ! ➡️ Set Morgan Options
  assignMorganToken(); // ! ➡️ Use Morgan Middelwares
  app.use(assignid); // ! ➡️ Assign Unique Id to Logs
  app.use(
    morgan(':id :param :method :status :url "HTTP/:http-version"', {
      stream: accessLogStream(),
    })
  );

  // --> ...More middlewares...  <-- //

  // ! BELOW CODE IS FOR --> Make it able to use routes
  require('../api/v1/routes/index')(app);

  // ! ➡️ Health Testing API Calls
  app.get('/', (_, res) => res.send(`server is up on version ${version}`));
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.enable('trust proxy');

  // --> Return the express app
  return app;
};
