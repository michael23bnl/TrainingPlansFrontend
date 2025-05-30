import { BarChart } from "../components/statistics/barchart";
import { PieChart } from "../components/statistics/piechart";
import { useStatisticsFetching } from "../hooks/useStatisticsFetching";
import { useState } from "react";
import { getColorPalette } from "../components/statistics/colors";

export const StatisticsPage = () => {
    const [statisticPeriod, setStatisticPeriod] = useState<string>("7");
    const { statistics, loading } = useStatisticsFetching(statisticPeriod);

    const labels = Array.from(new Set(statistics.map(s => s.muscleGroup)));
    const colors = getColorPalette(labels.length);

    return (
        <div className="flex flex-col px-[110px]">
            <div className="mt-[50px] w-full flex justify-start items-center">
                <label className="mr-2 font-semibold">Показать статистику за:</label>
                <select
                    className="bg-white text-black px-2 py-1 rounded border"
                    value={statisticPeriod}
                    onChange={(e) => setStatisticPeriod(e.target.value)}
                >
                    <option value="7">последние 7 дней</option>
                    <option value="30">последние 30 дней</option>
                    <option value="90">последние 90 дней</option>
                    <option value="183">последние полгода</option>
                    <option value="365">последний год</option>
                    <option value="all">всё время</option>
                </select>
            </div>

            {loading ? (
                <div className="flex flex-col items-center m-[150px]">
                    <div className="mt-4">Загрузка данных...</div>
                </div>                
            ) : (
                <div className="flex flex-col lg:flex-row justify-center items-center gap-12 m-[50px]">
                    <BarChart data={statistics} colors={colors} />
                    <PieChart data={statistics} colors={colors} />
                </div>
            )}
        </div>
    );
};
