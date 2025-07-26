
export interface RegisterUserRequest {
    userName: string;
    password: string;
    email: string;
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

export interface CategorizedExercise {
  exercise: string;
  categories: string[];
}

export interface Plan {
    id?: string;
    category?: string;
    exercises: Exercise[];
    isFavorite?: boolean;
    isCompleted?: boolean;
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

export interface PlansResponse {
    totalCount: number;
    plans: Plan[];
}

export interface Message {
  userName: string;
  message: string;
  plans: Plan[] | null;
  sendingDate: string;
}

export interface PlanParameters {
    pageNumber?: number;
    pageSize?: number;
}

export interface Statistic {
  id: string;
  userId: string;
  planId: string;
  muscleGroup: string;
  completionDate: string;
}