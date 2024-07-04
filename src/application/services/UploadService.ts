import multer from "multer";
import path from "path";
import { PathLike } from "fs";
import { promises as fs } from "fs";
import { UPLOADS_PATH } from "@/config/env.config";

async function createDirIfNotExists(directory: PathLike) {
  fs.access(directory).catch(() => {
    fs.mkdir(directory, { recursive: true });
  });
}

const imagesPath = path.resolve(UPLOADS_PATH, "./images");
const videoPath = path.resolve(UPLOADS_PATH, "./videos");
const galleryPath = path.resolve(UPLOADS_PATH, "./gallery");

createDirIfNotExists(imagesPath);
createDirIfNotExists(videoPath);
createDirIfNotExists(galleryPath);

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + "_" + file.originalname);
  },
});

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videoPath);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + "_" + file.originalname);
  },
});

const galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, galleryPath);
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
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

export const uplaodVideo = multer({
  dest: videoPath,
  storage: videoStorage,
  fileFilter: function (req, file, cb) {
    ensureIsSupported(file, cb, /mov|mp4/);
  },
});

export const uploadGallery = multer({
  dest: galleryPath,
  storage: galleryStorage,
  fileFilter: function (req, file, cb) {
    ensureIsSupported(file, cb, /jpg|jpeg|png|heic|webp/);
  },
});
