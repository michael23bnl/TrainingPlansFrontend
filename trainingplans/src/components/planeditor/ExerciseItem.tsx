import { Exercise } from "../../api/interfaces";
import { ExerciseRequest } from "../../api/interfaces";
import { ExerciseSelector } from "./ExerciseSelector";
import './ExerciseItem.css'

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  isEditing: boolean;
  editExercise: string;
  onEditChange: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onStartEdit: () => void;
  onDelete: () => void;
  onInsertBelow: () => void;
  showExerciseList: boolean;
  onToggleExerciseList: () => void;
  preparedExercises: Record<string, ExerciseRequest[]>;
  onExerciseSelect: (exerciseName: string) => void;
}

export const ExerciseItem = ({
  exercise,
  index,
  isEditing,
  editExercise,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onStartEdit,
  onDelete,
  onInsertBelow,
  showExerciseList,
  onToggleExerciseList,
  preparedExercises,
  onExerciseSelect,
}: ExerciseItemProps) => {
  const handleExerciseSelect = (exerciseName: string) => {
    onExerciseSelect(exerciseName);
    onToggleExerciseList();
  };

  const handleInputFocus = () => {
    if (isEditing) {
      onToggleExerciseList();
    }
  };

  return (
    <div className="exercise-item">
      <li className="exercise-list-item">
        {isEditing ? (
          <>
            <div className="exercise-input-container">
              <input
                className="exercise-input"
                value={editExercise}
                onChange={(e) => onEditChange(e.target.value)}
                onFocus={handleInputFocus}
                placeholder="Упражнение"
              />
              {showExerciseList && (
                <ExerciseSelector
                  preparedExercises={preparedExercises}
                  onSelect={handleExerciseSelect}
                  closeList={onToggleExerciseList}
                />
              )}
            </div>
            <button
              className="button green-button"
              onClick={onSaveEdit}
            >
              Сохранить
            </button>
            <button
              className="button red-button"
              onClick={onCancelEdit}
            >
              Отмена
            </button>
          </>
        ) : (
          <>
            <span style={{ flexGrow: 1 }}>{exercise.name}</span>
            <button
              className="button blue-button"
              onClick={onStartEdit}
            >
              Редактировать
            </button>
            <button
              className="button red-button"
              onClick={onDelete}
            >
              Удалить
            </button>
          </>
        )}
      </li>

      <button
        className="insert-button"
        onClick={onInsertBelow}
      >
        Вставить упражнение здесь
      </button>
    </div>
  );
};