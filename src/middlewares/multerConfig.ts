import multer from "multer";

const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024,
  video: 100 * 1024 * 1024,
  document: 50 * 1024 * 1024,
  audio: 20 * 1024 * 1024,
  default: 10 * 1024 * 1024,
};

export const uploadFile = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: FILE_SIZE_LIMITS.video,
  },

  fileFilter: (req: any, file, callback) => {
   
    callback(null, true);
  },
}).any();
