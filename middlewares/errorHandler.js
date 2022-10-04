const { logger } = require("../utils/logger");
const Boom = require("@hapi/boom");

module.exports = {
  errorHandler: (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    logger.error(err.name + " - " + err.message);
    res.status(err.output ? err.output.statusCode : 500).json(
      err.output
        ? { errorMessage: err.message }
        : { errorMessage: "[" + err.name + "] " + "There was a problem processing your request. Please try again." }
    );
  },
  routerError: (req, res, next) => {
    try {
      throw Boom.badGateway(
        `${req.method} ${req.originalUrl} 라우터 에러입니다.`
      );
    } catch (err) {
      next(err);
    }
  },
  //controllers부분 try catch 생략 미들웨어
  wrapAsyncController: function tryCatch(fn) {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  },
};
