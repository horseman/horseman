const iplocation = require("iplocation");

const geoMiddleware = (req, res, next) => {
  if (parseInt(ip.split(".")[0], 10) === 10) {
    req.geoip = { attributes: null };
    next();
    return;
  }
  iplocation(req.ip)
    .then(result => {
      req.geoip = { attributes: result };
      next();
    })
    .catch(() => {
      req.geoip = { attributes: null };
      next();
    });
};

export default geoMiddleware;
