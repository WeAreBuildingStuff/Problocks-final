'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ZoomInIcon,
  ZoomOutIcon,
  RecordIcon,
  CircleStopIcon,
  PlayIcon
} from '@/components/custom/sub-components/Icons';
import {
  getCarCommands
} from '@/utils/getGeminiResponse';
import parseCarCommands from '@/utils/parseCarCommands';
import ESP32Controller from '@/components/custom/Esp32Controller';

interface ActivityProps {
  params: {
    level: string;
    activity: string;
  };
}

export default function Activity({ params }: ActivityProps) {
  const [commands, setCommands] = useState<CarCommands[] | TileCommands[] | DrawingBotCommands[]>(
    []
  );
  const [controlCommand, setControlCommand] = useState<ControlCommands>({ type: 'stop' });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      const newTranscript = event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase()
        .replace(/[.]/g, '');
      console.log('New transcript:', newTranscript);
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
    let parsedCommands: CarCommands[]

    rawCommands = await getCarCommands(transcript);
    parsedCommands = parseCarCommands(rawCommands);
    setCommands(parsedCommands);
    console.log(parsedCommands);
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
    setControlCommand({ type: 'start' });
  };

  const handleReset = () => {
    setControlCommand({ type: 'reset' });
  };

  return (
    <div className='flex h-screen w-full'>
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
            <ESP32Controller />
          </div>
        </div>
      </div>
    </div>
  );
}
