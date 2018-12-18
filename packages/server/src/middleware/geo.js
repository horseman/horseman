const iplocation = require("iplocation");

const geoMiddleware = (req, res, next) => {
  if (req.ip === undefined || parseInt(req.ip.split(".")[0], 10) === 10) {
    req.geoip = { attributes: null };
    next();
    return;
  }
  iplocation(req.ip,['https://api.db-ip.com/v2/free/*/'])
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
