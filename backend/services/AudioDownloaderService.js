const { MediaDownloader } = require("../services/media-downloader");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const { MediaConverter } = require("../services/media-converter");
const audioPreset = {
  quality: "highestaudio",
  filter: "audioonly",
};

class YtAudioDownloadService {
  async downloadAudio(videoUrl) {
    const youtubeDownloader = new MediaDownloader(ytdl);
    youtubeDownloader.setStream(videoUrl, audioPreset);
    const videoId = await youtubeDownloader.getVideoId(videoUrl);
    console.log(videoId);
    const audioConverter = new MediaConverter(ffmpeg);
    const stream = youtubeDownloader.getStream();
    const fileDestination = `./audio-files/${videoId}.wav`;
    await audioConverter.convertAudio(stream, "wav", fileDestination);

    return fileDestination;
  }
}

exports.YtAudioDownloadService = YtAudioDownloadService;
