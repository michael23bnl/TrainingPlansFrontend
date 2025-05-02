import { useState, useEffect } from "react";
import { getAllPlans, searchThroughMyPlans } from "../api/plans";
import { Plan } from "../api/interfaces";

export const useMyPlanFetching = (searchTerm: string) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = searchTerm 
          ? await searchThroughMyPlans(searchTerm)
          : await getAllPlans();
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