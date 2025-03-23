
import { useEffect, useState } from "react";
import { getAllPlans, deletePlan } from "../api/plans";
import { useNavigate } from "react-router-dom";
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';

interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
}

interface Plan {
    id: string;
    exercises: Exercise[];
}

export const MyPlansPage = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            const data = await getAllPlans();
            setPlans(data);
            setLoading(false);
        };

        fetchPlans();
    }, []);

    const handleDeletePlan = async (id: string) => {
        await deletePlan(id);
        setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
    };

    const handleEditPlan = (id: string) => {
        navigate(`/plansconstructor?id=${id}`);
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

export default MyPlansPage;
