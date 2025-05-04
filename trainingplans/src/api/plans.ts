import { Plan, PlanRequest, PlanParameters, PlansResponse } from "./interfaces";


export const getPlan = async (id: string) => {

    const response = await fetch(`http://localhost:7000/gateway/Plans/get/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Включить cookies.
    });
    return response.json(); 

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

export const search = async (query: string, planParameters: PlanParameters) => {
    const queryParams = new URLSearchParams();

    if (planParameters.pageNumber) queryParams.append('pageNumber', planParameters.pageNumber.toString());
    if (planParameters.pageSize) queryParams.append('pageSize', planParameters.pageSize.toString());

    const response = await fetch(`http://localhost:7000/gateway/Plans/search/${query}?${queryParams.toString()}`, {
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

export const searchThroughMyPlans = async (query: string) => {
    const response = await fetch(`http://localhost:7000/gateway/Plans/search/my-plans/${query}`, {
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

export const searchThroughFavorites = async (query: string) => {
    const response = await fetch(`http://localhost:7000/gateway/Plans/search/favorites/${query}`, {
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

export const searchThroughCompletedPlans = async (query: string) => {
    const response = await fetch(`http://localhost:7000/gateway/Plans/search/completed-plans/${query}`, {
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


export const getAllPlans = async (planParameters: PlanParameters) => {
    const queryParams = new URLSearchParams();
    
    if (planParameters.pageNumber) queryParams.append('pageNumber', planParameters.pageNumber.toString());
    if (planParameters.pageSize) queryParams.append('pageSize', planParameters.pageSize.toString());

    const response = await fetch(`http://localhost:7000/gateway/Plans/get/all?${queryParams.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Включить cookies.
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
    return json;
}

export const getAllPreparedPlans = async (planParameters: PlanParameters) => {
    const queryParams = new URLSearchParams();
    
    if (planParameters.pageNumber) queryParams.append('pageNumber', planParameters.pageNumber.toString());
    if (planParameters.pageSize) queryParams.append('pageSize', planParameters.pageSize.toString());
    
    const response = await fetch(`http://localhost:7000/gateway/Plans/get/all-prepared?${queryParams.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
    return json;
}

export const getAllAvailablePlans = async () => {

    const response = await fetch("http://localhost:7000/gateway/Plans/get/all-available", {
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

export const createPreparedPlan = async (planRequest: PlanRequest) => {

    const response = await fetch("http://localhost:7000/gateway/Plans/create-prepared", {
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

export const GetFavoritePlans = async (planParameters: PlanParameters) => {
    const queryParams = new URLSearchParams();
    
    if (planParameters.pageNumber) queryParams.append('pageNumber', planParameters.pageNumber.toString());
    if (planParameters.pageSize) queryParams.append('pageSize', planParameters.pageSize.toString());

    const response = await fetch(`http://localhost:7000/gateway/FavoritePlans/get/all?${queryParams.toString()}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
        credentials: 'include',
    });

    const json = await response.json();
    // console.log(json);
    return json;
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

export const MarkAsCompleted = async (id: string) => {

    const response = await fetch(`http://localhost:7000/gateway/CompletedPlans/mark/${id}`, {
        method: "POST",
        credentials: 'include',
    });
}

export const RemoveCompletedMark = async (id: string) => {

    const response = await fetch(`http://localhost:7000/gateway/CompletedPlans/unmark/${id}`, {
        method: "DELETE",
        credentials: 'include',
    });
}

export const GetCompletedPlans = async () => {

    const response = await fetch("http://localhost:7000/gateway/CompletedPlans/get/all", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
        credentials: 'include',
    });

    return response.json();
}

export const GetCompletedPlansPaginated = async (planParameters: PlanParameters) => {
    const queryParams = new URLSearchParams();
    
    if (planParameters.pageNumber) queryParams.append('pageNumber', planParameters.pageNumber.toString());
    if (planParameters.pageSize) queryParams.append('pageSize', planParameters.pageSize.toString());

    const response = await fetch(`http://localhost:7000/gateway/CompletedPlans/get/all/paginated?${queryParams.toString()}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
        credentials: 'include',
    });

    const json = await response.json();
    // console.log(json);
    return json;
}
