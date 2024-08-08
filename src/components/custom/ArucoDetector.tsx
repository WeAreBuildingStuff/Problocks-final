'use client';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import AR from '@/lib/aruco';
import consolidateDetections from '@/utils/consolidateDetections';
import parseDetections from '@/utils/parseDetection';
import { Button } from '../ui/button';

interface Corner {
  x: number;
  y: number;
}

interface Marker {
  id: number;
  corners: Corner[];
}

interface ArucoDetectorProps {
  setCommands: React.Dispatch<React.SetStateAction<CarCommands[] | TileCommands[] | DrawingBotCommands[]>>
}

const ArucoDetector = ({ setCommands }: ArucoDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const detectorRef = useRef<AR.Detector | null>(null);
  const [pastDetections, setPastDetections] = useState<Marker[][]>([]);
  const [consolidatedDetections, setConsolidatedDetections] = useState<Marker[]>([]);

  const startVideoStream = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          videoRef.current.onloadedmetadata = () => {
            if (canvasRef.current) {
              canvasRef.current.width = videoRef.current!.videoWidth;
              canvasRef.current.height = videoRef.current!.videoHeight;
              contextRef.current = canvasRef.current.getContext('2d');
            }
          };
        }
      } catch (err) {
        console.error('Error accessing video stream:', err);
      }
    }
  };

  const initializeDetector = () => {
    detectorRef.current = new AR.Detector({
      dictionaryName: 'ARUCO',
      maxHammingDistance: 50,
    });
  };

  const captureSnapshot = useCallback(() => {
    if (canvasRef.current && contextRef.current && videoRef.current) {
      contextRef.current.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, []);

  const drawMarkers = useCallback((markers: Marker[]) => {
    if (!contextRef.current) return;

    markers.forEach((marker) => {
      const corners = marker.corners;

      contextRef.current!.strokeStyle = 'red';
      contextRef.current!.lineWidth = 3;
      contextRef.current!.beginPath();
      corners.forEach((corner, j) => {
        contextRef.current!.moveTo(corner.x, corner.y);
        const nextCorner = corners[(j + 1) % corners.length];
        contextRef.current!.lineTo(nextCorner.x, nextCorner.y);
      });
      contextRef.current!.stroke();
      contextRef.current!.closePath();

      contextRef.current!.strokeStyle = 'green';
      contextRef.current!.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);

      const [minX, minY] = corners.reduce(
        ([x, y], corner) => [Math.min(x, corner.x), Math.min(y, corner.y)],
        [Infinity, Infinity]
      );
      contextRef.current!.strokeStyle = 'blue';
      contextRef.current!.lineWidth = 1;
      contextRef.current!.strokeText(marker.id.toString(), minX, minY);
    });
  }, []);

  const detectMarkers = useCallback(() => {
    if (contextRef.current && canvasRef.current && videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      captureSnapshot();
      const imageData = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      if (detectorRef.current) {
        const markers = detectorRef.current.detect(imageData);

        drawMarkers(markers);

        setPastDetections((prev) => {
          const updatedDetections = [...prev, markers];
          if (updatedDetections.length > 20) {
            updatedDetections.shift();
          }
          return updatedDetections;
        });
      }
    }
    requestAnimationFrame(detectMarkers);
  }, [captureSnapshot, drawMarkers]);

  const consolidateAndLogDetections = () => {
    console.log(pastDetections);
    const uniqueDetections = consolidateDetections(pastDetections, 20);
    setConsolidatedDetections(uniqueDetections);
    const commands = parseDetections(uniqueDetections);
    console.log('Consolidated Detections:', uniqueDetections);
    console.log(commands)
    setCommands(commands);
  };

  useEffect(() => {
    const initialize = async () => {
      await startVideoStream();
      initializeDetector();

      detectMarkers();
    };

    initialize();
  }, [detectMarkers]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className='flex-grow'>

      </div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
      <div className='flex-grow'>
        <Button
          onClick={consolidateAndLogDetections}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-full p-3"
        >
          Capture
        </Button>
      </div>
    </div>
  );
};

export default ArucoDetector;
