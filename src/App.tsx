import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { SubtitleList } from './components/SubtitleList';
import { AudioWaveform } from './components/AudioWaveform';
import { parseSubtitles, parseTimestamp, formatTimestamp } from './utils/srtParser';

interface Subtitle {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

function App() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleSubtitleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setSubtitles(parseSubtitles(content));
    };
    reader.readAsText(file);
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Revoke previous URL to prevent memory leaks
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    setAudioUrl(URL.createObjectURL(file));
  };

  const handleAdjustTiming = useCallback((id: number, adjustment: number) => {
    setSubtitles((prev) =>
      prev.map((subtitle) => {
        if (subtitle.id !== id) return subtitle;

        const startSeconds = parseTimestamp(subtitle.startTime) + adjustment;
        const endSeconds = parseTimestamp(subtitle.endTime) + adjustment;

        return {
          ...subtitle,
          startTime: formatTimestamp(startSeconds),
          endTime: formatTimestamp(endSeconds),
        };
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Subtitle Timing Editor
          </h1>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer">
              <Upload className="w-5 h-5" />
              Upload SRT
              <input
                type="file"
                accept=".srt"
                onChange={handleSubtitleUpload}
                className="hidden"
              />
            </label>
            <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer">
              <Upload className="w-5 h-5" />
              Upload Audio
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {audioUrl && (
            <AudioWaveform
              audioUrl={audioUrl}
              onReady={() => console.log('Waveform ready')}
            />
          )}
          <SubtitleList
            subtitles={subtitles}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onAdjustTiming={handleAdjustTiming}
          />
        </div>
      </div>
    </div>
  );
}

export default App;