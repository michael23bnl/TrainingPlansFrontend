import { useState, useEffect } from "react";
import { getAllPreparedPlans, search } from "../api/plans";
import { Plan } from "../api/interfaces";

export const usePreMadePlanFetching = (searchTerm: string) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = searchTerm 
          ? await search(searchTerm)
          : await getAllPreparedPlans();
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