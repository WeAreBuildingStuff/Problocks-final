import parseCarCommands from '../../src/utils/parseCarCommands';
import reverseParseCarCommands from '../../src/utils/reverseParseCarCommands';

describe('parseCarCommands', () => {
  it('should parse forward command', () => {
    const input : CarCommands[] = [{ type: 'forward', distance: 10 }]
    const reverseParsed = reverseParseCarCommands(input);
    const result = parseCarCommands(reverseParsed);
    expect(result).toEqual([{ type: 'forward', distance: 10 }]);
  });

  it('should parse backward command', () => {
    const input : CarCommands[] = [{ type: 'backward', distance: 5 }];
    const reverseParsed = reverseParseCarCommands(input);
    const result = parseCarCommands(reverseParsed);
    expect(result).toEqual([{ type: 'backward', distance: 5 }]);
  });

  it('should parse turnClockwise command', () => {
    const input : CarCommands[] = [{ type: 'turnClockwise', degrees: 90 }];
    const reverseParsed = reverseParseCarCommands(input);
    const result = parseCarCommands(reverseParsed);
    expect(result).toEqual([{ type: 'turnClockwise', degrees: 90 }]);
  });

  it('should parse turnCounterClockwise command', () => {
    const input : CarCommands[] = [{ type: 'turnCounterClockwise', degrees: 45 }];
    const reverseParsed = reverseParseCarCommands(input);
    const result = parseCarCommands(reverseParsed);
    expect(result).toEqual([{ type: 'turnCounterClockwise', degrees: 45 }]);
  });

  it('should parse a sequence of commands', () => {
    const input : CarCommands[] = [
      { type: 'forward', distance: 10 },
      { type: 'backward', distance: 5 },
      { type: 'turnClockwise', degrees: 90 },
      { type: 'turnCounterClockwise', degrees: 45 }
    ];
    const reverseParsed = reverseParseCarCommands(input);
    const result = parseCarCommands(reverseParsed);
    expect(result).toEqual([
      { type: 'forward', distance: 10 },
      { type: 'backward', distance: 5 },
      { type: 'turnClockwise', degrees: 90 },
      { type: 'turnCounterClockwise', degrees: 45 }
    ]);
  });
});
