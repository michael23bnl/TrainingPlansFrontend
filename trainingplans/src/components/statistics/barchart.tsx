import { useEffect, useRef } from "react";
import { Statistic } from "../../api/interfaces";
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData } from "chart.js";

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface BarChartProps {
  data: Statistic[];
  colors: string[];
}

export const BarChart = ({ data, colors }: BarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const countByMuscleGroup: Record<string, number> = {};
    for (const stat of data) {
      countByMuscleGroup[stat.muscleGroup] = (countByMuscleGroup[stat.muscleGroup] || 0) + 1;
    }

    const labels = Object.keys(countByMuscleGroup);

    const counts = labels.map((group) => countByMuscleGroup[group]);

    const chartData: ChartData<"bar"> = {
      labels,
      datasets: [
        {
          label: "Количество выполненных упражнений",
          data: counts,
          backgroundColor: labels.map((_, i) => colors[i % colors.length]),
        },
      ],
    };

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Категории упражнений",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Количество упражнений",
            },
            ticks: {
              stepSize: 1,
              precision: 0
            }
          },
        },
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [data]);

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Распределение по мышечным группам</h2>
      <div style={{ position: "relative", aspectRatio: "2 / 1" }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );

};
