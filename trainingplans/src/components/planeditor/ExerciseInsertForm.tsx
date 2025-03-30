import { ExerciseRequest } from "../../api/interfaces";
import { ExerciseSelector } from "./ExerciseSelector";
import './ExerciseInsertForm.css'

interface ExerciseInsertFormProps {
  insertNewExercise: string;
  onExerciseChange: (value: string) => void;
  onInsert: () => void;
  onCancel: () => void;
  showExerciseList: boolean;
  onToggleExerciseList: () => void;
  preparedExercises: Record<string, ExerciseRequest[]>;
  onExerciseSelect: (exerciseName: string) => void;
}

export const ExerciseInsertForm = ({
  insertNewExercise,
  onExerciseChange,
  onInsert,
  onCancel,
  showExerciseList,
  onToggleExerciseList,
  preparedExercises,
  onExerciseSelect,
}: ExerciseInsertFormProps) => {
  const handleInputClick = () => {
    onToggleExerciseList();
  };

  const handleExerciseSelect = (exerciseName: string) => {
    onExerciseSelect(exerciseName);
    onToggleExerciseList(); // Close the selector after selection
  };

  return (
    <div className="exercise-insert-form">
      <input
        value={insertNewExercise}
        onChange={(e) => onExerciseChange(e.target.value)}
        onClick={handleInputClick}
        placeholder="Упражнение"
      />
      {showExerciseList && (
        <ExerciseSelector
          preparedExercises={preparedExercises}
          onSelect={handleExerciseSelect}
          closeList={onToggleExerciseList}
        />
      )}
      <button
        className="btn-insert"
        onClick={onInsert}
      >
        Вставить
      </button>
      <button
        className="btn-cancel"
        onClick={onCancel}
      >
        Отмена
      </button>
    </div>
  );
};