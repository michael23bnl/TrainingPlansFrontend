"use client";
import { useEffect, useState } from "react";
import { getAllPlans, deletePlan } from "../services/plans";
import { useRouter } from "next/navigation";

interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
}

interface Plan {
    id: string;
    exercises: Exercise[];
}

const MyPlansPage = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // For navigation to the edit page

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
        router.push(`/plansconstructor?id=${id}`);
    };

    if (loading) return <p>Loading plans...</p>;

    return (
        <div>
            {plans.length === 0 ? (
                <p>Woops! No plans available at the moment</p>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center p-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="flex flex-col w-80 gap-4 border rounded-lg border-green-400 p-4"
                        >
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleDeletePlan(plan.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Удалить
                                </button>
                                <button
                                    onClick={() => handleEditPlan(plan.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Редактировать
                                </button>
                            </div>
                            <ul className="flex flex-col items-center gap-2">
                                {plan.exercises.map((exercise) => (
                                    <li key={exercise.id} className="">
                                        <p className="mt-3">{exercise.name}</p>
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

export default MyPlansPage;
