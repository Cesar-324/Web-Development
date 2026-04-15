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
    <form onSubmit={handleSubmit} className="flex justify-center gap-2 my-4 sm:my-5 w-full px-2 sm:px-0">
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Search by title or author..."
        className="px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full max-w-sm outline-none transition-colors hover:border-blue-400 focus:border-blue-500"
      />
      <button 
        type="submit" 
        className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full border-0 bg-blue-600 text-white font-bold cursor-pointer transition-colors hover:bg-blue-700 whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
});

SearchBar.displayName = 'SearchBar';