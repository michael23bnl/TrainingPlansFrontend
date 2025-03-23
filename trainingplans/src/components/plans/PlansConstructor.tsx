import { Plan } from "../../api/plans";
import { Exercise, ExerciseRequest } from "../../api/interfaces";
import { useEffect, useState, useRef  } from "react";
import { ExerciseSelector } from "./ExerciseSelector";

interface Props {
    handlePlanCreation: (request: Plan) => void;
    handlePlanUpdate: (id: string, request: Plan) => void;
    handleFavoritePlanEdition: (id: string, request: Plan) => void;
    planId: string | null; 
    isUpdateMode?: boolean;
    isPlanPrepared?: boolean;
    initialPlanData?: Plan; 
    preparedExercises: Record<string, ExerciseRequest[]>
}

export const PlanEditor = ({
    handlePlanCreation,
    handlePlanUpdate,
    handleFavoritePlanEdition,
    planId,
    isUpdateMode = false,
    isPlanPrepared = false,
    initialPlanData,
    preparedExercises,
}: Props) => {
    const [name, setName] = useState<string>("");
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<string>("");
    const [insertNewExercise, setInsertNewExercise] = useState<string>("");  
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editExercise, setEditExercise] = useState<string>("");
    const [insertIndex, setInsertIndex] = useState<number | null>(null);
    const [selectedPreparedExercise, setSelectedPreparedExercise] = useState<Exercise | null>(null);
    const [showNewExerciseList, setShowNewExerciseList] = useState<boolean>(false);
    const [showInsertExerciseList, setShowInsertExerciseList] = useState<number | null>(null);
    const [showEditExerciseList, setShowEditExerciseList] = useState<number | null>(null);

    // Function to handle exercise selection
    const handleExerciseSelect = (exerciseName: string, type: "new" | "insert" | "edit", index?: number) => {
        switch (type) {
            case "new":
                setNewExercise((prev) =>
                    prev.trim() === "" ? exerciseName : `${prev}, ${exerciseName}`
                );
                setShowNewExerciseList(false);
                break;
            case "insert":
                setInsertNewExercise((prev) =>
                    prev.trim() === "" ? exerciseName : `${prev}, ${exerciseName}`
                );
                setShowInsertExerciseList(null);
                break;
            case "edit":
                if (index !== undefined) {
                    setEditExercise((prev) =>
                        prev.trim() === "" ? exerciseName : `${prev}, ${exerciseName}`
                    );
                    setShowEditExerciseList(null);
                }
                break;
        }
    };

    useEffect(() => {
        if (isUpdateMode && initialPlanData) {
            setName(initialPlanData.name);
            setExercises(initialPlanData.exercises);
        }
    }, [isUpdateMode, initialPlanData]);

    const handleAddExercise = () => {
        if (newExercise.trim()) {
            setExercises((prev) => [
                ...prev,
                { name: newExercise.trim() },
            ]);
            setNewExercise("");
        }
    };

    const handleInsertExercise = (index: number) => {
        if (insertNewExercise.trim()) {
            setExercises((prev) => [
                ...prev.slice(0, index),
                { name: insertNewExercise.trim() },
                ...prev.slice(index),
            ]);
            setInsertNewExercise("");  
            setInsertIndex(null);
        }
    };
    
    const handleCancelInsertExercise = () => {
        setInsertIndex(null);
        setInsertNewExercise("");  
    };

    const handleDeleteExercise = (index: number) => {
        setExercises((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEditExercise = (index: number) => {
        setIsEditing(index);
        setEditExercise(exercises[index].name);
    };

    const handleSaveExerciseEdit = (index: number) => {
        if (editExercise.trim()) {
            setExercises((prev) =>
                prev.map((exercise, i) =>
                    i === index
                        ? { name: editExercise.trim() }
                        : exercise
                )
            );
            setIsEditing(null);
            setEditExercise("");
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(null);
        setEditExercise("");
    };

    const handleSavePlan = () => {
        const plan: Plan = { 
            name, 
            exercises,
        };

        if (isUpdateMode && planId) {
            if (isPlanPrepared) {
                handleFavoritePlanEdition(planId, plan);
            }
            else {
                handlePlanUpdate(planId, plan);
            }
        } else {
            handlePlanCreation(plan);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col h-auto w-1/3 gap-4">
                <input
                    className="p-3 border rounded"
                    value={name ? name : ""}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название плана"
                />
                <ul className="list-disc pl-5">
                    {exercises.map((exercise, index) => (
                        <div key={index} className="flex flex-col">
                            <li className="flex items-center gap-2 text-sm">
                                {isEditing === index ? (
                                    <>
                                        <div className="relative flex-grow">
                                            <input
                                                className="p-1 border rounded flex-grow"
                                                value={editExercise}
                                                onChange={(e) => setEditExercise(e.target.value)}
                                                placeholder="Упражнение"
                                            />
                                            {showEditExerciseList === index && (
                                                <ExerciseSelector
                                                    preparedExercises={preparedExercises}
                                                    onSelect={(exerciseName) =>
                                                        handleExerciseSelect(exerciseName, "edit", index)
                                                    }
                                                    closeList={() => setShowEditExerciseList(null)}
                                                />
                                            )}
                                        </div>
                                        <button
                                            className="p-1 bg-gray-500 text-white rounded"
                                            onClick={() => setShowEditExerciseList(index)}
                                        >
                                            Готовые упражнения
                                        </button>
                                        <button
                                            className="p-1 bg-green-500 text-white rounded"
                                            onClick={() => handleSaveExerciseEdit(index)}
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            className="p-1 bg-red-500 text-white rounded"
                                            onClick={handleCancelEdit}
                                        >
                                            Отмена
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span className="flex-grow">{exercise.name}</span>
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
                                <div className="flex gap-2 mt-2 relative">
                                    <input
                                        className="p-1 border rounded flex-grow"
                                        value={insertNewExercise}
                                        onChange={(e) => setInsertNewExercise(e.target.value)}
                                        placeholder="Упражнение"
                                    />
                                    {showInsertExerciseList === index + 1 && (
                                        <ExerciseSelector
                                            preparedExercises={preparedExercises}
                                            onSelect={(exerciseName) =>
                                                handleExerciseSelect(exerciseName, "insert")
                                            }
                                            closeList={() => setShowInsertExerciseList(null)}
                                        />
                                    )}
                                    <button
                                        className="p-1 bg-gray-500 text-white rounded"
                                        onClick={() => setShowInsertExerciseList(index + 1)}
                                    >
                                        Готовые упражнения
                                    </button>
                                    <button
                                        className="p-1 bg-green-500 text-white rounded"
                                        onClick={() => handleInsertExercise(index + 1)}
                                    >
                                        Вставить
                                    </button>
                                    <button
                                        className="p-1 bg-red-500 text-white rounded"
                                        onClick={handleCancelInsertExercise}
                                    >
                                        Отмена
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </ul>

                <div className="flex gap-2 items-start relative">
                    <div className="relative flex-grow">
                        <input
                            className="p-3 w-full border rounded"
                            value={newExercise}
                            onChange={(e) => setNewExercise(e.target.value)}
                            placeholder="Добавьте упражнение"
                        />
                        {showNewExerciseList && (
                            <ExerciseSelector
                                preparedExercises={preparedExercises}
                                onSelect={(exerciseName) => handleExerciseSelect(exerciseName, "new")}
                                closeList={() => setShowNewExerciseList(false)}
                            />
                        )}
                    </div>

                    <button
                        className="p-3 bg-gray-500 text-white rounded"
                        onClick={() => setShowNewExerciseList((prev) => !prev)}
                    >
                        Готовые упражнения
                    </button>

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
