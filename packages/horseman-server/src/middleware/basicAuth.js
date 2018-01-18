import auth from "basic-auth";

const basicAuth = (req, res, next) => {
  const credentials = auth(req);

  const unauthorized = () => {
    res.statusCode = 401;
    res.setHeader("WWW-Authenticate", 'Basic realm="example"');
    res.end("Access denied");
  };

  if (!credentials) {
    return unauthorized();
  }

  const { accounts } = req.app.locals.authentication;

  if (!accounts instanceof Array) {
    return unauthorized();
  }

  const isValid = accounts.some(
    account =>
      account.name === credentials.name && account.pass === credentials.pass,
  );

  if (!isValid) {
    return unauthorized();
  }

  return next();
};

export default basicAuth;
