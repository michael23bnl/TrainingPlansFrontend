import { useState, useEffect, useMemo } from "react";
import { Plan, PlanParameters } from "../api/interfaces";

export const usePlanFetching = (
    searchTerm: string,
    planParameters: PlanParameters,
    fetchPlans: (params: PlanParameters) => Promise<{ plans: Plan[], totalCount: number }>,
    searchThrough: (term: string, params: PlanParameters) => Promise<{ plans: Plan[], totalCount: number }>
) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansSize, setPlansSize] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const memoizedParams = useMemo(() => planParameters, [
      planParameters.pageNumber, 
      planParameters.pageSize
  ]);

  useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = searchTerm 
            ? await searchThrough(searchTerm, memoizedParams)
            : await fetchPlans(memoizedParams);
          console.log(data.plans)
          setPlans(data.plans);
          setPlansSize(data.totalCount);
        } catch (error) {
          console.error("Error fetching plans:", error);
        } finally {
          setLoading(false);
        }
      };
  
      const debounceTimer = setTimeout(fetchData, 300);
      return () => clearTimeout(debounceTimer);
    }, [searchTerm, memoizedParams]);
  
    return { plans, plansSize, loading, setPlans };
  };