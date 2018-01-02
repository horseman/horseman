import redirect from '../helpers/redirect';

const removeTrailingSlash = (req, res, next) => {
  if (req.path !== '/' && req.path.substr(req.path.length - 1) === '/') {
    const newPath = req.path.substr(0, req.path.length - 1);
    return redirect(res, req, 301, newPath);
  }
  return next();
};

export default removeTrailingSlash;
