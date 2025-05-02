import { useState, useEffect } from "react";
import { getStatistics } from "../api/statistics";

export const useStatisticsFetching = () => {
    const [statistics, setStatistics] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            setLoading(true);
            try {
                const data = await getStatistics();
                setStatistics(data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchStatistics, 300);
        return () => clearTimeout(debounceTimer);
    }, []);

    return { statistics, loading };
};