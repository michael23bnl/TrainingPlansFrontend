import { useState, useEffect, useRef } from "react";
import "./ExerciseSelector.css";

interface ExerciseRequest {
    name: string;
    [key: string]: any; 
}

interface Props {
    preparedExercises: Record<string, ExerciseRequest[]>;
    onSelect: (exerciseName: string) => void;
    closeList: () => void;
}

export const ExerciseSelector = ({
    preparedExercises,
    onSelect,
    closeList,
}: Props) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredExercises, setFilteredExercises] = useState(preparedExercises);

    const handleClickOutside = (event: MouseEvent) => {
        if (listRef.current && !listRef.current.contains(event.target as Node)) {
            closeList();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const normalizeString = (str: string) => str.toLowerCase().replace(/ё/g, "е");

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredExercises(preparedExercises);
        } else {
            const normalizedSearchTerm = normalizeString(searchTerm);

            const newFiltered = Object.entries(preparedExercises).reduce(
                (acc, [muscleGroup, exercises]) => {
                    const filtered = exercises.filter((exercise) =>
                        normalizeString(exercise.name).includes(normalizedSearchTerm)
                    );
                    if (filtered.length > 0) {
                        acc[muscleGroup] = filtered;
                    }
                    return acc;
                },
                {} as Record<string, ExerciseRequest[]>
            );
            setFilteredExercises(newFiltered);
        }
    }, [searchTerm, preparedExercises]);

    return (
        <div
            ref={listRef}
            className="exercise-selector"
        >
            <div className="exercise-selector__search">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Поиск упражнений..."
                    className="exercise-selector__search-input"
                />
            </div>
            <ul className="exercise-selector__list">
                {Object.keys(filteredExercises).length === 0 ? (
                    <li className="exercise-selector__no-matches">Нет совпадений</li>
                ) : (
                    Object.keys(filteredExercises).map((muscleGroup) => (
                        <li key={muscleGroup} className="exercise-selector__muscle-group-container">
                            <div className="exercise-selector__muscle-group">{muscleGroup}</div>
                            <ul>
                                {filteredExercises[muscleGroup].map((exercise) => (
                                    <li
                                        key={exercise.name}
                                        className="exercise-selector__exercise-item"
                                        onClick={() => onSelect(exercise.name)}
                                    >
                                        {exercise.name}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};