const carGameLevels: CarCommands[][] = [
  [
    { type: 'forward', distance: 1 },
  ],
  [
    { type: 'forward', distance: 1 },
    { type: 'forward', distance: 1 },
  ],
  [
    { type: 'backward', distance: 1 },
    { type: 'backward', distance: 1 },
  ],
  [
    { type: 'forward', distance: 1 },
    { type: 'forward', distance: 1 },
    { type: 'forward', distance: 1 },
    { type: 'forward', distance: 1 },
  ],
  [
    { type: 'forward', distance: 4 },
  ],
  [
    { type: 'backward', distance: 2 },
    { type: 'forward', distance: 4 },
  ],
  [
    { type: 'forward', distance: 2 },
    { type: 'forward', distance: 2 },
  ]
];

export default carGameLevels;
