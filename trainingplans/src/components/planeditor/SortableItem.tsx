import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import '../plans/plans.css';

interface SortableItemProps {
  id: string;
  index: number;
  group: string[];
  moveItem: (fromIndex: number, toIndex: number) => void;
  onDelete: () => void;
  onEdit: () => void;
}

const ItemType = "EXERCISE_GROUP";

export const SortableItem: React.FC<SortableItemProps> = ({
  id,
  index,
  group,
  moveItem,
  onDelete,
  onEdit,
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={`p-3 bg-gray-100 rounded-md flex justify-between items-center cursor-move select-none ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="w-[600px]">
          <div>
            <strong>{index + 1}:</strong> {group.join(", ")}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="icon-button"
            title="Редактировать"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <img src={editIcon} 
                  className="plan-icon plan-edit-icon" 
                  alt="Редактировать" 
                />
          </button>
          <button
            className="icon-button"
            title="Удалить"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
          <img src={deleteIcon} 
                  className="plan-icon plan-delete-icon" 
                  alt="Удалить" 
                />
          </button>
        </div>
      </div>
    </li>
  );
};
