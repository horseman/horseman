const removeTrailingSlash = (req, res, next) => {
  if(req.path !== "/" && req.path.substr(req.path.length-1) === "/"){
    return res.redirect(301,req.path.substr(0,req.path.length-1));
  }
  return next();
};

export default removeTrailingSlash;
