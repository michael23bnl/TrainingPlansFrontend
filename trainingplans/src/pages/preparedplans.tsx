import { useState } from "react";
import starIcon from '../assets/star.svg';
import { usePreMadePlanFetching } from "../hooks/usePreMadePlanFetching";
import { usePlanFavoriteButtons } from "../hooks/usePlanFavoriteButtons";
import { PlanSearch } from "../components/plans/PlanSearch";
import { PlanList } from "../components/plans/PlanList";

export const PreparedPlansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { plans, loading, setPlans } = usePreMadePlanFetching(searchTerm);
  const { handleAddToFavorites, handleRemoveFromFavorites } = usePlanFavoriteButtons(setPlans);

  return (
    <>
      <PlanSearch 
        value={searchTerm}
        onSearch={setSearchTerm}
        placeholder="Поиск планов по категориям и упражнениям"
      />
      { (loading) ? "" :
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
                <img src={starIcon} className="plan-icon plan-favorite-icon" alt="Add to favorite" />
              </button>
            )
          )}       
        />
      }
    </>
  );
};