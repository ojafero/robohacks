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

exports.youtubeTranscriberController = youtubeTranscriberController;
