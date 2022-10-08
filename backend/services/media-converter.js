class MediaConverter {
  constructor(converter) {
    this.converter = converter;
  }
  async convertAudio(stream, format, fileLocation) {
    return new Promise((resolve, reject) => {
      this.converter(stream)
        .toFormat(format)
        .on("error", (err) => {
          console.log("An error occurred: " + err.message);
          reject(err);
        })
        .on("progress", (progress) => {
          console.log("Processing: " + progress.targetSize + " KB converted");
        })
        .on("end", () => {
          console.log("Processing finished !");
          resolve(true);
        })
        .save(`${fileLocation}`);
    });
  }
}

exports.MediaConverter = MediaConverter;
