export default function reverseParseDrawingBotCommands(commands: DrawingBotCommands[]): string {
  const commandStrings = commands.map(command => {
    switch (command.type) {
      case 'forward':
        return `forward(${command.distance})`;
      case 'backward':
        return `backward(${command.distance})`;
      case 'turnClockwise':
        return `turnClockwise(${command.degrees})`;
      case 'turnCounterClockwise':
        return `turnCounterClockwise(${command.degrees})`;
      case 'penDown':
        return `penDown()`;
      case 'penUp':
        return `penUp()`
    }
  });

  return commandStrings.join('\n');
}
