import * as express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import cors from 'cors';
import { version } from '../../package.json';
import { assignid, accessLogStream } from './helper';
import { assignMorganToken } from './middlewares';

export default async ({ app }) => {
  app.use(cors()); // ! ➡️ Enable Cors
  app.use(bodyParser.urlencoded({ extended: false }));

  // ! ➡️ Set Morgan Options

  assignMorganToken(); // ! ➡️ Use Morgan Middelwares
  app.use(assignid); // ! ➡️ Assign Unique Id to Logs
  app.use(
    morgan(':id :param :method :status :url "HTTP/:http-version"', {
      stream: accessLogStream(),
    })
  );

  // --> ...More middlewares

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
