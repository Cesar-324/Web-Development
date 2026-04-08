import type { Book } from '../../../types/types';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: Book;
}

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150x200?text=No+Cover';

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Link to={`/book/${book.id}`} className="flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-2 h-full">
      <img 
        src={book.coverUrl || PLACEHOLDER_IMAGE} 
        alt={`Cover of ${book.title}`} 
        className="w-full h-80 object-cover bg-gray-200"
        onError={(e) => {
          (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
        }}
      />
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h3 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">{book.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Author: {book.author}</p>
      </div>
    </Link>
  );
};

export default BookCard;
