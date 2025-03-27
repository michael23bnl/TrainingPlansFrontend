
import { useEffect, useState } from "react";
import {
  getAllPreparedPlans,
  AddPlanToFavorites,
  RemovePlanFromFavorites,
} from "../api/plans";
import starIcon from '../assets/star.svg';
import '../components/plans/plans.css';
import { PlanSearch } from "../components/plans/PlanSearch";

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
}

interface Plan {
  id: string;
  exercises: Exercise[];
  isFavorite: boolean | null;
}

export const PreparedPlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getAllPreparedPlans();
      setPlans(data);
      setLoading(false);
    };

    fetchPlans();
  }, []);

  const handleAddPlanToFavorites = async (id: string) => {
    await AddPlanToFavorites(id);
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, isFavorite: true } : plan
      )
    );
    console.log("hi");
  };

  const handleRemovePlanFromFavorites = async (id: string) => {
    await RemovePlanFromFavorites(id);
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, isFavorite: false } : plan
      )
    );
  };

  if (loading) return <p>Загрузка планов...</p>;

  return <>
    <PlanSearch />
    <div>
      {plans.length === 0 ? (
        <p>Нет доступных планов в данный момент.</p>
      ) : (
        <div className="card-container">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="plan-card"
                        >
                            <div className="plan-card-header p-4">                          
                                {plan.isFavorite ? (
                                  <button
                                      onClick={() => handleRemovePlanFromFavorites(plan.id)}
                                      className="icon-button"
                                      type="button"
                                      title="Удалить из избранного"
                                  >
                                      <img src={starIcon} className="plan-icon plan-favorite-icon plan-favorite-icon-active" alt="Delete from favorite" />
                                  </button>
                                ) : (
                                  <button
                                      onClick={() => handleAddPlanToFavorites(plan.id)}
                                      className="icon-button"
                                      type="button"
                                      title="Добавить в избранное"
                                  >
                                      <img src={starIcon} className="plan-icon plan-favorite-icon" alt="Add to favorite" />
                                  </button>
                                )}
                            </div>
                            <div className="pb-4 pr-4 pl-4">
                              <ul className="flex flex-col items-center gap-2">
                                  {plan.exercises.map((exercise) => (
                                      <li key={exercise.id} className="">
                                          <p className="mt-3">{exercise.name}</p>
                                      </li>
                                  ))}
                              </ul>
                            </div>
                        </div>
                    ))}
                   

      
                </div>


      )}
    </div>
  </>
};
