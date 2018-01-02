import querystring from 'querystring';

const redirect = (res, req, code, url) => {
  const queryString = querystring.stringify(req.query) ?
    `?${querystring.stringify(req.query)}` :
    '';
  return res.redirect(code, url + queryString);
};

export default redirect;
