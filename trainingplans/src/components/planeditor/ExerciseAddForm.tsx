import { ExerciseRequest } from "../../api/interfaces";
import { ExerciseSelector } from "./ExerciseSelector";
import './ExerciseAddForm.css'

interface ExerciseAddFormProps {
  newExercise: string;
  onExerciseChange: (value: string) => void;
  onAdd: () => void;
  showExerciseList: boolean;
  onToggleExerciseList: () => void;
  preparedExercises: Record<string, ExerciseRequest[]>;
  onExerciseSelect: (exerciseName: string) => void;
}

export const ExerciseAddForm = ({
  newExercise,
  onExerciseChange,
  onAdd,
  showExerciseList,
  onToggleExerciseList,
  preparedExercises,
  onExerciseSelect,
}: ExerciseAddFormProps) => {
  const handleInputClick = () => {
    onToggleExerciseList();
  };

  const handleExerciseSelect = (exerciseName: string) => {
    onExerciseSelect(exerciseName);
    onToggleExerciseList(); // Close the selector after selection
  };

  return (
    <div className="exercise-add-form">
      <div className="exercise-input-container">
        <input
          className="exercise-input"
          value={newExercise}
          onChange={(e) => onExerciseChange(e.target.value)}
          onClick={handleInputClick}
          placeholder="Добавьте упражнение"
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
        className="exercise-button exercise-button-blue"
        onClick={onAdd}
      >
        Добавить в конец
      </button>
    </div>
  );
};