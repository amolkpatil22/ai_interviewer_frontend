interface SpeakTextProps {
  text: string;
  onEnd: () => void;
}

export const speakText = async ({ text, onEnd }: SpeakTextProps) => {
  speechSynthesis.cancel();
  let isOnEndFired = false;

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    utterance.pitch = 0.5;
    utterance.onend = () => {
      isOnEndFired = true;
      onEnd();
    };

    speechSynthesis.speak(utterance);
  };

  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    speak();
  } else {
    speechSynthesis.onvoiceschanged = () => {
      const updatedVoices = speechSynthesis.getVoices();
      if (updatedVoices.length > 0) {
        speak();
      }
    };
  }

  // setTimeout(() => {
  //   if (!isOnEndFired) {
  //     console.log("manual fire");
  //     onEnd(); // Fire onEnd manually
  //   }
  // }, 10000);
};
