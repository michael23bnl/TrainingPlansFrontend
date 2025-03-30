
import { useState } from 'react';
import starIcon from '../assets/star.svg';
import editIcon from '../assets/edit.svg';
import { useFavoritePlanFetching } from '../hooks/useFavoritePlanFetcing';
import { PlanSearch } from "../components/plans/PlanSearch";
import { PlanList } from "../components/plans/PlanList";
import { usePlanFavoriteButtons } from '../hooks/usePlanFavoriteButtons';

export const FavoritePlansPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { plans, loading, setPlans } = useFavoritePlanFetching(searchTerm);
    const { handleRemoveFromFavoritesPage, handleEditFavoritePlan } = usePlanFavoriteButtons(setPlans);
  
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
                        <>
                        <button
                            onClick={() => handleEditFavoritePlan(plan.id, plan.createdBy)}
                            className="icon-button"
                            type="button"
                            title="Редактировать"
                        >
                            <img src={editIcon} className="plan-icon plan-edit-icon" alt="Delete" />
                        </button> 
                        <button
                            onClick={() => handleRemoveFromFavoritesPage(plan.id)}
                            className="icon-button"
                            type="button"
                            title="Удалить из избранного"
                        >
                            <img src={starIcon} className="plan-icon plan-favorite-icon plan-favorite-icon-active" alt="Edit" />
                        </button>  
                        </>
                    )}    
                />
            }
        </>
    );
};
