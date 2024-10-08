import express from "express";
const app = express()
import cors from "cors";
import { setEventListeners } from "./communion/socket.js";
import http from "http"
const httpServer = http.Server(app)
const PORT = 2000
import { Server } from "socket.io";
export const socketIO = new Server(httpServer, {
    cors: {
        origin: [
            "http://localhost:3001",
            "https://communion-io.vercel.app"
        ],
    }
});

app.use(cors())

setEventListeners(socketIO)

   
httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});