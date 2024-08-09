type Corner = {
  x: number;
  y: number;
};

type Marker = {
  id: number;
  corners: Corner[];
};

type ViableCommand = CarCommands | DrawingBotCommands

type SpecialCommand = 
  | { type: 'startRepeat'; repeatCount: number }
  | { type: 'endRepeat' };

type MarkerAction = ViableCommand | SpecialCommand;

const MARKER_MAP: Record<number, MarkerAction> = {
  0: { type: 'forward', distance: 100 },
  1: { type: 'backward', distance: 100 },
  2: { type: 'turnClockwise', degrees: 90 },
  3: { type: 'turnCounterClockwise', degrees: 90 },
  6: { type: 'penUp'},
  7: { type: 'penDown'},
  12: { type: 'startRepeat', repeatCount: 2 },
  13: { type: 'startRepeat', repeatCount: 3 },
  14: { type: 'startRepeat', repeatCount: 4 },
  15: { type: 'startRepeat', repeatCount: 5 },
  16: { type: 'startRepeat', repeatCount: 6 },
  17: { type: 'startRepeat', repeatCount: 7 },
  5: { type: 'endRepeat' },
};

export default function parseDetections(detections: Array<Marker>): Command[] {
  let commands: Command[] = [];
  let repeatCommands: Command[] = [];
  let repeatCount = 0;
  let repeatMode = false;

  for (const detection of detections) {
    const action = MARKER_MAP[detection.id];
    if (!action) continue;

    switch (action.type) {
      case 'startRepeat':
        repeatMode = true;
        repeatCount = action.repeatCount;
        break;
      case 'endRepeat':
        repeatMode = false;
        for (let i = 0; i < repeatCount; i++) {
          commands.push(...repeatCommands);
        }
        repeatCommands = [];
        break;
      default:
        if (repeatMode) {
          repeatCommands.push(action);
        } else {
          commands.push(action);
        }
        break;
    }
  }

  return commands;
}
