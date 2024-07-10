import { Request, Response } from "express";
import {
  AWS_S3_BUCKET_REGION,
  AWS_S3_BUCKET_ACCESS_KEY,
  AWS_S3_BUCKET_ACCESS_SECRET,
  AWS_S3_BUCKET_NAME,
} from "@/config/env.config";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
  region: AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_S3_BUCKET_ACCESS_KEY,
    secretAccessKey: AWS_S3_BUCKET_ACCESS_SECRET,
  },
});

export class UploadsController {
  handleNewImageUpload = async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!req.file) throw new Error("400::no file attached");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const file = req.file;
    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await s3.send(command);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.json({ uri: `/api/uploads/images/${req.file.filename}` });
  };

  async getObjectUrl(key) {
    const command = new GetObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
    });
    const url = getSignedUrl(s3, command);

    return url;
  }

  getURl = async (req: Request, res: Response) => {
    const url = await this.getObjectUrl("Delete.png");
    return res.status(200).json(url);
  };
}
