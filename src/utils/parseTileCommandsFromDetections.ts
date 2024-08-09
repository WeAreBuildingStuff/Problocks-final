type Corner = {
  x: number;
  y: number;
};

type Marker = {
  id: number;
  corners: Corner[];
};

type TileCommands = {
  type: 'connect';
  start: string;
  end: string;
};

const TILE_MARKER_MAP: Record<number, string> = {
  31: 'A',
  32: 'B',
  33: 'C',
  34: 'D',
  35: 'E',
  36: 'F',
  37: 'G',
  38: 'H',
  39: 'I',
  40: 'J',
  16: '1',
  42: '2',
  43: '3',
  44: '4',
  45: '5',
  46: '6',
  47: '7',
  48: '8',
  49: '9',
  50: '10',
};

export default function parseTileCommandsFromDectections(detections: Array<Array<Marker>>): TileCommands[] {
  const tileCommands: TileCommands[] = [];

  detections.forEach(detectionArray => {
    if (detectionArray.length !== 4) {
      console.warn('Each detection array should contain exactly 4 markers.');
      return;
    }

    const startLetterMarker = detectionArray[0];
    const startNumberMarker = detectionArray[1];
    const endLetterMarker = detectionArray[2];
    const endNumberMarker = detectionArray[3];

    const startLetter = TILE_MARKER_MAP[startLetterMarker.id];
    const startNumber = TILE_MARKER_MAP[startNumberMarker.id];
    const endLetter = TILE_MARKER_MAP[endLetterMarker.id];
    const endNumber = TILE_MARKER_MAP[endNumberMarker.id];

    if (!startLetter || !startNumber || !endLetter || !endNumber) {
      console.warn('Invalid marker ID detected.');
      return;
    }

    const start = `${startLetter}${startNumber}`;
    const end = `${endLetter}${endNumber}`;

    tileCommands.push({ type: 'connect', start, end });
  });

  return tileCommands;
}
