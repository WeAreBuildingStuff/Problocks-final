'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CircleCheckIcon, CircleXIcon } from '@/components/custom/sub-components/Icons';
import { getFeedback } from '@/utils/getGeminiResponse';

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
  generateFeedbackMessage: () => string;
  handleNext?: () => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  open,
  onClose,
  message,
  generateFeedbackMessage,
  handleNext,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [hintsModalOpen, setHintsModalOpen] = useState(false);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;

    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find(
      (voice) =>
        voice.name === "Microsoft Sonia Online (Natural) - English (United Kingdom)" ||
        voice.name === 'Google UK English Female' ||
        voice.name === 'Samantha'
    ) || voices[0];

    utterance.onstart = () => setIsLoading(true);
    utterance.onend = () => setIsLoading(false);

    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (feedbackMessage) {
      speak(feedbackMessage);
    }
  }, [feedbackMessage]);

  const handleFeedbackRequest = async () => {
    setHintsModalOpen(true);
    setIsLoading(true);
    const feedbackMessage = generateFeedbackMessage();

    try {
      const feedback = await getFeedback(feedbackMessage);
      setFeedbackMessage(`${feedback}`);
    } catch (error) {
      console.error('Error getting feedback:', error);
      setFeedbackMessage('There was an error getting feedback. Please try again!');
    } finally {
      setIsLoading(false);
    }
  };

  const isError = message.includes('wrong');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button className="hidden" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-white text-black rounded-lg p-6 mx-auto shadow-lg">
        <div className="flex flex-col items-center gap-4 py-8">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
          ) : isError ? (
            <CircleXIcon className="h-12 w-12 text-red-500" aria-label="Error mark" />
          ) : (
            <CircleCheckIcon className="h-12 w-12 text-green-500" aria-label="Success check mark" />
          )}
          <div className="space-y-2 text-center">
            <DialogTitle className="text-2xl font-bold">Level Complete!</DialogTitle>
            <DialogDescription className="text-gray-600">
              <p>{message}</p>
              {feedbackMessage && <p className="mt-4">{feedbackMessage}</p>}
            </DialogDescription>
          </div>
        </div>
        <DialogFooter className="justify-between">
          {!isError && handleNext && (
            <Button variant="link" onClick={handleNext}>
              Next Level
            </Button>
          )}
          {isError && !isLoading && (
            <Button variant="link" onClick={handleFeedbackRequest}>
              Get Hint
            </Button>
          )}
        </DialogFooter>
      </DialogContent>

      <Dialog open={hintsModalOpen} onOpenChange={setHintsModalOpen}>
        <DialogContent className="sm:max-w-[450px] bg-white text-black rounded-lg p-6 mx-auto shadow-lg">
          <div className="flex flex-col items-center gap-4 py-8">
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold">Feedback</h3>
                <p className="text-gray-600">{feedbackMessage}</p>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="link" onClick={() => setHintsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default FeedbackDialog;
