import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// })

cloudinary.config({
  cloud_name: 'arpit7xx',
  api_key: '797233148615947',
  api_secret: 'lsXgwHBZbYvwOaZZssmrBCrKh0o'
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
