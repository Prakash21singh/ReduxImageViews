exports.isLoggedIn = function (req, res, next) {
  console.log(req.cookies.user_sid, "COOKIE");
  if (req.session.user_sid || req.cookies.user_sid) {
    next();
  } else {
    res.status(400).json({ message: "Unauthorised request" });
  }
};
