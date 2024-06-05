const Validator = require("../validations/validator");
const User = require("../controllers/user.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");
const { upload } = require("../services/multer.service");
exports.routeConfig = function (app) {
  app.post("/hubx/api/v1/user/login", [
    upload.none(),
    Validator.validateLogin,
    User.Login,
  ]);
  app.post("/hubx/api/v1/user/register", [
    upload.none(),
    Validator.validateRegister,
    User.Register,
  ]);
  app.post("/hubx/api/v1/user/logout", [isLoggedIn, User.Logout]);
  app.post("/hubx/api/v1/user/upload", [
    isLoggedIn,
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    Validator.validateUpload,
    User.Upload,
  ]);
  app.get("/hubx/api/v1/user/myupload", [isLoggedIn, User.myUploads]);
  app.get("/hubx/api/v1/user/uploads", [isLoggedIn, User.allUploads]);
  app.post("/hubx/api/v1/user/upload/:uploadId", [
    isLoggedIn,
    User.incomingUploadView,
  ]);

  app.post("/hubx/api/v1/user/checkSession", [isLoggedIn, User.checkSession]);
};
