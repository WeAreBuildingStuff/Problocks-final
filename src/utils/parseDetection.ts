type Corner = {
  x: number;
  y: number;
}

type Marker = {
  id: number;
  corners: Corner[];
}

type Command = 
  | { type: 'forward'; distance: number }
  | { type: 'backward'; distance: number }
  | { type: 'turnClockwise'; degrees: number }
  | { type: 'turnCounterClockwise'; degrees: number };

type SpecialCommand = 
  | { type: 'startRepeat' }
  | { type: 'endRepeat' };

type MarkerAction = Command | SpecialCommand;

const MARKER_MAP: Record<number, MarkerAction> = {
  0: { type: 'forward', distance: 50 },
  1: { type: 'backward', distance: 50 },
  2: { type: 'turnClockwise', degrees: 90 },
  3: { type: 'turnCounterClockwise', degrees: 90 },
  4: { type: 'startRepeat' },
  5: { type: 'endRepeat' },
  // Add more commands or special actions here as needed
};

export default function parseDetections(detections: Array<Marker>): Command[] {
  let commands: Command[] = [];
  let repeatCommands: Command[] = [];
  let repeatMode = false;

  for (const detection of detections) {
    const action = MARKER_MAP[detection.id];
    if (!action) continue;

    switch (action.type) {
      case 'startRepeat':
        repeatMode = true;
        break;
      case 'endRepeat':
        repeatMode = false;
        commands.push(...repeatCommands);
        repeatCommands = [];
        break;
      default:
        if (repeatMode) {
          repeatCommands.push(action);
        }
        commands.push(action);
    }
  }

  return commands;
}