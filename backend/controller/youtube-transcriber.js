const {
  YtAudioDownloadService,
} = require("../services/AudioDownloaderService");
const speechSdk = require("microsoft-cognitiveservices-speech-sdk");

const { Transcribe } = require("../services/Transcribe");
const { socket } = require("../utils/socket");
const io = socket.get();
let client = null;

const loadingStates = [
  "Video is being downloaded",
  "Video is being transcribed",
];

io.on("connection", (socket) => {
  client = socket;
  console.log("client connected");
  client.on("disconnect", () => {
    console.log("client disconnected");
  });
});

function youtubeTranscriberController(req, res) {
  const dummyResponse = {
    summary: "This is a summary",
    sentences: [
      { sentence: "sentence1", toxicity: true },
      { sentence: "sentence2", toxicity: false },
    ],
  };

  res.json(dummyResponse);
}

async function youtubeTestController(req, res) {
  try {
    const videoUrl = "https://www.youtube.com/shorts/ONfI1mC8Jw0";

    client.emit("loading", JSON.stringify({ message: loadingStates[0] }));
    const audioDownloader = new YtAudioDownloadService();
    const fileDestination = await audioDownloader.downloadAudio(videoUrl);
    const youtubeTranscriber = new Transcribe(speechSdk);
    client.emit("loading", JSON.stringify({ message: loadingStates[1] }));

    // const transcript = await youtubeTranscriber.convertSpeechIntoText(
    //   fileDestination
    // );
    const transcript = `demo`;
    res.send(JSON.stringify({ transcript: transcript }));
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
}

exports.youtubeTranscriberController = youtubeTranscriberController;
exports.youtubeTestController = youtubeTestController;
