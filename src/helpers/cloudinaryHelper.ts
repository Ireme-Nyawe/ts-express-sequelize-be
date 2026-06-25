import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});
interface UploadOptions  {
  folder: string,
};

export const uploadMedia = async (
  fileBuffer: Buffer,
  options: UploadOptions,
) => {
  try {
    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder,
          resource_type: "auto",
          allow_filneame: true,
        },
        (error, result) => {
          if (error) return reject(error);

          resolve(result);
        }
      );

      stream.end(fileBuffer);
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
    };
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};