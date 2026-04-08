import React from 'react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = React.memo(({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-2 my-5 w-full">
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Search by title or author (e.g., Don Quixote or Cervantes)..."
        className="px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full max-w-sm outline-none transition-colors hover:border-blue-400 focus:border-blue-500"
      />
      <button 
        type="submit" 
        className="px-6 py-3 rounded-full border-0 bg-blue-600 text-white font-bold cursor-pointer transition-colors hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
});

SearchBar.displayName = 'SearchBar';