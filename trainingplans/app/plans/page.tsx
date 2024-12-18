"use client";
import { useEffect, useState } from 'react';
import { getAllPlans } from '../services/plans'; 

interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
}

interface Plan {
    id: string;
    exercises: Exercise[];
}

const PlansPage = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            const data = await getAllPlans();
            setPlans(data);
            setLoading(false);
        };

        fetchPlans();
    }, []);

    if (loading) return <p>Loading plans...</p>;

    return (
        <div>
            <h1>Training Plans</h1>
            {plans.length === 0 ? (
                <p>No plans available</p>
            ) : (
                <ul>
                    {plans.map((plan) => (
                        <li key={plan.id}>
                            <h2>Plan ID: {plan.id}</h2>
                            <ul>
                                {plan.exercises.map((exercise) => (
                                    <li key={exercise.id}>
                                        <p>Exercise: {exercise.name}</p>
                                        <p>Muscle Group: {exercise.muscleGroup}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlansPage;
