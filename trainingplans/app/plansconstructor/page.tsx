"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createPlan, updatePlan, PlanRequest, getPlan } from "../services/plans";
import { PlanEditor } from "../components/PlansConstructor";

export default function PlanConstructorPage() {
    const searchParams = useSearchParams();
    const planId = searchParams.get("id");
    const [initialPlanData, setInitialPlanData] = useState<PlanRequest | undefined>(undefined);

    useEffect(() => {
        if (planId) {
            getPlan(planId).then((data) => {
                setInitialPlanData(data); 
            });
        }
    }, [planId]);

    const handleCreatePlan = async (request: PlanRequest) => {
        await createPlan(request);
    };

    const handleUpdatePlan = async (id: string, request: PlanRequest) => {
        await updatePlan(id, request);
    };

    return (
        <div>
            <PlanEditor
                handlePlanCreation={handleCreatePlan}
                handlePlanUpdate={handleUpdatePlan}
                planId={planId}
                isUpdateMode={!!planId} 
                initialPlanData={initialPlanData} 
            />
        </div>
    );
}
