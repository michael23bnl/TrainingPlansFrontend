import { ExerciseRequest } from "./interfaces";

export const getAllExercises = async () => {

    const response = await fetch("http://localhost:7000/gateway/Exercises/get/all", {
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

export const getAllExercisesCategorized = async () => {

    const response = await fetch("http://localhost:7000/gateway/Exercises/get/all/categorized", {
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

export const getExercise = async (id: string) => {

    const response = await fetch(`http://localhost:7000/gateway/Exercises/get/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Включить cookies.
    });
}

export const createExercise = async (exerciseRequest: ExerciseRequest) => {

    const response = await fetch("http://localhost:7000/gateway/Exercises/create", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(exerciseRequest),
        credentials: 'include',
    });

    //if (!response.ok) {
    //    throw new Error(`HTTP error! status: ${response.status}`);
    //}

    //return response.json();
}

export const updateExercise = async (id: string, exerciseRequest: ExerciseRequest) => {

    const response = await fetch(`http://localhost:7000/gateway/Exercises/update/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(exerciseRequest),
        credentials: 'include',
    });
}

export const deleteExercise = async (id: string) => {
    await fetch(`http://localhost:7000/gateway/Exercises/delete/${id}`, {
        method: "DELETE",
        credentials: 'include',
    })
}







export const getAllPreparedExercises = async () => {

    const response = await fetch("http://localhost:7000/gateway/Exercises/get/all", {
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

export const getPreparedExercise = async (id: string) => {

    const response = await fetch(`http://localhost:7000/gateway/Exercises/get/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Включить cookies.
    });
}

export const createPreparedExercise = async (exerciseRequest: ExerciseRequest) => {

    const response = await fetch("http://localhost:7000/gateway/Exercises/create", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(exerciseRequest),
        credentials: 'include',
    });

    //if (!response.ok) {
    //    throw new Error(`HTTP error! status: ${response.status}`);
    //}

    //return response.json();
}

export const updatePreparedExercise = async (id: string, exerciseRequest: ExerciseRequest) => {

    const response = await fetch(`http://localhost:7000/gateway/Exercises/update/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(exerciseRequest),
        credentials: 'include',
    });
}

export const deletePreparedExercise = async (id: string) => {
    await fetch(`http://localhost:7000/gateway/Exercises/delete/${id}`, {
        method: "DELETE",
        credentials: 'include',
    })
}
