import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

async function uploadImage(image) {
  const result = await cloudinary.v2.uploader.upload(image, {
    transformation: [
      { gravity: "face", height: 400, width: 400, crop: "crop" },
      { radius: "max" },
      { width: 200, crop: "scale" },
    ],
  });
  const imageData = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  return imageData;
}

export default uploadImage;
