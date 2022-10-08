const fs = require("fs");

class Transcribe {
  constructor(speechSdk) {
    this.sdk = speechSdk;
  }
  createSpeechRecognizer(filePath) {
    let audioConfig = this.sdk.AudioConfig.fromWavFileInput(
      fs.readFileSync(filePath)
    );
    const speechConfig = this.sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY,
      process.env.AZURE_SPEECH_REGION
    );
    let speechRecognizer = new this.sdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );
    speechConfig.speechRecognitionLanguage = "en-US";
    this.recognizer = speechRecognizer;
  }

  async runRecognizer() {
    let transcript = "";
    return new Promise((resolve, reject) => {
      this.recognizer.recognizing = (s, e) => {
        console.log(`RECOGNIZING: Text=${e.result.text}`);
      };
      this.recognizer.recognized = (s, e) => {
        if (e.result.reason == this.sdk.ResultReason.RecognizedSpeech) {
          console.log(`RECOGNIZED: Text=${e.result.text}`);
          transcript = transcript + e.result.text + " ";
        } else if (e.result.reason == this.sdk.ResultReason.NoMatch) {
          console.log("NOMATCH: Speech could not be recognized.");
        }
      };

      this.recognizer.canceled = (s, e) => {
        console.log(`CANCELED: Reason=${e.reason}`);
        if (e.reason == this.sdk.CancellationReason.Error) {
          reject(err);
          console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
          console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
          console.log(
            "CANCELED: Did you set the speech resource key and region values?"
          );
        }

        this.recognizer.stopContinuousRecognitionAsync();
      };
      this.recognizer.sessionStopped = (s, e) => {
        console.log("\n    Session stopped event.");
        resolve(transcript);
        this.recognizer.stopContinuousRecognitionAsync();
      };
      this.recognizer.startContinuousRecognitionAsync(
        () => {
          console.log("Recognition started");
        },
        (err) => {
          console.trace("err - " + err);
          reject(err);
          this.recognizer.close();
          this.recognizer = undefined;
        }
      );
    });
  }

  async convertSpeechIntoText(filePath) {
    this.createSpeechRecognizer(filePath);
    const transcript = await this.runRecognizer();
    return transcript;
  }
}

exports.Transcribe = Transcribe;
