import multer from "multer";
import path from "path";
import { PathLike } from "fs";
import { promises as fs } from "fs";
import { UPLOADS_PATH } from "@/config/env.config";
import { fileURLToPath } from "url";

async function createDirIfNotExists(directory: PathLike) {
  fs.access(directory).catch(() => {
    fs.mkdir(directory, { recursive: true });
  });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath =
  UPLOADS_PATH || path.join(__dirname, "./../../static/images");

const imagesPath = path.resolve(uploadsPath, "./");

createDirIfNotExists(imagesPath);

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + "_" + file.originalname);
  },
});

function ensureIsSupported(file: any, cb: any, fileTypes: RegExp) {
  const extension = fileTypes.test(path.extname(file.originalname));
  if (extension) {
    return cb(null, true);
  } else {
    cb("Not Supported");
  }
}
export const uploadImage = multer({
  dest: imagesPath,
  storage: imageStorage,
  fileFilter: function (req, file, cb) {
    ensureIsSupported(file, cb, /jpg|jpeg|png|heic|webp/);
  },
});
