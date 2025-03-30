
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

export interface Exercise {
    id?: string;
    name: string;
    muscleGroup?: string;
}

export interface Plan {
    id?: string;
    category?: string;
    exercises: Exercise[];
    isFavorite?: boolean;
    createdBy?: string;
}

export interface ExerciseRequest {
    name: string;
    muscleGroup: string;
}

export interface PlanRequest {
    category?: string;
    exercises: ExerciseRequest[];
    isFavorite?: boolean;
}
