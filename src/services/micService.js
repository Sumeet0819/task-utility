const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

class MicService {
  constructor() {
    this.recognition = null;
    this.isListening = false;

    this.finalTranscript = "";
    this.interimTranscript = "";

    this.callbacks = {
      onResult: () => {},
      onError: () => {},
      onEnd: () => {},
    };

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();

      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = "en-US";
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event) => {
        let interim = "";
        let final = this.finalTranscript;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            final += transcript + " ";
          } else {
            interim += transcript;
          }
        }

        this.finalTranscript = final;
        this.interimTranscript = interim;

        const combined = final + interim;

        this.callbacks.onResult(combined, interim === "");
      };

      this.recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        this.callbacks.onError(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;

        // auto restart if user didn't stop manually
        if (this.shouldRestart) {
          try {
            this.recognition.start();
            this.isListening = true;
          } catch (e) {}
        }

        this.callbacks.onEnd();
      };
    }
  }

  isSupported() {
    return !!this.recognition;
  }

  start(callbacks = {}) {
    if (!this.recognition) return;

    this.callbacks = { ...this.callbacks, ...callbacks };

    this.finalTranscript = "";
    this.interimTranscript = "";

    this.shouldRestart = true;

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (err) {
      console.error("Failed to start recognition:", err);
    }
  }

  stop() {
    if (!this.recognition) return;

    this.shouldRestart = false;

    this.recognition.stop();
    this.isListening = false;
  }

  setTranscript(text) {
    this.finalTranscript = text;
    this.interimTranscript = "";
  }
}

export const micService = new MicService();