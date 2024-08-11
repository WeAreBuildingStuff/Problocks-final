import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white rounded-lg p-6 max-w-lg mx-auto">
        <DialogTitle className="text-xl font-semibold mb-4">Result</DialogTitle>
        <DialogDescription className="text-md">
          {message}
        </DialogDescription>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
