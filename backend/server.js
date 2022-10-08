const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { socket } = require("./utils/socket");
const server = require("http").createServer(app);
socket.init(server);
const {
  youtubeTranscriberController,
} = require("./controller/youtube-transcriber");

const { youtubeTestController } = require("./controller/youtube-transcriber");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.post("/api/transcribe", youtubeTranscriberController);
app.post("/test/transcribe", youtubeTestController);

server.listen(port);
