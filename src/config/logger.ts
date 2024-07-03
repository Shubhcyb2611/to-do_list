import pino from "pino";
import { ENV } from "./env.config";


const streams = [{ stream: process.stdout }];

export const Logger = pino(
    {
        level: ENV === "PROD" ? "error" : "info",
    },
    pino.multistream(streams)
);
