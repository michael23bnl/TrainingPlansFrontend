import { KeyboardEvent, useRef, useState } from 'react';
import { usePlanCategories } from '../../hooks/usePlanCategories';
import './CategoryInput.css';

interface CategoryInputProps {
  initialValue?: string;
  onChange: (categoriesString: string) => void;
}

export const CategoryInput = ({ initialValue = '', onChange }: CategoryInputProps) => {
  const {
    categories,
    addCategory,
    removeCategory,
  } = usePlanCategories(initialValue);

  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleAdd = (category: string) => {
    const newCategories = addCategory(category);
    onChange(newCategories.join(', '));
    return newCategories;
  };

  const handleRemove = (index: number) => {
    const newCategories = removeCategory(index);
    onChange(newCategories.join(', '));
    return newCategories;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      handleAdd(inputValue);
      setInputValue('');
      adjustTextareaHeight();
    } else if (e.key === 'Backspace' && inputValue === '' && categories.length > 0) {
      handleRemove(categories.length - 1);
    }
  };

  return (
    <div>
      <div className={`category-input-container ${isFocused ? 'focused' : ''}`}>
        <div className="categories-tags">
          {categories.map((category, index) => (
            <span key={`${category}-${index}`} className="category-tag">
              {category}
              <button
                type="button"
                className="remove-tag"
                onClick={() => handleRemove(index)}
                aria-label={`Удалить категорию ${category}`}
              >
                &times;
              </button>
            </span>
          ))}
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              if (inputValue.trim()) {
                handleAdd(inputValue);
                setInputValue('');
                adjustTextareaHeight();
              }
            }}
            placeholder={categories.length === 0 ? "Категория плана" : ""}
            className="category-input"
            rows={1}
          />
        </div>
      </div>
      {isFocused && (
        <div className="input-hint">Используйте Enter или запятую для добавления</div>
      )}
    </div>
  );
};
