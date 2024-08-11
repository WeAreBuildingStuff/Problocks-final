export default function reverseParseTileCommands(commands: TileCommands[]): string {
  const commandStrings = commands.map(command => {
    if (command.type === 'connect') {
      return `connect(${command.start}, ${command.end})`;
    }
    throw new Error(`Unknown command type: ${command.type}`);
  });

  return commandStrings.join('\n');
}
