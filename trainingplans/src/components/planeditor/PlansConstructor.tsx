import { Plan, PlanRequest } from "../../api/interfaces";
import { Exercise, ExerciseRequest } from "../../api/interfaces";
import { useEffect, useState } from "react";
import { ExerciseItem } from "./ExerciseItem";
import { ExerciseInsertForm } from "./ExerciseInsertForm";
import { ExerciseAddForm } from "./ExerciseAddForm";
import { CategoryInput } from './CategoryInput';
import "./PlanEditor.css"

interface Props {
  handlePlanCreation: (request: Plan) => void;
  handlePlanUpdate: (id: string, request: Plan) => void;
  handleFavoritePlanEdition: (id: string, request: Plan) => void;
  planId: string | null;
  isFavorite?: boolean;
  initialPlanData?: PlanRequest;
  preparedExercises: Record<string, ExerciseRequest[]>;
}

export const PlanEditor = ({
  handlePlanCreation,
  handlePlanUpdate,
  handleFavoritePlanEdition,
  planId,
  isFavorite,
  initialPlanData,
  preparedExercises,
}: Props) => {
  const [category, setCategory] = useState<string>("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState<string>("");
  const [insertNewExercise, setInsertNewExercise] = useState<string>("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editExercise, setEditExercise] = useState<string>("");
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [showNewExerciseList, setShowNewExerciseList] = useState<boolean>(false);
  const [showInsertExerciseList, setShowInsertExerciseList] = useState<number | null>(null);

  useEffect(() => {
    if (planId && initialPlanData) {
        setCategory(initialPlanData.category || "");
      setExercises(initialPlanData.exercises || []);
    }
  }, [planId, initialPlanData]);

  const handleExerciseSelect = (exerciseName: string, type: "new" | "insert" | "edit", index?: number) => {
    switch (type) {
      case "new":
        setNewExercise((prev) => (prev.trim() === "" ? exerciseName : `${prev}, ${exerciseName}`));
        setShowNewExerciseList(false);
        break;
      case "insert":
        setInsertNewExercise((prev) => (prev.trim() === "" ? exerciseName : `${prev}, ${exerciseName}`));
        setShowInsertExerciseList(null);
        break;
      case "edit":
        if (index !== undefined) {
          setEditExercise((prev) => (prev.trim() === "" ? exerciseName : `${prev}, ${exerciseName}`));
        }
        break;
    }
  };

  const handleAddExercise = () => {
    if (newExercise.trim()) {
      setExercises((prev) => [...prev, { name: newExercise.trim() }]);
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

  const handleSavePlan = () => {
    
    const plan: Plan = { 
      category: category, 
      exercises,
    };

    if (planId) {
      if (isFavorite) {
        handleFavoritePlanEdition(planId, plan);
      } 
      else {
        handlePlanUpdate(planId, plan);
      }
    } 
    else {
      handlePlanCreation(plan);
    }
  };

  return (
    <div className="edit-form-container">
      <div className="edit-form">
        {/* Шапка формы */}
        <div className="form-header">
          <h2>{planId ? "Редактирование плана" : "Создание нового плана"}</h2>
          <CategoryInput
            initialValue={initialPlanData?.category || ''}
            onChange={setCategory}
          />
        </div>
  
        {/* Тело формы */}
        <div className="form-body">
          <h3>Упражнения:</h3>   
          <ul className="exercises-list">
            {exercises.map((exercise, index) => (
              <div key={index} className="exercise-item">
                <ExerciseItem
                  exercise={exercise}
                  index={index}
                  isEditing={isEditing === index}
                  editExercise={editExercise}
                  onEditChange={setEditExercise}
                  onSaveEdit={() => {
                    if (editExercise.trim()) {
                      setExercises((prev) =>
                        prev.map((ex, i) => (i === index ? { name: editExercise.trim() } : ex))
                      );
                      setIsEditing(null);
                      setEditExercise("");
                    }
                  }}
                  onCancelEdit={() => {
                    setIsEditing(null);
                    setEditExercise("");
                  }}
                  onStartEdit={() => {
                    setIsEditing(index);
                    setEditExercise(exercise.name);
                  }}
                  onDelete={() => setExercises((prev) => prev.filter((_, i) => i !== index))}
                  onInsertBelow={() => setInsertIndex(index + 1)}
                  showExerciseList={showInsertExerciseList === index}
                  onToggleExerciseList={() => 
                    setShowInsertExerciseList(showInsertExerciseList === index ? null : index)
                  }
                  preparedExercises={preparedExercises}
                  onExerciseSelect={(exerciseName) => 
                    handleExerciseSelect(exerciseName, "edit", index)
                  }
                />
  
                {insertIndex === index + 1 && (
                  <ExerciseInsertForm
                    insertNewExercise={insertNewExercise}
                    onExerciseChange={setInsertNewExercise}
                    onInsert={() => handleInsertExercise(index + 1)}
                    onCancel={() => {
                      setInsertIndex(null);
                      setInsertNewExercise("");
                    }}
                    showExerciseList={showInsertExerciseList === index + 1}
                    onToggleExerciseList={() => 
                      setShowInsertExerciseList(showInsertExerciseList === index + 1 ? null : index + 1)
                    }
                    preparedExercises={preparedExercises}
                    onExerciseSelect={(exerciseName) => 
                      handleExerciseSelect(exerciseName, "insert")
                    }
                  />
                )}
              </div>
            ))}
          </ul>
  
          <div className="add-exercise-section">
            <ExerciseAddForm
              newExercise={newExercise}
              onExerciseChange={setNewExercise}
              onAdd={handleAddExercise}
              showExerciseList={showNewExerciseList}
              onToggleExerciseList={() => setShowNewExerciseList(!showNewExerciseList)}
              preparedExercises={preparedExercises}
              onExerciseSelect={(exerciseName) => handleExerciseSelect(exerciseName, "new")}
            />
          </div>
  
          <div className="form-actions">
            <button
              className="submit-button"
              onClick={handleSavePlan}
            >
              {planId ? "Сохранить изменения" : "Создать план"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};