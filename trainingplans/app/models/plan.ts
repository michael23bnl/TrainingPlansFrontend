import { UUID } from "crypto";
import {  Exercise } from "../models/exercise";


interface Plan {
    id: UUID;
    exercises: Exercise[]
}