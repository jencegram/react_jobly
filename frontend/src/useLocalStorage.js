// useLocalStorage.js
import { useState } from 'react';

function useLocalStorage(key, firstValue = null) {
  const [item, setItem] = useState(() => {
    const itemFromStorage = localStorage.getItem(key);
    if (itemFromStorage != null) {
      try {
        return JSON.parse(itemFromStorage);
      } catch (error) {
        console.error("Parsing error on localStorage item", error);
        localStorage.removeItem(key);
      }
    }
    return firstValue;
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(item) : value;
      setItem(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage item", error);
    }
  };

  return [item, setValue];
}

export default useLocalStorage;
