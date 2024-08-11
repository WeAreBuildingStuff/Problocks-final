'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  RecordIcon,
  CircleStopIcon,
  PlayIcon,
} from '@/components/custom/sub-components/Icons';
import {
  getCarCommands,
  getTileCommands,
  getDrawBotCommands
} from '@/utils/getGeminiResponse';
import parseCarCommands from '@/utils/parseCarCommands';
import parseTileCommands from '@/utils/parseTileCommands';
import parseDrawingBotCommands from '@/utils/parseDrawingBotCommands';
import { getRandomChallenge } from '@/utils/getGeminiResponse';

type GameType = 'car' | 'tile' | 'bot';

const DynamicDrawingCanvas = dynamic(() => import('@/components/custom/drawingCanvas'), {
  ssr: false
});

export default function Component() {
  const [gameType, setGameType] = useState<GameType>('car');
  const [commands, setCommands] = useState<CarCommands[] | TileCommands[] | DrawingBotCommands[]>([]);
  const [controlCommand, setControlCommand] = useState<ControlCommands>({ type: 'stop' });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [challenge, setChallenge] = useState<CarCommands[] | TileCommands[] | DrawingBotCommands[]>([]);
  const [checkResult, setCheckResult] = useState<boolean | null>(null);
  const [difficulty, setDifficulty] = useState<string>('');

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

  async function generateChallenge() {
    const gameTypes: GameType[] = ['car', 'tile', 'bot'];
    const difficulties: string[] = ['simple', 'moderate', 'complex', "very complex"];

    const randomGameType = gameTypes[Math.floor(Math.random() * gameTypes.length)];
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    setGameType(randomGameType);

    const challengeInstruction = `${randomDifficulty}, ${randomGameType}`;
    const challengeResponse = await getRandomChallenge(challengeInstruction);

    console.log(`Generated Challenge: ${challengeResponse}`);


    let parsedCommands: CarCommands[] | TileCommands[] | DrawingBotCommands[];

    switch (randomGameType) {
      case 'car':
        parsedCommands = parseCarCommands(challengeResponse);
        setChallenge(parsedCommands);
        break;
      case 'tile':
        parsedCommands = parseTileCommands(challengeResponse);
        setChallenge(parsedCommands);
        break;
      case 'bot':
        parsedCommands = parseDrawingBotCommands(challengeResponse);
        setChallenge(parsedCommands);
        break;
      default:
        throw new Error(`Unsupported game type: ${randomGameType}`);
    }
  }

  async function generateCommands() {
    let rawCommands: string;
    let parsedCommands: CarCommands[] | TileCommands[] | DrawingBotCommands[];

    switch (gameType) {
      case 'car':
        rawCommands = await getCarCommands(transcript);
        parsedCommands = parseCarCommands(rawCommands);
        setCommands(parsedCommands);
        console.log(parsedCommands);
        break;
      case 'tile':
        rawCommands = await getTileCommands(transcript);
        parsedCommands = parseTileCommands(rawCommands);
        setCommands(parsedCommands);
        console.log(parsedCommands);
        break;
      case 'bot':
        rawCommands = await getDrawBotCommands(transcript);
        parsedCommands = parseDrawingBotCommands(rawCommands);
        setCommands(parsedCommands);
        console.log(parsedCommands);
        break;
      default:
        throw new Error(`Unsupported game type: ${gameType}`);
    }
  }

  const handlePlay = () => {
    setControlCommand({ type: 'start' });
  };

  const handleReset = () => {
    setControlCommand({ type: 'reset' });
  };

  const handleCheckResult = (result: boolean) => {
    setCheckResult(result);
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  return (
    <div className={`flex h-screen w-screen bg-white text-gray-900`}>
      <div className='flex-1 flex flex-col'>
        <header className={`bg-gray-100 p-4 text-center`}>
          <h1 className='text-3xl font-bold mb-2'>Challenges!</h1>
        </header>
        
        <div className={`bg-gray-100 border-b border-gray-300 p-4`}>
          <div className='flex items-center justify-between'>
            <div className='space-x-4'>
              <Button variant='default' size='lg' onClick={handlePlay}>
                <PlayIcon className='w-6 h-6 mr-2' />
                Run
              </Button>
              <Button variant='secondary' size='lg' onClick={handleReset}>
                <CircleStopIcon className='w-6 h-6 mr-2' />
                Reset
              </Button>
              <Button
                variant={isRecording ? 'destructive' : 'outline'}
                size='lg'
                onClick={handleToggleRecording}
                className='gap-2'
              >
                <RecordIcon className='w-6 h-6' />
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className='flex-1 p-4 flex max-w-screen'>
          <div className='flex-1'>
            <div className={`h-[1080px] w-full bg-gray-100 rounded-xl shadow-xl`}>
              <DynamicDrawingCanvas
                gameType={gameType}
                commands={commands}
                controlCommand={controlCommand}
                todoCommands={challenge}
                setControlCommand={setControlCommand}
              />
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}
