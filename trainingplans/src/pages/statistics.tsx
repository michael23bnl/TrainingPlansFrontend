import { BarChart } from "../components/statistics/barchart";
import { PieChart } from "../components/statistics/piechart";
import { useStatisticsFetching } from "../hooks/useStatisticsFetching";
import { useState } from "react";
import { getColorPalette } from "../components/statistics/colors";
import { StatisticsEmpty } from "../components/statistics/StatisticsEmpty";

export const StatisticsPage = () => {
    const [statisticPeriod, setStatisticPeriod] = useState<string>("7");
    const [diagramType, setDiagramType] = useState<string>("bar");
    const { statistics, loading } = useStatisticsFetching(statisticPeriod);

    const labels = Array.from(new Set(statistics.map(s => s.muscleGroup)));
    const colors = getColorPalette(labels.length);

    return (
        <>
            {loading ? (
                <div className="flex flex-col items-center m-[150px]">
                    <div className="mt-4">Загрузка данных...</div>
                </div>
            ) : statistics.length === 0 ? (
                <StatisticsEmpty />
            ) : (
                <div className="flex flex-col px-[110px]">
                    <div className="flex flex-col">
                        <div className="w-full flex items-center mt-[50px]">
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
                        <div className="w-full flex justify-start items-center mt-[25px]">
                            <label className="mr-2 font-semibold">Тип диаграммы:</label>
                            <select
                                className="bg-white text-black px-2 py-1 rounded border"
                                value={diagramType}
                                onChange={(e) => setDiagramType(e.target.value)}
                            >
                                <option value="bar">столбчатая</option>
                                <option value="pie">круговая</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-12 m-[50px]">
                        {diagramType == "bar" ? (
                            <BarChart data={statistics} colors={colors} />
                        ) : (
                            <PieChart data={statistics} colors={colors} />
                        )}                      
                    </div>
                </div>
            )}
        </>
    );
};