import { useState } from "react";
import starIcon from '../assets/star.svg';
import { usePlanFetching } from "../hooks/usePlanFetching";
import { getAllPreparedPlans, search } from '../api/plans';
import { usePlanFavoriteButtons } from "../hooks/usePlanFavoriteButtons";
import { PlanSearch } from "../components/plans/PlanSearch";
import { PlanList } from "../components/plans/PlanList";
import { Pagination } from "../components/pagination/pagination";

export const PreparedPlansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10
  });
  const { plans, plansSize, loading, setPlans } = usePlanFetching(searchTerm, pagination, getAllPreparedPlans, search);
  const { handleAddToFavorites, handleRemoveFromFavorites } = usePlanFavoriteButtons(setPlans);

  const handlePageChange = (pageNumber: number) => {
    setPagination(prev => ({ ...prev, pageNumber }));
  };

  return (
    <>
      <PlanSearch 
        value={searchTerm}
        onSearch={(term) => {
          setSearchTerm(prevTerm => {
            if (prevTerm !== term) {
              setPagination(prev => ({
                ...prev,
                pageNumber: 1
              }));
            }
            return term;
          });
        }}
        placeholder="Поиск планов по категориям и упражнениям"
      />
      { (loading) ? "" :
        <>
        <PlanList
          plans={plans}
          headerActionButtons={(plan) => (
            plan.isFavorite ? (
              <button
                onClick={() => handleRemoveFromFavorites(plan.id)}
                className="icon-button"
                type="button"
                title="Удалить из избранного"
              >
                <img src={starIcon} 
                  className="plan-icon plan-favorite-icon plan-favorite-icon-active" 
                  alt="Delete from favorite" 
                />
              </button>
            ) : (
              <button
                onClick={() => handleAddToFavorites(plan.id)}
                className="icon-button"
                type="button"
                title="Добавить в избранное"
              >
                <img src={starIcon} 
                  className="plan-icon plan-favorite-icon" 
                  alt="Add to favorite" 
                />
              </button>
            )
          )}       
        />
        <Pagination
          currentPage={pagination.pageNumber}
          pageSize={pagination.pageSize}
          totalCount={plansSize}
          onPageChange={handlePageChange}
        />
        </>
      }
    </>
  );
};