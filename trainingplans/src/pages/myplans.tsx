
import { useState } from "react";
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import { useMyPlanFetching } from "../hooks/useMyPlanFetching";
import { PlanSearch } from "../components/plans/PlanSearch";
import { PlanList } from "../components/plans/PlanList";
import { usePlanButtons } from "../hooks/usePlanButtons";

export const MyPlansPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { plans, loading, setPlans } = useMyPlanFetching(searchTerm);
    const { handleDeletePlan, handleEditPlan } = usePlanButtons(setPlans);

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
                            onClick={() => handleEditPlan(plan.id)}
                            className="icon-button"
                            type="button"
                        >
                            <img src={editIcon} className="plan-icon plan-edit-icon" alt="Edit" />
                        </button>                           
                        <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="icon-button"
                            type="button"
                        >
                            <img src={deleteIcon} className="plan-icon plan-delete-icon" alt="Delete" />
                        </button>  
                        </>
                    )}    
                />
            }
        </>
    )
};

export default MyPlansPage;
