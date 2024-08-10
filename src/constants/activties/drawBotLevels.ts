const drawBotGameLevels: DrawingBotCommands[][][] = [
  [
    [{ type: "penDown" }, { type: "forward", distance: 2 }, { type: "penUp" }],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "penUp" },
      { type: "backward", distance: 1 },
    ],
    [
      { type: "forward", distance: 1 },
      { type: "penDown" },
      { type: "backward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 1 },
      { type: "penUp" },
      { type: "forward", distance: 1 },
      { type: "penDown" },
      { type: "backward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 3 },
      { type: "penUp" },
      { type: "backward", distance: 1 },
      { type: "penDown" },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
  ],

  [
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 45 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "penUp" },
      { type: "forward", distance: 1 },
      { type: "penDown" },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 135 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
  ],

  [
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 1 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 45 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "penUp" },
    ],
  ],

  [
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 72 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 72 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 72 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 72 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
  ],

  [
    [
      { type: "penDown" },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 72 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 72 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 72 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 72 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
  ],

  [
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "penUp" },
      { type: "forward", distance: 2 },
      { type: "penDown" },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
      { type: "forward", distance: 1 },
      { type: "penDown" },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
      { type: "turnCounterClockwise", degrees: 60 },
      { type: "forward", distance: 1 },
      { type: "penDown" },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 45 },
      { type: "forward", distance: 1 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 45 },
      { type: "penUp" },
      { type: "forward", distance: 1 },
      { type: "penDown" },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
      { type: "turnCounterClockwise", degrees: 180 },
      { type: "forward", distance: 2 },
      { type: "penDown" },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
  ],

  [
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penDown" },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 3 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
      { type: "backward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "penDown" },
      { type: "forward", distance: 3 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 3 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 120 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
      { type: "turnCounterClockwise", degrees: 180 },
      { type: "forward", distance: 1 },
      { type: "penDown" },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 3 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 3 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 3 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 3 },
      { type: "penUp" },
      { type: "turnCounterClockwise", degrees: 45 },
      { type: "forward", distance: 1 },
      { type: "penDown" },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
    ],
    [
      { type: "penDown" },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "turnClockwise", degrees: 60 },
      { type: "forward", distance: 2 },
      { type: "penUp" },
      { type: "turnCounterClockwise", degrees: 180 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "penDown" },
      { type: "forward", distance: 3 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 3 },
      { type: "penUp" },
      { type: "backward", distance: 1 },
      { type: "turnCounterClockwise", degrees: 90 },
      { type: "penDown" },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "turnClockwise", degrees: 90 },
      { type: "forward", distance: 1 },
      { type: "penUp" },
    ],
  ],
];

export default drawBotGameLevels;
