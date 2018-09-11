const iplocation = require("iplocation");

const geoMiddleware = (req, res, next) => {
  iplocation(req.ip).then(result => {
    req.geoip = result;
    next();
  }).catch( () => {
    req.geoip = {attributes:null};
    next();
  });
};

export default geoMiddleware;
