
import { useEffect, useState } from 'react';
import { GetFavoritePlans, RemovePlanFromFavorites } from '../api/plans'; 
import { useNavigate } from "react-router-dom"
import starIcon from '../assets/star.svg';
import editIcon from '../assets/edit.svg';
import '../components/plans/plans.css';
interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
}

interface Plan {
    id: string;
    exercises: Exercise[];
    isPrepared: boolean;
}

export const FavoritePlansPage = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            const data = await GetFavoritePlans();
            setPlans(data);
            setLoading(false);
        };

        fetchPlans();
    }, []);

    const handleRemovePlanFromFavorites = async (id: string) => {
        await RemovePlanFromFavorites(id);
        setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
      };

      const handleEditPlan = async (id: string, isPrepared: boolean) => {
        navigate(`/plansconstructor?id=${id}&prepared=${isPrepared}`);
        //setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
      };

    if (loading) return <p>Loading plans...</p>;

    return (      
        <div>
            {plans.length === 0 ? (
                <p>Woops! No plans available at the moment</p>
            ) : (
                <div className="card-container">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="plan-card"
                        >
                            <div className="plan-card-header p-4"> 
                                <button
                                    onClick={() => handleEditPlan(plan.id, plan.isPrepared)}
                                    className="icon-button"
                                    type="button"
                                    title="Редактировать"
                                >
                                    <img src={editIcon} className="plan-icon plan-edit-icon" alt="Delete" />
                                </button> 
                                <button
                                    onClick={() => handleRemovePlanFromFavorites(plan.id)}
                                    className="icon-button"
                                    type="button"
                                    title="Удалить из избранного"
                                >
                                    <img src={starIcon} className="plan-icon plan-favorite-icon plan-favorite-icon-active" alt="Edit" />
                                </button>                                                                                    
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
    );
};
