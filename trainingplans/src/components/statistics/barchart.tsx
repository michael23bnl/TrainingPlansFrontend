import { useEffect, useRef } from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import type { ChartData } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

interface BarChartProps {
  data: Record<string, number>;
}

export const BarChart = ({ data }: BarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartData: ChartData<'bar'> = {
      labels: Object.keys(data),
      datasets: [{
        label: 'Значения',
        data: Object.values(data),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            enabled: true
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  if (!data) return <div>Нет данных для отображения</div>;

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Статистика</h2>
      <div style={{ position: 'relative', height: '400px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};