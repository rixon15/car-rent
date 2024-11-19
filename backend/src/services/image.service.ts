import { v2 as cloudinary } from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../constants/env";

//image => base64 format
export const uploadImage = async (image: string) => {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });

  const opts = {
    overwrite: true,
    invalidate: true,
    resoruce_type: "auto",
  };

  const uploadResult = await cloudinary.uploader
    .upload(image, opts)
    .catch((error) => {
      console.log(error);
    });

  return uploadResult?.url;
};
