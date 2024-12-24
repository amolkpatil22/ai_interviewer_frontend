import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { data, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../Redux/Store";
import { utteranceMessage } from "../../../Common/Utterance/Utterance";
import { speakText } from "../../../Common/Utils/SpeakText";
import { Question, QuestionTypes } from "../../../Redux/QuestionsSlice/QuestionsSlice";
import { useReactMediaRecorder } from "react-media-recorder";
import { addDataToIndexDb, openDatabaseInIndexDb } from "../../../Common/Utils/IndexDb";
import { Blob } from "buffer";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { BotModes } from "../../../Common/Interfaces/BotModes.interface";
import { submitCandidatesAnswer } from "../https/InterviewModule.https";
import { toaster } from "../../../Components/ui/toaster";

export const useInterviewModule = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { questions } = useSelector((state: RootState) => state.questions);
  const { session_id, question_id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [botMode, setBotMode] = useState<BotModes>(BotModes.Idle);
  const [isCodeWriterOpen, setIsCodeWriterOpen] = useState(false);
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, finalTranscript } =
    useSpeechRecognition();

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    video: true,
    audio: true,
  });

  useEffect(() => {
    openDatabaseInIndexDb("smart-hire", 1);
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
    if (currentQuestion?.type === QuestionTypes.THEORY) {
      startRecording();
    }
    handleSpeakingAfterQuestionChange();
    SpeechRecognition.startListening({ continuous: true });
  }, [currentQuestion]);

  const handleInitialRender = () => {
    setBotMode(BotModes.Speaking);
    speakText({ text: utteranceMessage.welcome, onEnd: () => setBotMode(BotModes.Idle) });
  };

  const setCurrentQuestionAfterQuestionIdChange = () => {
    if (question_id) {
      const questionIndex = questions.findIndex((item) => item._id === question_id);
      setBotMode(BotModes.Speaking);

      if (questionIndex !== -1) {
        speakText({
          text: utteranceMessage.hereIsTheQuestion,
          onEnd: () => {
            console.log("fire");
            setBotMode(BotModes.Idle);
            setCurrentQuestion(questions[questionIndex]);
            setCurrentQuestionIndex(questionIndex);
          },
        });
      } else {
        speakText({ text: utteranceMessage.invalidQuestionId, onEnd: () => setBotMode(BotModes.Idle) });
      }
    }
  };

  const handleSpeakingAfterQuestionChange = () => {
    if (currentQuestion) {
      setBotMode(BotModes.Speaking);
      if (currentQuestion.type === QuestionTypes.CODING) {
        speakText({
          text: utteranceMessage.codingQuestion,
          onEnd: () => {
            setBotMode(BotModes.Listening);
            resetTranscript();
          },
        });
      } else if (currentQuestion.type === QuestionTypes.OUTPUT) {
        speakText({
          text: utteranceMessage.outputQuestion,
          onEnd: () => {
            setBotMode(BotModes.Listening);
            resetTranscript();
          },
        });
      } else {
        speakText({
          text: `Question. ${currentQuestion?.question}`,
          onEnd: () => {
            setBotMode(BotModes.Listening);
            resetTranscript();
          },
        });
      }
    }
  };

  const startInterview = () => {
    navigate(`${questions[0]._id}`);
  };

  const submitAnswer = async () => {
    if (session_id && question_id) {
      setIsSubmitLoading(true);
      SpeechRecognition.stopListening();
      stopRecording();
      setBotMode(BotModes.Idle);

      if (mediaBlobUrl && currentQuestion?._id) {
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob(); // This is the Blob object
        addDataToIndexDb("smart-hire", { question_id: currentQuestion._id, blob });
      }

      let finalCandidateAnswer = "";

      if (currentQuestion?.type === QuestionTypes.THEORY) {
        finalCandidateAnswer = finalTranscript.trim();
      } else {
        finalCandidateAnswer = candidateAnswer.trim();
      }

      const submitAnswer = await submitCandidatesAnswer({
        session_id: session_id,
        payload: { candidate_answer: finalCandidateAnswer, question_id: question_id },
      });

      if (submitAnswer.status === false) {
        toaster.create({
          type: "error",
          title: "Submission Failed",
          description: submitAnswer.message,
          duration: 3000,
        });
        return;
      }

      setCandidateAnswer("");
      setIsSubmitLoading(false);
      if (currentQuestionIndex !== null && currentQuestionIndex < questions.length - 1) {
        const nextQuestionId = questions[currentQuestionIndex + 1]._id;
        navigate(`/interview/${session_id}/${nextQuestionId}`);
      } else {
        navigate(`/analysis/${session_id}`);
      }
    }
  };

  useEffect(() => {
    if (timeLeft === 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const endInterview = () => {
    navigate(`/analysis/${session_id}`);
  };

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
    isSubmitLoading,
    listening,
    browserSupportsSpeechRecognition,
    endInterview,
    isCodeWriterOpen,
    setIsCodeWriterOpen,
    candidateAnswer,
    setCandidateAnswer,
    currentQuestion,
    currentQuestionIndex,
    questions,
    botMode,
    timeLeft,
    hasPermission,
    requestMediaPermission,
    startInterview,
    question_id,
    submitAnswer,
  };
};
