const { User } = require("../database/models/user.model");
const { uploadOnCloudinary } = require("../services/cloudinary.service");
const { Upload } = require("../database/models/upload.model");
const { upload } = require("../services/multer.service");
exports.Register = async function (req, res) {
  try {
    let { email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this credential already exists" });
    }

    let user = await User.create({ email, password });
    user.save();
    res.status(201).send({
      message: "Registered Successfully",
      user: { email: user.email, _id: user._id },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.Login = async function (req, res) {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User isn't registered yet!!" });
    }
    let isPassCorrect = await user.isPasswordCorrect(password);

    if (!isPassCorrect) {
      return res.status(400).json({ message: "Password is incorrect!!" });
    }

    req.session.user_sid = user._id;
    res
      .status(200)
      .cookie("user_sid", user._id, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .send({
        message: "Logged in successfully",
        user: { email: user.email, _id: user._id },
      });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

exports.Logout = function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Something went wrong while logging out" });
    }
    res.clearCookie("user_sid");
    return res.status(200).json({ message: "Logged out successfully" });
  });
};

exports.Upload = async function (req, res) {
  let { title, description } = req.body;
  let image = req.files?.image;
  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }
  let user = await User.findById(req.cookies?.user_sid);

  if (!user) {
    return res.status(400).json({ message: "User does not found" });
  }
  let uploadedImage = await uploadOnCloudinary(image[0].buffer);

  let upload = await Upload.create({
    title: title,
    description,
    upload: uploadedImage.secure_url,
  });

  user.uploads.push(upload._id);
  user.save();
  upload.save();
  return res
    .status(200)
    .json({ message: "Upload created successfully", upload });
};

exports.myUploads = async function (req, res) {
  let user = await User.findById(req.cookies.user_sid).populate("uploads");

  if (!user) {
    return res.status(400).json({ message: "User does not found" });
  }
  return res.status(200).json({ user: user.uploads });
};

exports.allUploads = async function (req, res) {
  let uploads = await Upload.find({});
  return res.status(200).json({ user: uploads });
};

exports.incomingUploadView = async function (req, res) {
  let { uploadId } = req.params;
  let image = await Upload.findById(uploadId);
  console.log(image, "image");
  image.views++;
  image.save();
  return res.status(200).json({
    image,
    message: "One view added",
    view: image.views,
  });
};

exports.checkSession = async function (req, res) {
  if (req.cookies.user_sid) {
    return res.send(true);
  } else {
    return res.send(false);
  }
};
