import React from 'react';
import { formatTime } from '../utils/subtitleUtils';

interface SubtitleEditorProps {
  subtitles: Array<{ start: number; end: number; text: string }>;
  selectedSubtitle: number | null;
  onSelectSubtitle: (index: number) => void;
}

export function SubtitleEditor({ subtitles, selectedSubtitle, onSelectSubtitle }: SubtitleEditorProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Subtitles</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {subtitles.map((subtitle, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg cursor-pointer ${
              selectedSubtitle === index
                ? 'bg-indigo-100 border-2 border-indigo-500'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => onSelectSubtitle(index)}
          >
            <div className="text-sm text-gray-500">
              {formatTime(subtitle.start)} → {formatTime(subtitle.end)}
            </div>
            <div className="mt-1">{subtitle.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}