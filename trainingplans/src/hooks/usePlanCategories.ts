
import { useState, useEffect } from 'react';

export const usePlanCategories = (initialValue: string = '') => {
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    if (initialValue) {
      setCategories(initialValue.split(',').map(c => c.trim()).filter(c => c));
    }
  }, [initialValue]);

  const addCategory = (category: string) => {
    const trimmed = category.trim();
    if (trimmed && !categories.includes(trimmed)) {
      const newCategories = [...categories, trimmed];
      setCategories(newCategories);
      return newCategories;
    }
    return categories;
  };

  const removeCategory = (index: number) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
    return newCategories;
  };

  const getCategoriesString = () => categories.join(', ');

  return {
    categories,
    addCategory,
    removeCategory,
    getCategoriesString,
    setCategories,
  };
};