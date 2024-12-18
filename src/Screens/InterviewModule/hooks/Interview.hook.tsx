import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../Redux/Store";
import { utteranceMessage } from "../../../Common/Utterance/Utterance";
import { speakText } from "../../../Common/Utils/SpeakText";

export const useInterviewModule = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { questions } = useSelector((state: RootState) => state.questions);
  const { session_id, question_id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setIsSpeaking(true);
    speakText({ text: utteranceMessage.welcome, onEnd: () => setIsSpeaking(false) });
  }, []);

  useEffect(() => {
    console.log("change");
    handlePageStart();
  }, [question_id]);

  const startInterview = () => {
    navigate(`${questions[0]._id}`);
  };

  const handlePageStart = () => {
    console.log("question boxx");
    if (question_id) {
      const isValidQuestion = questions.findIndex((item) => item._id === question_id);
      if (isValidQuestion !== -1) {
        setCurrentQuestionIndex(isValidQuestion);
        setIsSpeaking(true);
        speakText({ text: questions[isValidQuestion].question, onEnd: () => setIsSpeaking(false) });
      } else {
        speakText({ text: utteranceMessage.invalidQuestionId, onEnd: () => setIsSpeaking(false) });
      }
    }
  };
  console.log("curetn", currentQuestionIndex);
  //   useEffect(() => {
  //     if (timeLeft === 0) return;
  //     const interval = setInterval(() => {
  //       setTimeLeft((prevTime) => prevTime - 1);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, [timeLeft]);

  const requestMediaPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setHasPermission(true);
      setTimeLeft(3600);
    } catch (err: any) {
      setHasPermission(false);
    }
  };

  useEffect(() => {
    requestMediaPermission();
  }, []);

  return {
    currentQuestionIndex,
    questions,
    isSpeaking,
    timeLeft,
    hasPermission,
    requestMediaPermission,
    startInterview,
    question_id,
  };
};
