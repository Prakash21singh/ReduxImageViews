const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    toLowerCase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  uploads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

exports.User = mongoose.model("User", userSchema);
