"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ESP32ControllerProps {
  commands: CarCommands[];
}

const ESP32Controller: React.FC<ESP32ControllerProps> = ({ commands }) => {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const calculateDuration = (command: CarCommands) => {
    if (command.type === 'forward' || command.type === 'backward') {
      return command.distance * 10;
    } else {
      return command.degrees * 10;
    }
  };

  const commandToString = (command: CarCommands) => {
    const duration = calculateDuration(command);
    switch (command.type) {
      case 'forward':
        return `F${duration}`;
      case 'backward':
        return `B${duration}`;
      case 'turnClockwise':
        return `R${duration}`;
      case 'turnCounterClockwise':
        return `L${duration}`;
      default:
        return '';
    }
  };

  const handlePlayCommands = async (commands: CarCommands[]) => {
    for (const command of commands) {
      const commandStr = commandToString(command);
      if (commandStr) {
        await sendCommand(commandStr);
        await new Promise((resolve) => setTimeout(resolve, calculateDuration(command)));
      }
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
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Command List</h2>
            <ul className="list-disc pl-5">
              {commands.map((command, index) => (
                <li key={index}>{`${command.type} ${command.type === 'forward' || command.type === 'backward' ? command.distance : command.degrees}`}</li>
              ))}
            </ul>
          </div>

          <Button onClick={() => handlePlayCommands(commands)} className="w-full mt-4">
            Play Commands
          </Button>
        </>
      )}
    </div>
  );
};

export default ESP32Controller;
