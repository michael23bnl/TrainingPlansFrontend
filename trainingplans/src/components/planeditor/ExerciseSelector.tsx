import React, { useEffect, useState, useRef } from "react";
import { CategorizedExercise } from "../../api/interfaces";
import "./ExerciseSelector.css";

interface Props {
  preparedExercises: Record<string, CategorizedExercise[]>;
  onSelect: (selectedNames: string[], selectedCategory: string) => void;
  onBack: () => void;
  initialNames?: string[];
  initialCategory?: string;
}

export const ExerciseSelector: React.FC<Props> = ({
  preparedExercises,
  onSelect,
  onBack,
  initialNames,
  initialCategory,
}) => {
  const [manualInput, setManualInput] = useState(initialNames?.join(", ") || "");
  const [manualCategory, setManualCategory] = useState(initialCategory || "");
  const [searchInput, setSearchInput] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<string[]>(initialNames || []);
  const [filteredExercises, setFilteredExercises] = useState(preparedExercises);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLTextAreaElement>(null);

  const normalizeString = (str: string) => str.toLowerCase().replace(/ё/g, "е");

  useEffect(() => {
    const search = normalizeString(searchInput);
    if (search === "") {
      setFilteredExercises(preparedExercises);
    } else {
      const newFiltered = Object.entries(preparedExercises).reduce(
        (acc, [group, list]) => {
          const matches = list.filter((ex) =>
            normalizeString(ex.exercise).includes(search)
          );
          if (matches.length > 0) acc[group] = matches;
          return acc;
        },
        {} as Record<string, CategorizedExercise[]>
      );
      setFilteredExercises(newFiltered);
    }
  }, [searchInput, preparedExercises]);

  const adjustTextareaHeight = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight(textareaRef);
  }, [manualInput]);

  useEffect(() => {
    adjustTextareaHeight(categoryRef);
  }, [manualCategory]);

  const updateManualField = (newList: string[]) => {
    setSelectedExercises(newList);
    setManualInput(newList.join(", "));
  };

  const handleAddExercise = (name: string) => {
    if (!selectedExercises.includes(name)) {
      const updated = [...selectedExercises, name];
      updateManualField(updated);

      let foundCategories: string[] = [];
      for (const list of Object.values(preparedExercises)) {
        const exercise = list.find((ex) => ex.exercise === name);
        if (exercise) {
          foundCategories = exercise.categories;
          break;
        }
      }

      const currentCategories = manualCategory
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const newCategoriesSet = new Set([...currentCategories, ...foundCategories]);
      setManualCategory(Array.from(newCategoriesSet).join(", "));
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

  const handleCategoryChange = (value: string) => {
    setManualCategory(value);
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(group)) {
        newSet.delete(group);
      } else {
        newSet.add(group);
      }
      return newSet;
    });
  };

  const handleDone = () => {
    onSelect(selectedExercises, manualCategory);
    onBack();
  };

  return (
    <div className="exercise-selector">
      <h2 className="exercise-selector__title">Выбор упражнений</h2>

      <textarea
        ref={textareaRef}
        value={manualInput}
        onChange={(e) => handleManualChange(e.target.value)}
        placeholder="Описание упражнения"
        className="exercise-selector__textarea"
      />

      {/* <button
        className="exercise-selector__toggle-category-button"
        onClick={() => setShowCategoryInput((prev) => !prev)}
      >
        {showCategoryInput ? "Скрыть категории" : "Указать категории"}
      </button> */}

      {showCategoryInput && (
        <>
          <label className="exercise-selector__label">Категории:</label>
          <textarea
            ref={categoryRef}
            value={manualCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            placeholder="Категория"
            className="exercise-selector__textarea"
          />
        </>
      )}

      <label className="exercise-selector__label" htmlFor="searchInput">
        Поиск по упражнениям:
      </label>
      <input
        id="searchInput"
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
              <div
                className="exercise-selector__muscle-group"
                onClick={() => toggleGroup(group)}
              >
                {group}
              </div>
              {expandedGroups.has(group) && (
                <ul className="exercise-selector__exercises-list">
                  {list.map((ex) => (
                    <li
                      key={ex.exercise}
                      className="exercise-selector__exercise-item"
                      onClick={() => handleAddExercise(ex.exercise)}
                    >
                      {ex.exercise}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        )}
      </ul>

      <div className="exercise-selector__footer">
        <button onClick={onBack} className="back-button">
          Назад
        </button>
        <button onClick={handleDone} className="done-button">
          Готово
        </button>
      </div>
    </div>
  );
};
