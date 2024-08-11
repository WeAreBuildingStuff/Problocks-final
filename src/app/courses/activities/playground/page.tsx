'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ZoomInIcon,
  ZoomOutIcon,
  SettingsIcon,
  RecordIcon,
  CircleStopIcon,
  PlayIcon
} from '@/components/custom/sub-components/Icons';
import {
  getCarCommands,
  getTileCommands,
  getDrawBotCommands
} from '@/utils/getGeminiResponse';
import parseCarCommands from '@/utils/parseCarCommands';
import parseTileCommands from '@/utils/parseTileCommands';
import parseDrawingBotCommands from '@/utils/parseDrawingBotCommands';

type GameType = 'car' | 'tile' | 'bot';

const DynamicDrawingCanvas = dynamic(() => import('@/components/custom/drawingCanvas'), {
  ssr: false
});

export default function Component() {
  const [gameType, setGameType] = useState<GameType>('car');
  const [commands, setCommands] = useState<CarCommands[] | TileCommands[] | DrawingBotCommands[]>(
    []
  );
  const [controlCommand, setControlCommand] = useState<ControlCommands>({ type: 'stop' });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');

  const [checkResult, setCheckResult] = useState<boolean | null>(null);

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

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

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

  return (
    <div className='flex h-screen w-full'>
      <div className='flex flex-col bg-background text-foreground border-r border-muted p-4 gap-4 max-w-[300px] w-full'>
        {/* Sidebar content */}
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Coding Playground</h2>
          <Button variant='ghost' size='icon'>
            <SettingsIcon className='w-5 h-5' />
            <span className='sr-only'>Settings</span>
          </Button>
        </div>
        <div className='flex flex-col space-y-4 overflow-auto hide-scrollbar'>
          {/* Game type selection */}
          <div className='bg-gray-100 rounded-md p-4'>
            <h3 className='text-lg font-medium mb-2'>Game Type</h3>
            <select
              value={gameType}
              onChange={(e) => setGameType(e.target.value as GameType)}
              className='w-full p-2 border rounded'
            >
              <option value='car'>Car Game</option>
              <option value='tile'>Tile Connection Game</option>
              <option value='bot'>Drawing Bot Game</option>
            </select>
          </div>
        </div>
      </div>
      <div className='flex-1 bg-muted/40 flex flex-col'>
        <div className='bg-background border-b border-muted p-4'>
          <div className='flex items-center justify-between'>
            <div className='space-x-2'>
              <Button variant='ghost' onClick={handlePlay}>
                <PlayIcon className='w-5 h-5' />
                <span className='sr-only'>Run</span>
              </Button>
              <Button variant='ghost' onClick={handleReset}>
                <CircleStopIcon className='w-5 h-5' />
                <span className='sr-only'>Stop</span>
              </Button>
              <Button
                variant='ghost'
                onClick={handleToggleRecording}
                className={isRecording ? 'text-red-500 gap-2' : 'gap-2'}
              >
                <RecordIcon className='w-5 h-5' />
                <span className=''>Record</span>
              </Button>
            </div>
            <div className='space-x-2'>
              <Button variant='ghost'>
                <ZoomInIcon className='w-5 h-5' />
                <span className='sr-only'>Zoom In</span>
              </Button>
              <Button variant='ghost'>
                <ZoomOutIcon className='w-5 h-5' />
                <span className='sr-only'>Zoom Out</span>
              </Button>
            </div>
          </div>
        </div>
        <div className='flex-1 p-4'>
          <div className='h-full w-full bg-background rounded-xl shadow-xl'>
            <DynamicDrawingCanvas
              gameType={gameType}
              commands={commands}
              controlCommand={controlCommand}
              todoCommands={[]}
              setControlCommand={setControlCommand}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
