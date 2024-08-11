'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useP5 } from '@/hooks/useP5';
import p5 from 'p5';
import { CarAnimation } from '@/utils/CarGame';
import { TileConnectionGame } from '@/utils/TileConnectionGame';
import { DrawingBotGame } from '@/utils/DrawingBotGame';
import FeedbackDialog from './feedbackDialogue';
import reverseParseCarCommands from '@/utils/reverseParseCarCommands';
import reverseParseTileCommands from '@/utils/reverseParseTileCommands';
import reverseParseDrawingBotCommands from '@/utils/reverseParseDrawingBotCommands';

type GameType = 'car' | 'tile' | 'bot';

interface DrawingCanvasProps<T extends GameType> {
  gameType: T;
  commands: GameCommands[T];
  todoCommands: GameCommands[T];
  controlCommand: ControlCommands;
  setControlCommand: React.Dispatch<React.SetStateAction<ControlCommands>>;
  handleNext?: () => void;
}

const createGame = (
  p: p5,
  gameType: GameType,
  commands: GameCommands[GameType],
  todoCommands: GameCommands[GameType]
) => {
  switch (gameType) {
    case 'car':
      return new CarAnimation(p, commands as CarCommands[], todoCommands as CarCommands[]);
    case 'tile':
      return new TileConnectionGame(p, commands as TileCommands[], todoCommands as TileCommands[]);
    case 'bot':
      return new DrawingBotGame(p, commands as DrawingBotCommands[], todoCommands as DrawingBotCommands[]);
    default:
      throw new Error(`Unsupported game type: ${gameType}`);
  }
};

const DrawingCanvas = <T extends GameType>({
  gameType,
  commands,
  todoCommands,
  controlCommand,
  setControlCommand,
  handleNext
}: DrawingCanvasProps<T>) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (controlCommand.type === 'stop') {
      setShowDialog(false);
    }
  }, [controlCommand]);

  const sketch = (p: p5) => {
    let game: ReturnType<typeof createGame>;
    let isGameInitialized = false;

    p.setup = () => {
      p.createCanvas(divRef.current?.clientWidth || 910, divRef.current?.clientHeight || 380);
      p.background(255);
      game = createGame(p, gameType, commands, todoCommands);
      isGameInitialized = true;
    };

    p.draw = () => {
      if (!isGameInitialized) return;

      switch (controlCommand.type) {
        case 'start':
          game.update();
          break;
        case 'reset':
          game.resetAnimation();
          break;
      }

      game.display();

      if (game.isComplete && controlCommand.type !== 'reset') {
        handleGameCompletion(game);
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(divRef.current?.clientWidth || 500, divRef.current?.clientHeight || 200);
    };
  };

  const handleGameCompletion = (game: ReturnType<typeof createGame>) => {
    if (game.check()) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  const handleSuccess = () => {
    setResultMessage('Congrats! You got it right!');
    setShowDialog(true);
    setControlCommand({ type: 'reset' });
  };

  const handleFailure = () => {
    setControlCommand({ type: 'reset' });
    setResultMessage('Oh no, that’s wrong. Try again!');
    setShowDialog(true);
  };

  const generateFeedbackMessage = () => {
    switch (gameType) {
      case 'car':
        return `Expected: ${reverseParseCarCommands(todoCommands as CarCommands[])}. Given: ${reverseParseCarCommands(commands as CarCommands[])}`;
      case 'tile':
        return `Expected: ${reverseParseTileCommands(todoCommands as TileCommands[])}. Given: ${reverseParseTileCommands(commands as TileCommands[])}`;
      case 'bot':
        return `Expected: ${reverseParseDrawingBotCommands(todoCommands as DrawingBotCommands[])}. Given: ${reverseParseDrawingBotCommands(commands as DrawingBotCommands[])}`;
      default:
        throw new Error(`Unsupported game type: ${gameType}`);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    const voices = speechSynthesis.getVoices();

    const chosenVoice = voices
      .filter(
        (voice) =>
          voice.name === "Microsoft Sonia Online (Natural) - English (United Kingdom)" ||
          voice.name === 'Google UK English Female' ||
          voice.name === 'Samantha'
      );

    utterance.voice = chosenVoice.length > 0 ? chosenVoice[0] : voices[0];
    utterance.onstart = () => setIsLoading(true);
    utterance.onend = () => setIsLoading(false);
    speechSynthesis.speak(utterance);
  };

  const canvasRef = useP5(sketch);

  return (
    <div ref={divRef} className="w-full h-full rounded-xl border-2">
      <div ref={canvasRef}></div>
      <FeedbackDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        message={resultMessage}
        generateFeedbackMessage={generateFeedbackMessage}
        speak={speak}
        handleNext={handleNext}
      />
    </div>
  );
};

export default DrawingCanvas;
