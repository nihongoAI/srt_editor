import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeControlsProps {
  onAdjustTime: (direction: 'up' | 'down' | 'left' | 'right') => void;
  disabled: boolean;
}

export function TimeControls({ onAdjustTime, disabled }: TimeControlsProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Time Adjustment</h2>
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        <div />
        <button
          onClick={() => onAdjustTime('up')}
          disabled={disabled}
          className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <div />
        <button
          onClick={() => onAdjustTime('left')}
          disabled={disabled}
          className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="p-2 text-center text-sm">
          <div>↔ ±1.0s</div>
          <div>↕ ±0.1s</div>
        </div>
        <button
          onClick={() => onAdjustTime('right')}
          disabled={disabled}
          className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div />
        <button
          onClick={() => onAdjustTime('down')}
          disabled={disabled}
          className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
        <div />
      </div>
    </div>
  );
}