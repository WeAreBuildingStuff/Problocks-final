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
import { getFeedback } from '@/utils/getGeminiResponse';

type GameType = 'car' | 'tile' | 'bot';

interface DrawingCanvasProps<T extends GameType> {
  gameType: T;
  commands: GameCommands[T];
  todoCommands: GameCommands[T];
  controlCommand: ControlCommands;
  setControlCommand: React.Dispatch<React.SetStateAction<ControlCommands>>;
}

function createGame(
  p: p5,
  gameType: GameType,
  commands: GameCommands[GameType],
  todoCommands: GameCommands[GameType]
) {
  switch (gameType) {
    case 'car':
      return new CarAnimation(p, commands as CarCommands[], todoCommands as CarCommands[]);
    case 'tile':
      return new TileConnectionGame(p, commands as TileCommands[], todoCommands as TileCommands[]);
    case 'bot':
      return new DrawingBotGame(
        p,
        commands as DrawingBotCommands[],
        todoCommands as DrawingBotCommands[]
      );
  }
}

const DrawingCanvas = <T extends GameType>({
  gameType,
  commands,
  todoCommands,
  controlCommand,
  setControlCommand
}: DrawingCanvasProps<T>) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');

  useEffect(() => {
    if (controlCommand.type === "stop") {
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
      if (isGameInitialized) {
        if (controlCommand.type === 'start') {
          game.update();
        } else if (controlCommand.type === 'reset') {
          game.resetAnimation();
        }

        game.display();
        
        if (game.isComplete && controlCommand.type !== 'reset') {
          const result = game.check();
          
          if (result) {
            setResultMessage('Congrats! You got it right!');
          } else {
            // Reverse parse commands
            let feedbackMessage = '';
            switch (gameType) {
              case 'car':
                feedbackMessage = `Expected: ${reverseParseCarCommands(todoCommands as CarCommands[])}. Given: ${reverseParseCarCommands(commands as CarCommands[])}`;
                break;
              case 'tile':
                feedbackMessage = `Expected: ${reverseParseTileCommands(todoCommands as TileCommands[])}. Given: ${reverseParseTileCommands(commands as TileCommands[])}`;
                break;
              case 'bot':
                feedbackMessage = `Expected: ${reverseParseDrawingBotCommands(todoCommands as DrawingBotCommands[])}. Given: ${reverseParseDrawingBotCommands(commands as DrawingBotCommands[])}`;
                break;
            }
            
            // Get feedback from API
            getFeedback(feedbackMessage).then((feedback) => {
              setResultMessage(`Oh no, that’s wrong. Try again! Feedback: ${feedback}`);
              setShowDialog(true);
              setControlCommand({ type: "reset" });
            }).catch((error) => {
              console.error('Error getting feedback:', error);
              setResultMessage('Oh no, that’s wrong. Try again!');
              setShowDialog(true);
              setControlCommand({ type: "reset" });
            });
          }
        }
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(divRef.current?.clientWidth || 500, divRef.current?.clientHeight || 200);
    };
  };

  const canvasRef = useP5(sketch);

  return (
    <div ref={divRef} className='w-full h-full rounded-xl border-2'>
      <div ref={canvasRef}></div>
      
      <FeedbackDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        message={resultMessage}
      />
    </div>
  );
};

export default DrawingCanvas;
