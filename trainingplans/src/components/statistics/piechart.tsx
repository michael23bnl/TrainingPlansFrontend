import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Statistic } from "../../api/interfaces";

interface PieChartProps {
  data: Statistic[];
  colors: string[];
}

export const PieChart = ({ data, colors }: PieChartProps) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const counts = data.reduce((a: Record<string, number>, i) => {
      a[i.muscleGroup] = (a[i.muscleGroup] || 0) + 1;
      return a;
    }, {});

    chart.current?.destroy();

    chart.current = new Chart(ref.current, {
      type: "pie",
      data: {
        labels: Object.keys(counts),
        datasets: [{
          data: Object.values(counts),
          backgroundColor: colors
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    return () => chart.current?.destroy();
  }, [data]);

  return (
    <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
      <canvas ref={ref} />
    </div>
  );
};
