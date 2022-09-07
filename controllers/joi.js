const joi = require("joi");

class Joi {
  createCommentSchema = joi.object({
    comment: joi.string().min(1).required(),
  });

  emailAuthSchema = joi.object({
    email: joi
      .string()
      .pattern(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/)
      .required(),
  });

  emailAuthCheckSchema = joi.object({
    email: joi
      .string()
      .pattern(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/)
      .required(),
    emailAuthNumber: joi.number().min(1).required(),
  });

  deleteUserInfoSchema = joi.object({
    password: joi
      .string()
      .pattern(
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&()_+=]{8,20}$/
      )
      .required(),
  });
}

module.exports = Joi;
