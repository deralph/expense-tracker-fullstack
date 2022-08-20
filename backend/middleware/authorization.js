const { Unauthorized, BadRequest } = require("../error");
const jwt = require("jsonwebtoken");
const authMiiddleware = (req, res, next) => {
  const bearerToken = req.headers;
  const {
    cookies: { token },
  } = req;
  console.log(req.cookies);
  console.log(bearerToken);

  console.log(token);

  if (!token) {
    throw new Unauthorized("no token available");
  }
  decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    throw new BadRequest("something went wrong");
  }
  req.user = { userId: decoded.userId, username: decoded.username };
  next();
};

module.exports = authMiiddleware;
