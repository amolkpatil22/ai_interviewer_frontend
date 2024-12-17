import { useEffect, useRef, useState } from "react";

export const useInterviewModule = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const requestMediaPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("🚀 ~ requestMediaPermission ~ stream:", stream)
      if (videoRef.current) {
       
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      console.log("🚀 ~ requestMediaPermission ~ videoRef:", videoRef)
      setHasPermission(true);
    } catch (err: any) {
      console.log("🚀 ~ requestMediaPermission ~ err:", err);

      setHasPermission(false);
    }
  };

  useEffect(() => {
    requestMediaPermission();
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    videoRef,
    hasPermission,
    requestMediaPermission,
  };
};
