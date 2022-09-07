const { logger } = require("../logger");
const Boom = require("@hapi/boom");

module.exports = {
  errorHandler: (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    logger.error(`${err.stack}`);
    res.status(err.output.statusCode || 500).json({
      errorMessage: err.message,
    });
  },
  routerError: (req, res, next) => {
    try {
      throw Boom.badRequest(
        `${req.method} ${req.originalUrl} 라우터 에러입니다.`
      );
    } catch (err) {
      next(err);
    }
  },
};
