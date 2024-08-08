export default function parseCarCommands(input: string): CarCommands[] {
  const commands: CarCommands[] = [];

  const lines = input.split('\n');
  for (const line of lines) {
    const commandParts = line.split(';').map(part => part.trim()).filter(part => part.length > 0);

    for (const part of commandParts) {
      const matchForward = part.match(/forward\((\d+)\)/);
      if (matchForward) {
        commands.push({ type: 'forward', distance: parseInt(matchForward[1], 10) });
        continue;
      }

      const matchBackward = part.match(/backward\((\d+)\)/);
      if (matchBackward) {
        commands.push({ type: 'backward', distance: parseInt(matchBackward[1], 10) });
        continue;
      }

      const matchTurnClockwise = part.match(/turnClockwise\((\d+)\)/);
      if (matchTurnClockwise) {
        commands.push({ type: 'turnClockwise', degrees: parseInt(matchTurnClockwise[1], 10) });
        continue;
      }

      const matchTurnCounterClockwise = part.match(/turnCounterClockwise\((\d+)\)/);
      if (matchTurnCounterClockwise) {
        commands.push({
          type: 'turnCounterClockwise',
          degrees: parseInt(matchTurnCounterClockwise[1], 10)
        });
        continue;
      }
    }
  }

  return commands;
}
