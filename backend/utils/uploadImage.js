import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: 'arpit7xx',
  api_key: '797233148615947',
  api_secret: 'lsXgwHBZbYvwOaZZssmrBCrKh0o'
})

async function uploadImage(image) {
  const result = await cloudinary.v2.uploader.upload(image, {
    transformation: [
      { gravity: "face", height: 300, width: 200, crop: "crop" },
      { radius: "max" },
      { width: 150, crop: "scale" },
    ],
  });
  const imageData = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  return imageData;
}

export default uploadImage;
