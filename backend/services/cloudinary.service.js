const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "duablkvrr",
  api_key: "294353543739867",
  api_secret: "BysafLgARg7RDl56R7VE59aIlg8",
});

const uploadOnCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

module.exports = { uploadOnCloudinary };
