import "reflect-metadata";
import "express-async-errors";
import { Server } from "./config/server";



const server = new Server({
    port: 1209,
});

server.start();
