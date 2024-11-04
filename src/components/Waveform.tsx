import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveformProps {
  onTimeUpdate: (time: number) => void;
  wavesurfer: React.MutableRefObject<WaveSurfer | null>;
}

export function Waveform({ onTimeUpdate, wavesurfer }: WaveformProps) {
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F46E5',
        progressColor: '#818CF8',
        cursorColor: '#3730A3',
        height: 128,
        normalize: true,
        splitChannels: false,
      });

      wavesurfer.current.on('timeupdate', onTimeUpdate);

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [onTimeUpdate]);

  return <div ref={waveformRef} className="w-full" />;
}