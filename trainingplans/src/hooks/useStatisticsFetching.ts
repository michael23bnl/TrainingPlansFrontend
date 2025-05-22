import { useState, useEffect } from "react";
import { getStatistics } from "../api/statistics";
import { Statistic } from "../api/interfaces";

export const useStatisticsFetching = (period: string) => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const data: Statistic[] = await getStatistics(period); // передаем период
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchStatistics, 300);
    return () => clearTimeout(debounceTimer);
  }, [period]);

  return { statistics, loading };
};

