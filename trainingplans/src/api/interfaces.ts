
export interface RegisterUserRequest {
    userName: string;
    password: string;
    email: string;
    role: string;
}

export interface LoginUserRequest {
    password: string;
    email: string;
}

export interface ExerciseRequest {
    name: string;
    muscleGroup: string;
}

export interface Exercise {
    name: string;
}

export interface PlanRequest {
    name: string;
    exercises: ExerciseRequest[];
}

export interface Plan {
    name: string;
    exercises: Exercise[];
}