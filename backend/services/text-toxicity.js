class TextToxicity {
  constructor(toxicity) {
    this.toxicity = toxicity;
  }
  async detectToxicity(threshold, sentences) {
    const model = await this.toxicity.load(threshold);
    const predictions = await model.classify(sentences);
    const data = [];
    for (let sentence = 0; sentence < sentences.length; sentence++) {
      let toxicityScore = false;
      for (let label = 0; label < 7; label++) {
        if (predictions[label].results[sentence].match) {
          toxicityScore = true;
          break;
        }
      }
      data.push({
        sentence: sentences[sentence] + ".",
        toxicityScore: toxicityScore,
      });
    }

    return data;
  }
}

exports.TextToxicity = TextToxicity;
