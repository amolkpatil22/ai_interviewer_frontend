interface SpeakTextProps {
  text: string;
  onEnd: () => void;
}

export const speakText = ({ text, onEnd }: SpeakTextProps) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.rate = 0.7;
  //   utterance.pitch = 0.5; // 0 is the lowest, 2 is the highest
  //   utterance.onend = onEnd;
  //   window.speechSynthesis.speak(utterance);
};
