import { useState, useEffect } from "react";
import { GetCompletedPlans, searchThroughCompletedPlans } from "../api/plans";
import { Plan } from "../api/interfaces";

export const useCompletedPlanFetching = (searchTerm: string) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = searchTerm 
          ? await searchThroughCompletedPlans(searchTerm)
          : await GetCompletedPlans();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchPlans, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return { plans, loading, setPlans };
};