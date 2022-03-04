import morgan from 'morgan';

export const assignMorganToken = () => {
  morgan.token('id', function getId(req) {
    return req.id;
  });

  morgan.token('param', function (req, res, param) {
    return 'userToken';
  });
};
