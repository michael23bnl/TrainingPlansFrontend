
import { AddPlanToFavorites, RemovePlanFromFavorites } from "../api/plans";
import { Plan } from "../api/interfaces";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

export const usePlanFavoriteButtons = (
  setPlans: Dispatch<SetStateAction<Plan[]>>
) => {
  const navigate = useNavigate();

  const handleAddToFavorites = async (id: string) => {
    await AddPlanToFavorites(id);
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, isFavorite: true } : plan
      )
    );
  };

  const handleRemoveFromFavorites = async (id: string) => { // только для смены иконки избранного на главной странице
    await RemovePlanFromFavorites(id);
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, isFavorite: false } : plan
      )
    );
  };

  const handleRemoveFromFavoritesPage = async (id: string) => { // для удаления плана со страницы избранного
    await RemovePlanFromFavorites(id);
    setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
  };

  const handleEditFavoritePlan = async (id: string, createdBy?: string) => {
    navigate(`/plansconstructor?id=${id}&createdby=${createdBy}`);
  };

  return { handleAddToFavorites, handleRemoveFromFavorites, handleEditFavoritePlan, handleRemoveFromFavoritesPage };
};