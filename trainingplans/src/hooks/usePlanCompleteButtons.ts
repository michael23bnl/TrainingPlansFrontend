
import { MarkAsCompleted, RemoveCompletedMark } from "../api/plans";
import { Plan } from "../api/interfaces";
import { Dispatch, SetStateAction } from "react";

export const usePlanCompleteButtons = (
  setPlans: Dispatch<SetStateAction<Plan[]>>
) => {

  const handleMarkAsCompleted = async (id: string) => {
    await MarkAsCompleted(id);
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, isCompleted: true } : plan
      )
    );
  };

  const handleRemoveCompletedMark = async (id: string) => { // только для смены иконки избранного на главной странице
    await RemoveCompletedMark(id);
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, isCompleted: false } : plan
      )
    );
  };

  const handleRemoveFromCompletedPage = async (id: string) => { // для удаления плана со страницы выполненного
    await RemoveCompletedMark(id);
    setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
  };

  return { handleMarkAsCompleted, handleRemoveCompletedMark, handleRemoveFromCompletedPage };
};