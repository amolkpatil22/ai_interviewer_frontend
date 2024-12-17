import { useEffect, useRef, useState } from "react";

export const useInterviewModule = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestMediaPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setHasPermission(true);
    } catch (err: any) {
      setHasPermission(false);
    }
  };

  useEffect(() => {
    requestMediaPermission();
  }, []);

  return {
   
    hasPermission,
    requestMediaPermission,
  };
};
