export function formatTime(seconds: number): string {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}.${ms.toString().padStart(3, '0')}`;
}

export function parseSubtitles(content: string): Array<{ start: number; end: number; text: string }> {
  const lines = content.trim().split('\n');
  const subtitles = [];
  let currentSubtitle: { start: number; end: number; text: string } | null = null;

  for (const line of lines) {
    if (line.includes('-->')) {
      const [start, end] = line.split('-->').map(timeStr => {
        const [h, m, s] = timeStr.trim().split(':');
        const [sec, ms] = s.split(',');
        return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(sec) + parseInt(ms) / 1000;
      });
      currentSubtitle = { start, end, text: '' };
    } else if (currentSubtitle && line.trim() !== '' && !line.trim().match(/^\d+$/)) {
      currentSubtitle.text += (currentSubtitle.text ? '\n' : '') + line.trim();
    } else if (line.trim() === '' && currentSubtitle) {
      subtitles.push(currentSubtitle);
      currentSubtitle = null;
    }
  }

  if (currentSubtitle) {
    subtitles.push(currentSubtitle);
  }

  return subtitles;
}