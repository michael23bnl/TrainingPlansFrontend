import { useEffect, useRef, useState } from "react";
import { ExerciseRequest } from "../../api/interfaces";
import "./ExerciseSelectModal.css";

interface ExerciseSelectModalProps {
  preparedExercises: Record<string, ExerciseRequest[]>;
  onSelect: (selectedNames: string[]) => void;
  onClose: () => void;
  initialNames?: string[];
}

export const ExerciseSelectModal = ({
  preparedExercises,
  onSelect,
  onClose,
  initialNames,
}: ExerciseSelectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [manualInput, setManualInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [filteredExercises, setFilteredExercises] = useState(preparedExercises);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (initialNames) {
      setSelectedExercises(initialNames);
      setManualInput(initialNames.join(", "));
    }
  }, [initialNames]);

  const normalizeString = (str: string) => str.toLowerCase().replace(/ё/g, "е");

  useEffect(() => {
    const search = normalizeString(searchInput);
    if (search === "") {
      setFilteredExercises(preparedExercises);
    } else {
      const newFiltered = Object.entries(preparedExercises).reduce(
        (acc, [group, list]) => {
          const matches = list.filter((ex) =>
            normalizeString(ex.name).includes(search)
          );
          if (matches.length > 0) acc[group] = matches;
          return acc;
        },
        {} as Record<string, ExerciseRequest[]>
      );
      setFilteredExercises(newFiltered);
    }
  }, [searchInput, preparedExercises]);

  const updateManualField = (newList: string[]) => {
    setSelectedExercises(newList);
    setManualInput(newList.join(", "));
  };

  const handleAddExercise = (name: string) => {
    if (!selectedExercises.includes(name)) {
      const updated = [...selectedExercises, name];
      updateManualField(updated);
    }
  };

  const handleManualChange = (value: string) => {
    setManualInput(value);
    const parts = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setSelectedExercises(Array.from(new Set(parts)));
  };

  const handleDone = () => {
    onSelect(selectedExercises);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <h2>Добавьте или выберите упражнение</h2>

        <input
  type="text"
  value={manualInput}
  onChange={(e) => handleManualChange(e.target.value)}
  placeholder="Например: Приседания, Жим лёжа..."
  className="exercise-selector__search-input"
/>

        <label className="exercise-selector__label">Поиск по упражнениям:</label>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Введите часть названия для фильтрации..."
          className="exercise-selector__search-input"
        />

        <ul className="exercise-selector__list">
          {Object.keys(filteredExercises).length === 0 ? (
            <li className="exercise-selector__no-matches">Нет совпадений</li>
          ) : (
            Object.entries(filteredExercises).map(([group, list]) => (
              <li key={group} className="exercise-selector__muscle-group-container">
                <div className="exercise-selector__muscle-group">{group}</div>
                <ul>
                  {list.map((ex) => (
                    <li
                      key={ex.name}
                      className="exercise-selector__exercise-item"
                      onClick={() => handleAddExercise(ex.name)}
                    >
                      {ex.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          )}
        </ul>

        <div className="modal-footer">
          <button className="modal-done-button" onClick={handleDone}>
            Готово
          </button>
          <button className="modal-close" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
