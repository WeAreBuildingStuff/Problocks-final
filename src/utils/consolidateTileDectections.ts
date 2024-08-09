export default function consolidateTileDetections(arrays: any[], tolerance = 2) {
  const allDetections = arrays.flat();

  const uniqueDetections: any[] = [];

  allDetections.forEach(detection => {
    if (!isDetectionSimilarToAny(detection, uniqueDetections, tolerance)) {
      uniqueDetections.push(detection);
    }
  });

  uniqueDetections.sort((a, b) => {
    const minY_a = Math.min(...a.corners.map((corner: { y: number; }) => corner.y));
    const minY_b = Math.min(...b.corners.map((corner: { y: number; }) => corner.y));
    return minY_a - minY_b;
  });

  const groupedDetections: any[][] = [];

  uniqueDetections.forEach(detection => {
    const minY = Math.min(...detection.corners.map((corner: { y: number; }) => corner.y));
    
    let placed = false;
    for (const group of groupedDetections) {
      const groupMinY = Math.min(...group[0].corners.map((corner: { y: number; }) => corner.y));
      if (Math.abs(minY - groupMinY) <= tolerance) {
        group.push(detection);
        placed = true;
        break;
      }
    }

    if (!placed) {
      groupedDetections.push([detection]);
    }
  });

  groupedDetections.forEach(group => {
    group.sort((a, b) => {
      const minX_a = Math.min(...a.corners.map((corner: { x: number; }) => corner.x));
      const minX_b = Math.min(...b.corners.map((corner: { x: number; }) => corner.x));
      return minX_a - minX_b;
    });
  });

  return groupedDetections;
}

function isDetectionSimilarToAny(detection: { id: any; corners: string | any[]; }, uniqueDetections: any[], tolerance: number) {
  return uniqueDetections.some(existingDetection =>
    areDetectionsSimilar(existingDetection, detection, tolerance)
  );
}

function areDetectionsSimilar(detection1: { id: any; corners: string | any[]; }, detection2: { id: any; corners: string | any[]; }, tolerance: number) {
  for (let i = 0; i < detection1.corners.length; i++) {
    const corner1 = detection1.corners[i];
    const corner2 = detection2.corners[i];

    const xDiff = Math.abs(corner1.x - corner2.x);
    const yDiff = Math.abs(corner1.y - corner2.y);

    if (xDiff > tolerance || yDiff > tolerance) {
      return false;
    }
  }

  return true;
}
