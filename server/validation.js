const joi = require("joi");

const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const addBookValidation = (data) => {
  const schema = joi.object({
    title: joi.string().required(),
    subtitle: joi.string(),
    authors: joi.array().items(joi.string().required()).required(),
    publisher: joi.string(),
    publishedDate: joi.date(),
    description: joi.string(),
    industryIdentifiers: joi
      .array()
      .items(
        joi
          .object({
            type: joi.string().required(),
            identifier: joi.string().required(),
          })
          .required()
      )
      .required(),
    imageLinks: joi
      .object({
        smallThumbnail: joi.string().required(),
        thumbnail: joi.string().required(),
      })
      .required(),
    language: joi.string(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation, addBookValidation };
