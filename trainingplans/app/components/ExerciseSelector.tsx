import { useState, useEffect, useRef } from "react";

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
            className="absolute top-0 left-full ml-4 w-96 bg-white border border-gray-300 rounded-lg shadow-xl z-20"
        >
            <div className="p-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Поиск упражнений..."
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <ul className="list-none p-4 max-h-80 overflow-y-auto">
                {Object.keys(filteredExercises).length === 0 ? (
                    <li className="text-gray-500">Нет совпадений</li>
                ) : (
                    Object.keys(filteredExercises).map((muscleGroup) => (
                        <li key={muscleGroup} className="mb-4">
                            <div className="font-bold text-xl mb-2">{muscleGroup}</div>
                            <ul>
                                {filteredExercises[muscleGroup].map((exercise) => (
                                    <li
                                        key={exercise.name}
                                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md text-lg"
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
