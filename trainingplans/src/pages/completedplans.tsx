
import { useState } from 'react';
import doneIcon from '../assets/done.svg';
import { useCompletedPlanFetching } from '../hooks/useCompletedPlanFetching';
import { PlanSearch } from "../components/plans/PlanSearch";
import { PlanList } from "../components/plans/PlanList";
import { usePlanCompleteButtons } from '../hooks/usePlanCompleteButtons';

export const CompletedPlansPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { plans, loading, setPlans } = useCompletedPlanFetching(searchTerm);
    const { handleRemoveFromCompletedPage } = usePlanCompleteButtons(setPlans);
  
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
                            onClick={() => handleRemoveFromCompletedPage(plan.id)}
                            className="icon-button"
                            type="button"
                            title="Убрать из выполненных"
                        >
                            <img src={doneIcon} 
                                className="plan-icon plan-done-icon plan-done-icon-active" 
                                alt="Edit" 
                            />
                        </button>  
                        </>
                    )}    
                />
            }
        </>
    );
};
