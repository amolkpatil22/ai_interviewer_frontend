import { useEffect, useState } from "react";
import { GetInterviewFeedbackHttpsData } from "../../../Common/AxiosInterceptor/Interview/interfaces/getInterviewFeedback.interface";
import { getInterviewFeedback } from "../https/AnalysisModule.https";
import { useParams } from "react-router-dom";
import { toaster } from "../../../Components/ui/toaster";
import { CategoryWiseScore } from "../interfaces/AnalysisModule.interface";

export const useAnalysisModule = () => {
  const [isResultAvailable, setIsResultAvailable] = useState(false);
  const { session_id } = useParams();
  const [interviewReport, setInterViewReport] = useState<GetInterviewFeedbackHttpsData>();
  const [overallScore, setOverallScore] = useState<number>(0);
  const [categoryWiseScore, setCategoryWiseScore] = useState<CategoryWiseScore>({
    accuracy_of_answer: 0,
    quality_of_answer: 0,
    subject_knowledge: 0,
    understanding_of_question: 0,
  });

  useEffect(() => {
    calculateOverallScore();
  }, [categoryWiseScore]);

  useEffect(() => {
    calculateCategoryOverallScore();
  }, [interviewReport]);

  const calculateCategoryOverallScore = () => {
    if (interviewReport) {
      const sum = interviewReport.feedback.reduce(
        (prev, current, index) => {
          return {
            understanding_of_question: prev.understanding_of_question + current.understanding_of_question,
            accuracy_of_answer: prev.accuracy_of_answer + current.accuracy_of_answer,
            subject_knowledge: prev.subject_knowledge + current.subject_knowledge,
            quality_of_answer: prev.quality_of_answer + current.quality_of_answer,
          };
        },
        {
          understanding_of_question: 0,
          accuracy_of_answer: 0,
          subject_knowledge: 0,
          quality_of_answer: 0,
        }
      );
      setCategoryWiseScore({
        accuracy_of_answer: +(sum.accuracy_of_answer / interviewReport.feedback.length).toFixed(1),
        understanding_of_question: +(sum.understanding_of_question / interviewReport.feedback.length).toFixed(1),
        subject_knowledge: +(sum.subject_knowledge / interviewReport.feedback.length).toFixed(1),
        quality_of_answer: +(sum.quality_of_answer / interviewReport.feedback.length).toFixed(1),
      });
    }
  };

  const calculateOverallScore = () => {
    if (categoryWiseScore) {
      const sum =
        categoryWiseScore.accuracy_of_answer +
        categoryWiseScore.quality_of_answer +
        categoryWiseScore.subject_knowledge +
        categoryWiseScore.understanding_of_question;
      setOverallScore(+(sum / 4).toFixed(1));
    }
  };

  const getScoreColor = (score: number): string => {
    if (score <= 2) {
      return "red";
    } else if (score > 2 && score <= 4) {
      return "orange";
    } else if (score > 4 && score <= 6) {
      return "yellow";
    } else if (score > 6 && score <= 8) {
      return "green";
    } else if (score > 8 && score <= 10) {
      return "purple";
    } else {
      return "gray";
    }
  };

  const getFeedback = async () => {
    if (session_id) {
      const response = await getInterviewFeedback(session_id);
      if (response.status && response.data) {
        setInterViewReport(response.data);
        setIsResultAvailable(true);
      } else {
        toaster.create({
          type: "error",
          title: "Failed to get feedback",
          description: response.message,
          duration: 3000,
        });
      }
    }
  };

  return {
    categoryWiseScore,
    overallScore,
    interviewReport,
    getFeedback,
    isResultAvailable,
    getScoreColor,
  };
};
