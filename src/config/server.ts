import express, { Application } from "express";
import { UPLOADS_PATH } from "./env.config";
import { appRouter } from "@/interfaces/routers";
import { AppDataSource } from "@/infrastructure";
import { Logger } from "./logger";
import { ExpressErrorHandler, corsConfig } from "@/interfaces/middleware";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppConfig = {
  port?: number | string;
};

export class Server {
  private app: Application;
  private config: AppConfig;

  constructor(config: AppConfig) {
    this.config = config;
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors(corsConfig));
    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./../index.html"));
    });
    const uploadsPath = UPLOADS_PATH || path.join(__dirname, "./../static");
    if (UPLOADS_PATH) {
      this.app.use("/api/uploads", express.static(uploadsPath));
    }

    this.app.use("/api", appRouter);
    this.app.use(ExpressErrorHandler);
  }

  private connectDatabase() {
    AppDataSource.initialize()
      .then(() => {
        Logger.info("Database connection instantiated");
      })
      .catch((e) => {
        Logger.error(e);
        throw new Error("500::Failed to connect to database");
      });
  }

  start() {
    const port = this.config.port;
    this.connectDatabase();

    this.app.listen(port, () => {
      Logger.info(`Server started on http://localhost:${port}`);
    });
  }
}
