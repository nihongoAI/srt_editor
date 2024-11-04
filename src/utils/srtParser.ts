interface Subtitle {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

export function parseTimestamp(timestamp: string): number {
  const [hours, minutes, seconds] = timestamp.split(':');
  const [secs, ms] = seconds.split(',');
  
  return (
    parseInt(hours) * 3600 +
    parseInt(minutes) * 60 +
    parseInt(secs) +
    parseInt(ms) / 1000
  );
}

export function formatTimestamp(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

export function parseSubtitles(content: string): Subtitle[] {
  const blocks = content.trim().split('\n\n');
  
  return blocks.map((block) => {
    const lines = block.split('\n');
    const id = parseInt(lines[0]);
    const [startTime, endTime] = lines[1].split(' --> ');
    const text = lines.slice(2).join('\n');

    return {
      id,
      startTime,
      endTime,
      text,
    };
  });
}