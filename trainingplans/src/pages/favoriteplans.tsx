
import { useState } from 'react';
import starIcon from '../assets/star.svg';
import editIcon from '../assets/edit.svg';
import doneIcon from '../assets/done.svg';
import { useFavoritePlanFetching } from '../hooks/useFavoritePlanFetcing';
import { PlanSearch } from "../components/plans/PlanSearch";
import { PlanList } from "../components/plans/PlanList";
import { usePlanFavoriteButtons } from '../hooks/usePlanFavoriteButtons';
import { usePlanCompleteButtons } from '../hooks/usePlanCompleteButtons';

export const FavoritePlansPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { plans, loading, setPlans } = useFavoritePlanFetching(searchTerm);
    const { handleRemoveFromFavoritesPage, handleEditFavoritePlan } = usePlanFavoriteButtons(setPlans);
    const { handleMarkAsCompleted, handleRemoveCompletedMark } = usePlanCompleteButtons(setPlans);
  
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
                        {
                            plan.isCompleted ? (
                                <button
                                  onClick={() => handleRemoveCompletedMark(plan.id)}
                                  className="icon-button"
                                  type="button"
                                  title="Убрать из выполненных"
                                >
                                  <img src={doneIcon} 
                                    className="plan-icon plan-done-icon plan-done-icon-active" 
                                    alt="Remove completed mark" 
                                  />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleMarkAsCompleted(plan.id)}
                                  className="icon-button"
                                  type="button"
                                  title="Добавить в выполненные"
                                >
                                  <img src={doneIcon} className="plan-icon plan-done-icon" alt="Mark as completed" />
                                </button>
                              )
                        } 
                        </>
                    )}    
                />
            }
        </>
    );
};
