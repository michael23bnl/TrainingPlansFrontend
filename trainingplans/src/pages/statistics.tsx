import { PieChart } from "../components/statistics/piechart";
import { BarChart } from "../components/statistics/barchart";
import { useStatisticsFetching } from "../hooks/useStatisticsFetching";

export const StatisticsPage = () => {

    const { statistics, loading } = useStatisticsFetching();   

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>
        <PieChart data={statistics} />
        <BarChart data={statistics} />
    </>
}