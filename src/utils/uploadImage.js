const cloudinary = require("cloudinary/lib/cloudinary");

cloudinary.config({
  cloud_name: "dganievjp",
});

export default async function uploadImage(path) {
  const result = await cloudinary.v2.uploader.unsigned_upload(path, "ipdmoc98");
  return result.secure_url;
}
