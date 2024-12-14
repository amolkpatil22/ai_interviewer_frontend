import { useState } from "react";

export const useAnalysisModule = () => {
  const [isResultAvailable, setIsResultAvailable] = useState(true);
  const [score, setScore] = useState(1);

  function getScoreColor(score: number): string {
    if (score <= 4) {
      return "red";
    } else if (score < 7) {
      return "yellow";
    } else if (score >= 7 && score < 9) {
      return "green";
    } else {
      return "purple";
    }
  }

  return {
    isResultAvailable,
    score,
    getScoreColor,
  };
};
