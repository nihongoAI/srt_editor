import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, SkipBack } from 'lucide-react';

interface AudioWaveformProps {
  audioUrl: string | null;
  onReady: () => void;
}

export function AudioWaveform({ audioUrl, onReady }: AudioWaveformProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (waveformRef.current && audioUrl) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F46E5',
        progressColor: '#818CF8',
        cursorColor: '#4F46E5',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 200,
        barGap: 3,
        autoplay: false,
      });

      wavesurfer.current.load(audioUrl);
      
      wavesurfer.current.on('ready', () => {
        setDuration(wavesurfer.current?.getDuration() || 0);
        onReady();
      });

      wavesurfer.current.on('audioprocess', () => {
        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
      });

      wavesurfer.current.on('play', () => setIsPlaying(true));
      wavesurfer.current.on('pause', () => setIsPlaying(false));

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    wavesurfer.current?.playPause();
  };

  const restart = () => {
    wavesurfer.current?.stop();
    wavesurfer.current?.play();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      <div ref={waveformRef} className="mb-4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={restart}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Restart"
          >
            <SkipBack className="w-6 h-6 text-indigo-600" />
          </button>
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full hover:bg-gray-100"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-indigo-600" />
            ) : (
              <Play className="w-6 h-6 text-indigo-600" />
            )}
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}