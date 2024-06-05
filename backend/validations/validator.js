const {
  validateLoginData,
  validateRegisterData,
  validateUploadData,
} = require("./body.validation");

const validateLogin = function (req, res, next) {
  let { error } = validateLoginData.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateRegister = function (req, res, next) {
  let { error } = validateRegisterData.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateUpload = function (req, res, next) {
  let { error } = validateUploadData.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateLogin, validateRegister, validateUpload };
