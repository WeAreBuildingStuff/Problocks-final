const carGameLevels: CarCommands[][][] = [
  // Forwards and backwards
  [
    [{ type: "forward", distance: 2 }],
    [{ type: "backward", distance: 3 }],
    [
      { type: "forward", distance: 2 },
      { type: "backward", distance: 1 },
    ],
    [
      { type: "backward", distance: 2 },
      { type: "forward", distance: 4 },
    ],
    [
      { type: "forward", distance: 1 },
      { type: "backward", distance: 3 },
      { type: "forward", distance: 2 },
    ],
  ],
  
  // Turns (2 max)
  [
    [
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
    ],
    [
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 3 },
    ],
    [
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 180 },
    ],
    [
      { type: "turnCounterClockwise", degrees: 45 },
      { type: "turnClockwise", degrees: 45 },
    ],
    [
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
    ],
  ],
  
  // Turns (4 max)
  [
    [
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnCounterClockwise", degrees: 90 },
    ],
    [
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 1 },
    ],
    [
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
    ],
    [
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 180 },
      { type: "forward", distance: 2 },
    ],
    [
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
    ],
  ],
  
  // Loops
  [
    [
      { type: "forward", distance: 1 },
      { type: "forward", distance: 1 },
      { type: "forward", distance: 1 },
    ],
    [
      { type: "turnClockwise", degrees: 90 },
      { type: "turnClockwise", degrees: 90 },
      { type: "turnClockwise", degrees: 90 },
      { type: "turnClockwise", degrees: 90 },
    ],
    [
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
    ],
    [
      { type: "forward", distance: 2 },
      { type: "backward", distance: 1 },
      { type: "forward", distance: 2 },
      { type: "backward", distance: 1 },
    ],
    [
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 1 },
    ],
  ],
  
  // Complex
  [
    [
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "backward", distance: 1 },
    ],
    [
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 45 },
    ],
    [
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 180 },
      { type: "forward", distance: 1 },
    ],
    [
      { type: "backward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
    ],
    [
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 45 },
      { type: "backward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
    ],
  ],
  
  // Very Complex
  [
    [
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnCounterClockwise", degrees: 45 },
      { type: "backward", distance: 1 },
      { type: "turnClockwise", degrees: 135 },
      { type: "forward", distance: 2 },
    ],
    [
      { type: "turnCounterClockwise", degrees: 45 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "backward", distance: 1 },
      { type: "turnCounterClockwise", degrees: 180 },
      { type: "forward", distance: 3 },
      { type: "turnClockwise", degrees: 135 },
    ],
    [
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "backward", distance: 1 },
      { type: "turnClockwise", degrees: 180 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 45 },
    ],
    [
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 45 },
      { type: "backward", distance: 1 },
      { type: "turnClockwise", degrees: 135 },
      { type: "forward", distance: 3 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "backward", distance: 2 },
    ],
    [
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "backward", distance: 1 },
      { type: "turnClockwise", degrees: 180 },
      { type: "forward", distance: 3 },
      { type: "turnCounterClockwise", degrees: 45 },
      { type: "backward", distance: 2 },
    ],
  ],
];

export default carGameLevels;