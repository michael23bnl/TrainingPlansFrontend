import './PlanSearch.css';
import { useEffect, useRef } from 'react';

interface PlanSearchProps {
  value: string;         
  onSearch: (term: string) => void;
  debounceDelay?: number;
  placeholder?: string;
}

export const PlanSearch = ({ 
  value,
  onSearch,
  debounceDelay = 300,
  placeholder = "Поиск..."
}: PlanSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [value, debounceDelay, onSearch]);

  return (
    <div className='search-navbar'>
      <div className="search-container">
        <input 
          ref={inputRef}
          type='text' 
          className="search-input" 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};