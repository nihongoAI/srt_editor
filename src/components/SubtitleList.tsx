import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Subtitle {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

interface SubtitleListProps {
  subtitles: Subtitle[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onAdjustTiming: (id: number, adjustment: number) => void;
}

export function SubtitleList({ subtitles, selectedId, onSelect, onAdjustTiming }: SubtitleListProps) {
  return (
    <div className="w-96 bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Subtitles</h2>
        <div className="flex gap-2">
          <button
            onClick={() => selectedId && onAdjustTiming(selectedId, -0.1)}
            className="p-2 hover:bg-gray-100 rounded"
            title="Fine adjust backwards"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => selectedId && onAdjustTiming(selectedId, 0.1)}
            className="p-2 hover:bg-gray-100 rounded"
            title="Fine adjust forwards"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          <button
            onClick={() => selectedId && onAdjustTiming(selectedId, -1.0)}
            className="p-2 hover:bg-gray-100 rounded"
            title="Coarse adjust backwards"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => selectedId && onAdjustTiming(selectedId, 1.0)}
            className="p-2 hover:bg-gray-100 rounded"
            title="Coarse adjust forwards"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {subtitles.map((subtitle) => (
          <div
            key={subtitle.id}
            onClick={() => onSelect(subtitle.id)}
            className={`p-3 rounded cursor-pointer ${
              selectedId === subtitle.id
                ? 'bg-indigo-100 border-2 border-indigo-500'
                : 'hover:bg-gray-50 border-2 border-transparent'
            }`}
          >
            <div className="text-sm text-gray-600 mb-1">
              {subtitle.startTime} → {subtitle.endTime}
            </div>
            <div className="text-gray-800">{subtitle.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}