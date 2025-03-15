import { UUID } from "crypto";

export interface Exercise {
    id: UUID;
    name: string;
    muscleGroup: string;
}