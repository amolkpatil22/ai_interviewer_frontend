import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../Redux/Store";
import { utteranceMessage } from "../../../Common/Utterance/Utterance";
import { speakText } from "../../../Common/Utils/SpeakText";
import { Question } from "../../../Redux/QuestionsSlice/QuestionsSlice";

export const useInterviewModule = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { questions } = useSelector((state: RootState) => state.questions);
  const { session_id, question_id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCodeWriterOpen, setIsCodeWriterOpen] = useState(false);
  const [candidateAnswer, setCandidateAnswer] = useState("");

  useEffect(() => {
    requestMediaPermission();
  }, []);

  useEffect(() => {
    if (hasPermission && !question_id) {
      const timer = setTimeout(() => {
        handleInitialRender();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasPermission]);

  useEffect(() => {
    setCurrentQuestionAfterQuestionIdChange();
  }, [question_id]);

  useEffect(() => {
    handleSpeakingAfterQuestionChange();
  }, [currentQuestion]);

  const handleInitialRender = () => {
    onSpeakingHandler();
    speakText({ text: utteranceMessage.welcome, onEnd: onSpeakingHandler });
  };

  const setCurrentQuestionAfterQuestionIdChange = () => {
    if (question_id) {
      const questionIndex = questions.findIndex((item) => item._id === question_id);
      onSpeakingHandler();
      if (questionIndex !== -1) {
        setCurrentQuestion(questions[questionIndex]);
        setCurrentQuestionIndex(questionIndex);
        speakText({ text: utteranceMessage.hereIsTheQuestion, onEnd: onSpeakingHandler });
      } else {
        speakText({ text: utteranceMessage.invalidQuestionId, onEnd: onSpeakingHandler });
      }
    }
  };

  const handleSpeakingAfterQuestionChange = () => {
    if (currentQuestion) {
      onSpeakingHandler();
      if (currentQuestion.type === "coding") {
        speakText({ text: utteranceMessage.codingQuestion, onEnd: () => onSpeakingHandler });
      } else if (currentQuestion.type === "output") {
        speakText({ text: `Question. ${currentQuestion?.question}`, onEnd: () => onSpeakingHandler });
      } else {
        speakText({ text: `Question. ${currentQuestion?.question}`, onEnd: () => onSpeakingHandler });
      }
    }
  };

  const onSpeakingHandler = () => {
    setIsSpeaking((prev) => !prev);
  };

  const startInterview = () => {
    navigate(`${questions[0]._id}`);
  };

  const submitAnswer = () => {
    setIsCodeWriterOpen(false);
    setCandidateAnswer("");
    if (currentQuestionIndex !== null) {
      const nextQuestionId = questions[currentQuestionIndex + 1]._id;
      navigate(`/interview/${session_id}/${nextQuestionId}`);
    }
  };

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

  return {
    isCodeWriterOpen,
    setIsCodeWriterOpen,
    candidateAnswer,
    setCandidateAnswer,
    currentQuestion,
    currentQuestionIndex,
    questions,
    isSpeaking,
    timeLeft,
    hasPermission,
    requestMediaPermission,
    startInterview,
    question_id,
    submitAnswer,
  };
};
