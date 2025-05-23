import React, { useEffect, useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { nanoid } from "nanoid";
import { Plan, ExerciseRequest } from "../../api/interfaces";
import { CategoryInput } from "./CategoryInput";
import { ExerciseSelectModal } from "./ExerciseSelectModal";
import { SortableItem } from "./SortableItem";

interface Props {
  handlePlanCreation: (request: Plan) => void;
  handlePlanUpdate: (id: string, request: Plan) => void;
  handleFavoritePlanEdition: (id: string, request: Plan) => void;
  planId: string | null;
  isFavorite?: boolean;
  initialPlanData?: Plan;
  preparedExercises: Record<string, ExerciseRequest[]>;
}

interface ExerciseGroup {
  id: string;
  names: string[];
}

export const PlanEditor: React.FC<Props> = ({
  handlePlanCreation,
  handlePlanUpdate,
  handleFavoritePlanEdition,
  planId,
  isFavorite,
  initialPlanData,
  preparedExercises,
}) => {
  const [category, setCategory] = useState<string>("");
  const [exerciseGroups, setExerciseGroups] = useState<ExerciseGroup[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (planId && initialPlanData) {
      setCategory(initialPlanData.category || "");
      const restored =
        initialPlanData.exercises?.map((e) => ({
          id: nanoid(),
          names: e.name.split(",").map((n) => n.trim()),
        })) ?? [];
      setExerciseGroups(restored);
    }
  }, [planId, initialPlanData]);

  const moveItem = useCallback(
    (fromIndex: number, toIndex: number) => {
      setExerciseGroups((prev) => {
        const updated = [...prev];
        const [movedItem] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, movedItem);
        return updated;
      });
    },
    []
  );

  const handleSelect = (selectedNames: string[]) => {
    if (selectedNames.length > 0) {
      if (editingIndex !== null) {
        setExerciseGroups((prev) => {
          const updated = [...prev];
          updated[editingIndex] = {
            ...updated[editingIndex],
            names: selectedNames,
          };
          return updated;
        });
        setEditingIndex(null);
      } else {
        setExerciseGroups((prev) => [
          ...prev,
          { id: nanoid(), names: selectedNames },
        ]);
      }
    }
  };

  const handleDeleteGroup = (id: string) => {
    setExerciseGroups((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditGroup = (id: string) => {
    const index = exerciseGroups.findIndex((item) => item.id === id);
    if (index !== -1) {
      setEditingIndex(index);
      setModalOpen(true);
    }
  };

  const handleSavePlan = () => {
    const exercises = exerciseGroups.map((group) => ({
      name: group.names.join(", "),
    }));

    const plan: Plan = {
      category: category,
      exercises,
    };

    if (planId) {
      if (isFavorite) {
        handleFavoritePlanEdition(planId, plan);
      } else {
        handlePlanUpdate(planId, plan);
      }
    } else {
      handlePlanCreation(plan);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-xl m-[110px]">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">
            {planId ? "Редактирование плана" : "Создание нового плана"}
          </h2>
          <CategoryInput
            initialValue={initialPlanData?.category || ""}
            onChange={setCategory}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Упражнения:</h3>
          <ul className="space-y-3">
            {exerciseGroups.map((group, index) => (
              <SortableItem
                key={group.id}
                id={group.id}
                index={index}
                group={group.names}
                moveItem={moveItem}
                onDelete={() => handleDeleteGroup(group.id)}
                onEdit={() => handleEditGroup(group.id)}
              />
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
            onClick={() => {
              setEditingIndex(null);
              setModalOpen(true);
            }}
          >
            Добавить упражнение
          </button>
        </div>

        {modalOpen && (
          <ExerciseSelectModal
            preparedExercises={preparedExercises}
            onSelect={handleSelect}
            onClose={() => {
              setModalOpen(false);
              setEditingIndex(null); // сбрасываем редактирование при закрытии
            }}
            initialNames={
              editingIndex !== null ? exerciseGroups[editingIndex].names : []
            }
          />
        )}

        <div className="text-right">
          <button
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md"
            onClick={handleSavePlan}
          >
            {planId ? "Сохранить изменения" : "Создать план"}
          </button>
        </div>
      </div>
    </DndProvider>
  );
};
