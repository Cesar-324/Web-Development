import type { Book } from '../../../types/types';
import React from 'react';
import BookCard from '../BookCard/BookCard';

interface BookGridProps {
  books: Book[];
}

export const BookGrid =  React.memo(({ books }: BookGridProps) => {
  if (books.length === 0) {
    return (
      <p className="col-span-full text-center py-12 text-lg">
        No books were found. Try another search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5 max-w-7xl mx-auto">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
});