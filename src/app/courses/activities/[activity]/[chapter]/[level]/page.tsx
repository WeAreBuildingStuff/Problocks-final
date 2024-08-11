"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import DrawingCanvas from "@/components/custom/drawingCanvas";
import {
  RecordIcon,
  CircleStopIcon,
  PlayIcon,
  NextIcon,
  PreviousIcon
} from "@/components/custom/sub-components/Icons";
import {
  getCarCommands,
  getTileCommands,
  getDrawBotCommands,
} from "@/utils/getGeminiResponse";
import parseCarCommands from "@/utils/parseCarCommands";
import parseTileCommands from "@/utils/parseTileCommands";
import parseDrawingBotCommands from "@/utils/parseDrawingBotCommands";
import carGameLevels from "@/constants/activties/carLevels";
import tileGameLevels from "@/constants/activties/tileConnectionLevels";
import drawBotGameLevels from "@/constants/activties/drawBotLevels";
import CamerPopUp from "@/components/custom/cameraPopUp";
import { useRouter } from "next/navigation";

interface ActivityProps {
  params: {
    level: string;
    chapter: string;
    activity: string;
  };
}

export default function Activity({ params }: ActivityProps) {
  const gameType: GameType = params.activity.startsWith("car")
    ? "car"
    : params.activity.startsWith("tile")
      ? "tile"
      : "bot";

  const [commands, setCommands] = useState<
    CarCommands[] | TileCommands[] | DrawingBotCommands[]
  >([]);
  const [controlCommand, setControlCommand] = useState<ControlCommands>({
    type: "stop",
  });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  // const [checkResult, setCheckResult] = useState<boolean | null>(null);
  const router = useRouter();

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      const newTranscript = event.results[
        event.results.length - 1
      ][0].transcript
        .trim()
        .toLowerCase()
        .replace(/[.]/g, "");
      console.log("New transcript:", newTranscript);
      setTranscript(newTranscript);
    };

    recognitionRef.current.start();
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      generateCommands();
    }
  };

  async function generateCommands() {
    let rawCommands: string;
    let parsedCommands: CarCommands[] | TileCommands[] | DrawingBotCommands[];

    switch (gameType) {
      case "car":
        rawCommands = await getCarCommands(transcript);
        parsedCommands = parseCarCommands(rawCommands);
        setCommands(parsedCommands);
        console.log(parsedCommands);
        break;
      case "tile":
        rawCommands = await getTileCommands(transcript);
        parsedCommands = parseTileCommands(rawCommands);
        setCommands(parsedCommands);
        console.log(parsedCommands);
        break;
      case "bot":
        rawCommands = await getDrawBotCommands(transcript);
        parsedCommands = parseDrawingBotCommands(rawCommands);
        setCommands(parsedCommands);
        console.log(parsedCommands);
        break;
      default:
        throw new Error(`Unsupported game type: ${gameType}`);
    }
  }

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handlePlay = () => {
    setControlCommand({ type: "start" });
  };

  const handleReset = () => {
    setControlCommand({ type: "reset" });
  };

  const todoCommands = () => {
    const chapter = parseInt(params.chapter, 10);
    const level = parseInt(params.level, 10);
    switch (gameType) {
      case "car":
        return carGameLevels[chapter][level];
      case "tile":
        return tileGameLevels[chapter][level];
      case "bot":
        return drawBotGameLevels[chapter][level];
      default:
        return [];
    }
  };

  function handlePrevious() {
    const chapter = parseInt(params.chapter, 10);
    const level = parseInt(params.level, 10);
  
    let chapterLength: number;
    let levelLength: number;
  
    switch (gameType) {
      case "car":
        chapterLength = carGameLevels.length;
        levelLength = carGameLevels[chapter].length;
        break;
      case "tile":
        chapterLength = tileGameLevels.length;
        levelLength = tileGameLevels[chapter].length;
        break;
      case "bot":
        chapterLength = drawBotGameLevels.length;
        levelLength = drawBotGameLevels[chapter].length;
        break;
      default:
        chapterLength = 0;
        levelLength = 0;
    }
  
    if (chapter === 0 && level === 0) {
      return;
    }
  
    if (level === 0) {
      router.push(`/courses/activities/${params.activity}/${chapter - 1}/${levelLength - 1}`);
    } else {
      router.push(`/courses/activities/${params.activity}/${chapter}/${level - 1}`);
    }
  }
  
  function handleNext() {
    const chapter = parseInt(params.chapter, 10);
    const level = parseInt(params.level, 10);
  
    let chapterLength: number;
    let levelLength: number;
  
    switch (gameType) {
      case "car":
        chapterLength = carGameLevels.length;
        levelLength = carGameLevels[chapter].length;
        break;
      case "tile":
        chapterLength = tileGameLevels.length;
        levelLength = tileGameLevels[chapter].length;
        break;
      case "bot":
        chapterLength = drawBotGameLevels.length;
        levelLength = drawBotGameLevels[chapter].length;
        break;
      default:
        chapterLength = 0;
        levelLength = 0;
    }
  
    if (chapter === chapterLength - 1 && level === levelLength - 1) {
      return;
    }
  
    if (level === levelLength - 1) {
      if (chapter < chapterLength - 1) {
        router.push(`/courses/activities/${params.activity}/${chapter + 1}/0`);
      }
    } else {
      router.push(`/courses/activities/${params.activity}/${chapter}/${level + 1}`);
    }
  }

  // const handleCheckResult = (result: boolean) => {
  //   setCheckResult(result);
  // };

  return (
    <div className="flex h-screen w-full text-black">
      <div className="flex-1 bg-white flex flex-col">
        <div className="bg-background border-b border-muted p-4">
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <Button variant="ghost" onClick={handlePlay} className="gap-2">
                <PlayIcon className="w-5 h-5" />
                <span className="">Run</span>
              </Button>
              <Button variant="ghost" onClick={handleReset} className="gap-2">
                <CircleStopIcon className="w-5 h-5" />
                <span className="">Reset</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleToggleRecording}
                className={isRecording ? "text-red-500 gap-2" : "gap-2"}
              >
                <RecordIcon className="w-5 h-5" />
                <span className="">Record</span>
              </Button>
            </div>
            <div className="space-x-2">
              <Button variant="ghost" onClick={handlePrevious}>
                <PreviousIcon className="w-5 h-5" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button variant="ghost" onClick={handleNext}>
                <NextIcon className="w-5 h-5" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="h-full w-full bg-background rounded-xl shadow-xl">
            <DrawingCanvas<GameType>
              gameType={gameType}
              commands={commands}
              controlCommand={controlCommand}
              todoCommands={todoCommands()}
              setControlCommand={setControlCommand}
              handleNext={handleNext}
            />
            <CamerPopUp
              setCommands={
                setCommands as React.Dispatch<React.SetStateAction<Command[]>>
              }
              gameType={gameType}
            />
          </div>
          {/* {checkResult !== null && (
            <div className="fixed bottom-4 right-4 bg-white border p-4 shadow-lg rounded-lg">
              {checkResult ? (
                <span className="text-green-500 font-bold">Congrats! You got it right!</span>
              ) : (
                <span className="text-red-500 font-bold">Oh no, that&apos;s wrong. Try again!</span>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>

  );
}
