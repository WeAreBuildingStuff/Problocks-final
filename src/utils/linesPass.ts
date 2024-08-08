export default function linePass(
  line1: { x1: number; y1: number; x2: number; y2: number },
  line2: { x1: number; y1: number; x2: number; y2: number }
): boolean {
  // Check if the lines are parallel
  const slope1 = (line1.y2 - line1.y1) / (line1.x2 - line1.x1);
  const slope2 = (line2.y2 - line2.y1) / (line2.x2 - line2.x1);

  if (slope1 !== slope2) {
    return false;
  }

  // Check if line1 covers the entire distance of line2
  const [start1, end1] = [
    { x: line1.x1, y: line1.y1 },
    { x: line1.x2, y: line1.y2 },
  ];
  const [start2, end2] = [
    { x: line2.x1, y: line2.y1 },
    { x: line2.x2, y: line2.y2 },
  ];

  const minX1 = Math.min(start1.x, end1.x);
  const maxX1 = Math.max(start1.x, end1.x);
  const minX2 = Math.min(start2.x, end2.x);
  const maxX2 = Math.max(start2.x, end2.x);

  const minY1 = Math.min(start1.y, end1.y);
  const maxY1 = Math.max(start1.y, end1.y);
  const minY2 = Math.min(start2.y, end2.y);
  const maxY2 = Math.max(start2.y, end2.y);

  return (
    minX1 <= minX2 &&
    maxX1 >= maxX2 &&
    minY1 <= minY2 &&
    maxY1 >= maxY2 &&
    (slope1 === 0 || slope1 === Infinity)
  );
}