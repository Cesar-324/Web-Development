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
        className="w-full h-32 sm:h-44 md:h-56 object-cover bg-gray-200"
        onError={(e) => {
          (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
        }}
      />
      <div className="p-2 sm:p-3 md:p-4 flex flex-col gap-1 flex-grow">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold leading-tight text-gray-900 dark:text-white line-clamp-2">{book.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">by {book.author}</p>
      </div>
    </Link>
  );
};

export default BookCard;
