import { Plan } from "../api/interfaces";
import { Dispatch, SetStateAction } from "react";
import { deletePlan } from "../api/plans";
import { useNavigate } from "react-router-dom";

export const usePlanButtons = (
    setPlans: Dispatch<SetStateAction<Plan[]>>
) => {
    const navigate = useNavigate();

    const handleDeletePlan = async (id: string) => {
            await deletePlan(id);
            setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
        };
    
    const handleEditPlan = (id: string) => {
        navigate(`/plansconstructor?id=${id}`);
    };

    return { handleDeletePlan, handleEditPlan };
}