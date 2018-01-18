const basicAuth = (req, res, next) => {
  const { healthCheckPath } = req.app.locals;

  const success = () => {
    res.statusCode = 200;
    res.end("Success");
  };

  if (req.path === healthCheckPath) {
    return success();
  }

  return next();
};

export default basicAuth;
