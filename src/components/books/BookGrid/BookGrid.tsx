import type { Book } from '../../../types/types';
import React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import BookCard from '../BookCard/BookCard';

interface BookGridProps {
  books: Book[];
}

export const BookGrid = React.memo(({ books }: BookGridProps) => {
  const [gridRef] = useAutoAnimate<HTMLDivElement>();

  if (books.length === 0) {
    return (
      <p className="col-span-full text-center py-12 text-lg">
        No books were found. Try another search.
      </p>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 py-5 max-w-7xl mx-auto"
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
});

BookGrid.displayName = 'BookGrid';