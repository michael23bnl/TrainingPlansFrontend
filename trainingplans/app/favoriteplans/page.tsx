"use client";
import { useEffect, useState } from 'react';
import { GetFavoritePlans, RemovePlanFromFavorites } from '../services/plans'; 

interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
}

interface Plan {
    id: string;
    exercises: Exercise[];
}

const FavoritePlansPage = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <p>Loading plans...</p>;

    return (
        <div>
            {plans.length === 0 ? (
                <p>Woops! No plans available at the moment</p>
            ) : (             
                <div className="flex flex-wrap gap-4 justify-center p-4">
                                {plans.map((plan) => (
                                    <div key={plan.id} className='flex flex-col w-80 gap-4 border rounded-lg border-green-400 p-4'>
                                        <button
                                            onClick={() => handleRemovePlanFromFavorites(plan.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            >
                                        Убрать из избранного
                                        </button>
                                        <ul className='flex flex-col items-center gap-2'>
                                            {plan.exercises.map((exercise) => (
                                                <li key={exercise.id} className=''>
                                                    <p className='mt-3'>{exercise.name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
            )}
        </div>
    );
};

export default FavoritePlansPage;
