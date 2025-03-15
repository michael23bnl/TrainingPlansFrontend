"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createPlan, updatePlan, PlanRequest, Plan, getPlan, EditFavoritePlan } from "../services/plans";
import { getAllExercisesCategorized, ExerciseRequest } from "../services/exercises"
import { PlanEditor } from "../components/PlansConstructor";

export default function PlanConstructorPage() {
    const searchParams = useSearchParams();
    const planId = searchParams.get("id");
    const isPrepared = searchParams.get("prepared");
    const [initialPlanData, setInitialPlanData] = useState<PlanRequest | undefined>(undefined);
    const [preparedExercises, setPreparedExercises] = useState<Record<string, ExerciseRequest[]>>({});

    useEffect(() => {
        if (planId) {
            getPlan(planId).then((data) => {
                setInitialPlanData(data); 
            });
        }
        getAllExercisesCategorized().then((data) => setPreparedExercises(data));
    }, [planId]);

    const handleCreatePlan = async (request: Plan) => {
        await createPlan(request);
    };

    const handleUpdatePlan = async (id: string, request: Plan) => {
        await updatePlan(id, request);
    };

    const handleEditFavoritePlan = async (id: string, request: Plan) => {
        await EditFavoritePlan(id, request);
    }

    return (
        <div>
            <PlanEditor
                handlePlanCreation={handleCreatePlan}
                handlePlanUpdate={handleUpdatePlan}
                handleFavoritePlanEdition={handleEditFavoritePlan}
                planId={planId}
                isUpdateMode={!!planId} 
                isPlanPrepared={isPrepared === "true"}
                initialPlanData={initialPlanData} 
                preparedExercises={preparedExercises}
            />
        </div>
    );
}
