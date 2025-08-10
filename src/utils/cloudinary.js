import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

// Upload an image

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // console.log("Cloudinary localfile path:", localFilePath);
    if (!localFilePath) return null;

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    // console.log("file is successfully uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Cloudinary error: ", error);
    fs.unlinkSync(localFilePath); // remove the locally saved the temporary file as the upload got failed
    return null;
  }
};

export { uploadOnCloudinary };
