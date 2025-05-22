

const baseColors = [
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 206, 86, 0.6)",
  "rgba(75, 192, 192, 0.6)",
  "rgba(153, 102, 255, 0.6)",
  "rgba(255, 159, 64, 0.6)",
  "rgba(123, 189, 69, 0.6)",
  "rgba(100, 200, 180, 0.6)",
  "rgba(82, 245, 90, 0.6)",
];

function generateRndomColor(alpha = 0.6): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getColorPalette(length: number): string[] {
  const palette = [...baseColors];
  while (palette.length < length) {
    palette.push(generateRndomColor());
  }
  return palette.slice(0, length);
}
