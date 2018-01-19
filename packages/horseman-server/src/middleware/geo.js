import where from "node-where";

const geoMiddleware = (req, res, next) => {
  where.is(req.ip, function(err, result) {
    req.geoip = result;
    next();
  });
};

export default geoMiddleware;
