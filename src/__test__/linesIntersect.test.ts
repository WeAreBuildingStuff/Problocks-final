import linePass from "../utils/linesPass";

describe('linePass', () => {
  test('should return true for line1 passing line2', () => {
    const line1 = { x1: 0, y1: 0, x2: 0, y2: 10 };
    const line2 = { x1: 0, y1: 0, x2: 0, y2: 10 };
    
    expect(linePass(line1, line2)).toBe(true);
  });

  test('should return false for line1 not passing line2', () => {
    const line1 = { x1: 0, y1: 0, x2: 0, y2: 5 };
    const line2 = { x1: 0, y1: 0, x2: 0, y2: 10 };

    expect(linePass(line1, line2)).toBe(false);
  });

  test('should return false for non parallel', () => {
    const line1 = { x1: 0, y1: 0, x2: 10, y2: 10 };
    const line2 = { x1: 0, y1: 0, x2: 10, y2: 11 };

    expect(linePass(line1, line2)).toBe(false);
  });

  test('should return true for overlapping lines', () => {
    const line1 = { x1: 0, y1: 0, x2: 0, y2: 15 };
    const line2 = { x1: 0, y1: 0, x2: 0, y2: 10 };

    expect(linePass(line1, line2)).toBe(true);
  });

  test('should return true for overlapping lines', () => {
    const line1 = { x1: 0, y1: 0, x2: 0, y2: 15 };
    const line2 = { x1: 0, y1: 2, x2: 0, y2: 10 };

    expect(linePass(line1, line2)).toBe(true);
  });

  test('should return true for overlapping lines', () => {
    const line1 = { x1: 0, y1: 0, x2: 0, y2: 10 };
    const line2 = { x1: 0, y1: 5, x2: 0, y2: 10 };

    expect(linePass(line1, line2)).toBe(true);
  });

  test('should return false for parallel but not touching/passing', () => {
    const line1 = { x1: 0, y1: 0, x2: 10, y2: 10 };
    const line2 = { x1: 0, y1: 1, x2: 10, y2: 11 };

    expect(linePass(line1, line2)).toBe(false);
  });
});
