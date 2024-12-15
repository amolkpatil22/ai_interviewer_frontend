import { useState } from "react";

export const useAnalysisModule = () => {
  const [isResultAvailable, setIsResultAvailable] = useState(true);
  const [score, setScore] = useState(5);

  function getScoreColor(score: number): string {
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
  }

  return {
    isResultAvailable,
    score,
    getScoreColor,
  };
};
