interface SpeakTextProps {
  text: string;
  onEnd: () => void;
}
export const speakText = ({ text, onEnd }: SpeakTextProps) => {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((voice) => voice.name === "Google US English") || voices[0]; // Default voice fallback
  utterance.voice = selectedVoice;
  utterance.pitch = 0; // 0 is the lowest, 2 is the highest
  utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};
