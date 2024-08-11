'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useP5 } from '@/hooks/useP5';
import p5 from 'p5';
import { CarAnimation } from '@/utils/CarGame';
import { TileConnectionGame } from '@/utils/TileConnectionGame';
import { DrawingBotGame } from '@/utils/DrawingBotGame';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
        
        if (game.isComplete && controlCommand.type !== 'stop') {
          const result = game.check();
          
          setResultMessage(result ? 'Congrats! You got it right!' : 'Oh no, that\'s wrong. Try again!');
          setShowDialog(true);
          setControlCommand({ type: "reset" });
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
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogTitle>Result</DialogTitle>
          <DialogDescription>
            {resultMessage}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DrawingCanvas;
