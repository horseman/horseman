import redirect from '../helpers/redirect';

const removeTrailingSlash = (req, res, next) => {
  if (req.path.toLowerCase() !== req.path) {
    const newPath = req.path.toLowerCase();
    return redirect(res, req, 301, newPath);
  }
  return next();
};

export default removeTrailingSlash;
