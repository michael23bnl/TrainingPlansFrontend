import { PlanRequest } from "../services/plans";
import { ExerciseRequest } from "../services/exercises";
import { useEffect, useState } from "react";

import "../globals.css";

interface Props {
    handlePlanCreation: (request: PlanRequest) => void;
    handlePlanUpdate: (id: string, request: PlanRequest) => void;
    planId: string | null; // Optional ID for the plan in update mode
    isUpdateMode?: boolean; // Determines whether we are updating or creating
    initialPlanData?: PlanRequest; // Optional initial data for update mode
}

export const PlanEditor = ({
    handlePlanCreation,
    handlePlanUpdate,
    planId,
    isUpdateMode = false,
    initialPlanData,
}: Props) => {
    const [name, setName] = useState<string>("");
    const [exercises, setExercises] = useState<ExerciseRequest[]>([]);
    const [newExercise, setNewExercise] = useState<string>("");
    const [newMuscleGroup, setNewMuscleGroup] = useState<string>("");
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editExercise, setEditExercise] = useState<string>("");
    const [editMuscleGroup, setEditMuscleGroup] = useState<string>("");
    const [insertIndex, setInsertIndex] = useState<number | null>(null);

    useEffect(() => {
        if (isUpdateMode && initialPlanData) {
            setName(initialPlanData.name);
            setExercises(initialPlanData.exercises);
        }
    }, [isUpdateMode, initialPlanData]);

    const handleAddExercise = () => {
        if (newExercise.trim() && newMuscleGroup.trim()) {
            setExercises((prev) => [
                ...prev,
                { name: newExercise.trim(), muscleGroup: newMuscleGroup.trim() },
            ]);
            setNewExercise("");
            setNewMuscleGroup("");
        }
    };

    const handleInsertExercise = (index: number) => {
        if (newExercise.trim() && newMuscleGroup.trim()) {
            setExercises((prev) => [
                ...prev.slice(0, index),
                { name: newExercise.trim(), muscleGroup: newMuscleGroup.trim() },
                ...prev.slice(index),
            ]);
            setNewExercise("");
            setNewMuscleGroup("");
            setInsertIndex(null);
        }
    };

    const handleDeleteExercise = (index: number) => {
        setExercises((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEditExercise = (index: number) => {
        setIsEditing(index);
        setEditExercise(exercises[index].name);
        setEditMuscleGroup(exercises[index].muscleGroup);
    };

    const handleSaveExerciseEdit = (index: number) => {
        if (editExercise.trim() && editMuscleGroup.trim()) {
            setExercises((prev) =>
                prev.map((exercise, i) =>
                    i === index
                        ? { name: editExercise.trim(), muscleGroup: editMuscleGroup.trim() }
                        : exercise
                )
            );
            setIsEditing(null);
            setEditExercise("");
            setEditMuscleGroup("");
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(null);
        setEditExercise("");
        setEditMuscleGroup("");
    };

    const handleOnOk = () => {
        const planRequest: PlanRequest = {
            name,
            exercises,
        };
        handlePlanCreation(planRequest);
    };

    const handleSavePlan = () => {
        const planRequest: PlanRequest = { 
            name, 
            exercises,
        };

        if (isUpdateMode && planId) {
            handlePlanUpdate(planId, planRequest);
        } else {
            handlePlanCreation(planRequest);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col h-auto w-1/3 gap-4">
                <input
                    className="p-3 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название плана"
                />
                <ul className="list-disc pl-5">
                    {exercises.map((exercise, index) => (
                        <div key={index} className="flex flex-col">
                            <li className="flex items-center gap-2 text-sm">
                                {isEditing === index ? (
                                    <>
                                        <input
                                            className="p-1 border rounded flex-grow"
                                            value={editExercise}
                                            onChange={(e) => setEditExercise(e.target.value)}
                                            placeholder="Упражнение"
                                        />
                                        <input
                                            className="p-1 border rounded flex-grow"
                                            value={editMuscleGroup}
                                            onChange={(e) => setEditMuscleGroup(e.target.value)}
                                            placeholder="Группа мышц"
                                        />
                                        <button
                                            className="p-1 bg-green-500 text-white rounded"
                                            onClick={() => handleSaveExerciseEdit(index)}
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            className="p-1 bg-gray-500 text-white rounded"
                                            onClick={handleCancelEdit}
                                        >
                                            Отмена
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span className="flex-grow">
                                            {exercise.name} ({exercise.muscleGroup})
                                        </span>
                                        <button
                                            className="p-1 bg-blue-500 text-white rounded"
                                            onClick={() => handleEditExercise(index)}
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            className="p-1 bg-red-500 text-white rounded"
                                            onClick={() => handleDeleteExercise(index)}
                                        >
                                            Удалить
                                        </button>
                                    </>
                                )}
                            </li>
                            <button
                                className="mt-2 mb-2 p-1 bg-gray-200 rounded text-blue-500 text-sm"
                                onClick={() => setInsertIndex(index + 1)}
                            >
                                Вставить упражнение здесь
                            </button>
                            {insertIndex === index + 1 && (
                                <div className="flex gap-2 mt-2">
                                    <input
                                        className="p-1 border rounded flex-grow"
                                        value={newExercise}
                                        onChange={(e) => setNewExercise(e.target.value)}
                                        placeholder="Упражнение"
                                    />
                                    <input
                                        className="p-1 border rounded flex-grow"
                                        value={newMuscleGroup}
                                        onChange={(e) => setNewMuscleGroup(e.target.value)}
                                        placeholder="Группа мышц"
                                    />
                                    <button
                                        className="p-1 bg-green-500 text-white rounded"
                                        onClick={() => handleInsertExercise(index + 1)}
                                    >
                                        Вставить
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </ul>

                <div className="flex gap-2">
                    <input
                        className="p-3 flex-grow border rounded"
                        value={newExercise}
                        onChange={(e) => setNewExercise(e.target.value)}
                        placeholder="Добавьте упражнение"
                    />
                    <input
                        className="p-3 flex-grow border rounded"
                        value={newMuscleGroup}
                        onChange={(e) => setNewMuscleGroup(e.target.value)}
                        placeholder="Группа мышц"
                    />
                    <button
                        className="p-3 bg-blue-500 text-white rounded"
                        onClick={handleAddExercise}
                    >
                        Добавить в конец
                    </button>
                </div>

                <button
                    className="p-3 bg-green-500 text-white rounded"
                    onClick={handleSavePlan}
                >
                    {isUpdateMode ? "Сохранить изменения" : "Создать план"}
                </button>
            </div>
        </div>
    );
};
