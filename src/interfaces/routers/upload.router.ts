import { Router } from "express";
import { UploadsController } from "../controllers";
import { uploadImage } from "@/application/services";

const router = Router();

const uploadController = new UploadsController();

router
  .route("/images")
  .post(uploadImage.single("image"), uploadController.handleNewImageUpload);

export default router;
