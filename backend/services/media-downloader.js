class MediaDownloader {
  constructor(mediaLibrary) {
    this.mediaLibrary = mediaLibrary;
  }

  async getVideoId(videoUrl) {
    let info = await this.mediaLibrary.getBasicInfo(videoUrl);
    return info.videoDetails.videoId;
  }
  setStream(videoUrl, options) {
    this.stream = this.mediaLibrary(videoUrl, options);
  }
  getStream() {
    return this.stream;
  }
}

exports.MediaDownloader = MediaDownloader;
