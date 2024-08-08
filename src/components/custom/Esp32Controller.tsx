"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ESP32Controller = () => {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(1000);
  const [commands, setCommands] = useState<string[]>([]);

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { namePrefix: 'Burger Device' },
          { services: ['0000ffe0-0000-1000-8000-00805f9b34fb'] }
        ],
        optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb']
      });

      const server = await device.gatt?.connect();
      const service = await server?.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
      const characteristic = await service?.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');

      setDevice(device);
      setCharacteristic(characteristic || null);
      setError(null);
    } catch (err) {
      setError('Failed to connect: ' + (err as Error).message);
    }
  };

  const sendCommand = useCallback(async (command: string) => {
    if (characteristic) {
      try {
        await characteristic.writeValue(new TextEncoder().encode(command));
        setError(null);
      } catch (err) {
        setError('Failed to send command: ' + (err as Error).message);
      }
    } else {
      setError('Not connected to device');
    }
  }, [characteristic]);

  useEffect(() => {
    return () => {
      device?.gatt?.disconnect();
    };
  }, [device]);

  const handleAddCommand = (command: string) => () => {
    setCommands((prevCommands) => [...prevCommands, command + duration]);
  };

  const handlePlayCommands = async () => {
    for (const command of commands) {
      await sendCommand(command);
      await new Promise((resolve) => setTimeout(resolve, duration));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">ESP32 Car Control</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!device && (
        <Button onClick={connectBluetooth} className="w-full mb-4">
          Connect to ESP32
        </Button>
      )}

      {device && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleAddCommand('F')} className="w-full">Forward</Button>
            <Button onClick={handleAddCommand('B')} className="w-full">Backward</Button>
            <Button onClick={handleAddCommand('L')} className="w-full">Left</Button>
            <Button onClick={handleAddCommand('R')} className="w-full">Right</Button>
          </div>

          <div className="mt-4">
            <label className="block mb-2">Duration (ms):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-2 border"
            />
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Command List</h2>
            <ul className="list-disc pl-5">
              {commands.map((command, index) => (
                <li key={index}>{command}</li>
              ))}
            </ul>
          </div>

          <Button onClick={handlePlayCommands} className="w-full mt-4">
            Play Commands
          </Button>
        </>
      )}
    </div>
  );
};

export default ESP32Controller;
