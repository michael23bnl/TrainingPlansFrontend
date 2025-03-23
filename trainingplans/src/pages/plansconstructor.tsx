"use client";

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPlan, updatePlan, PlanRequest, Plan, getPlan, EditFavoritePlan } from "../api/plans";
import { getAllExercisesCategorized } from "../api/exercises" 
import { ExerciseRequest } from "../api/interfaces"
import { PlanEditor } from "../components/plans/PlansConstructor";

export function PlanConstructorPage() {
    const [searchParams, setSearchParams] = useSearchParams();
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
