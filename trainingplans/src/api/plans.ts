import { ExerciseRequest } from "./interfaces";
import { Exercise } from "./interfaces";

export interface PlanRequest {
    name: string;
    exercises: ExerciseRequest[];
}

export interface Plan {
    name: string;
    exercises: Exercise[];
}

export const getAllPlans = async () => {

    const response = await fetch("http://localhost:7000/gateway/Plans/get/all", {
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

export const getPlan = async (id: string) => {

    const response = await fetch(`http://localhost:7000/gateway/Plans/get/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Включить cookies.
    });
    return await response.json(); 

}

export const createPlan = async (planRequest: Plan) => {

    const response = await fetch("http://localhost:7000/gateway/Plans/create", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(planRequest),
        credentials: 'include',
    });

    //if (!response.ok) {
    //    throw new Error(`HTTP error! status: ${response.status}`);
    //}

    //return response.json();
}

export const updatePlan = async (id: string, planRequest: Plan) => {

    const response = await fetch(`http://localhost:7000/gateway/Plans/update/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(planRequest),
        credentials: 'include',
    });
}

export const deletePlan = async (id: string) => {
    await fetch(`http://localhost:7000/gateway/Plans/delete/${id}`, {
        method: "DELETE",
        credentials: 'include',
    })
}








export const getAllPreparedPlans = async () => {

    const response = await fetch("http://localhost:7000/gateway/PreparedPlans/get/all", {
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

export const getPreparedPlan = async (id: string) => {

    const response = await fetch(`http://localhost:7000/gateway/PreparedPlans/get/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Включить cookies.
    });
}

export const createPreparedPlan = async (planRequest: PlanRequest) => {

    const response = await fetch("http://localhost:7000/gateway/PreparedPlans/create", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(planRequest),
        credentials: 'include',
    });

    //if (!response.ok) {
    //    throw new Error(`HTTP error! status: ${response.status}`);
    //}

    //return response.json();
}

export const updatePreparedPlan = async (id: string, planRequest: PlanRequest) => {

    const response = await fetch(`http://localhost:7000/gateway/PreparedPlans/update/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(planRequest),
        credentials: 'include',
    });
}

export const deletePreparedPlan = async (id: string) => {
    await fetch(`http://localhost:7000/gateway/PreparedPlans/delete/${id}`, {
        method: "DELETE",
        credentials: 'include',
    })
}


export const AddPlanToFavorites = async (id: string) => {

    const response = await fetch(`http://localhost:7000/gateway/FavoritePlans/add/${id}`, {
        method: "POST",
        credentials: 'include',
    });
}

export const RemovePlanFromFavorites = async (id: string) => {

    const response = await fetch(`http://localhost:7000/gateway/FavoritePlans/remove/${id}`, {
        method: "DELETE",
        credentials: 'include',
    });
}

export const GetFavoritePlans = async () => {

    const response = await fetch("http://localhost:7000/gateway/FavoritePlans/get/all", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
        credentials: 'include',
    });

    return response.json();
}

export const EditFavoritePlan = async (id: string, planRequest: Plan) => {
    const response = await fetch(`http://localhost:7000/gateway/FavoritePlans/edit/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(planRequest),
        credentials: "include",
    });
    return await response.json(); 
}

