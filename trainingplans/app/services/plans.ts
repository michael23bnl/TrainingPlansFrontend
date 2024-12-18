export interface PlanRequest {
   
}

export const getAllPlans = async () => {
    const response = await fetch("https://localhost:7000/gateway/Plans/get/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Включить cookies.
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}