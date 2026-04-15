import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import toast from "react-hot-toast";
import type { RootState } from "../../store/store";
import { returnBook } from "../../store/loansSlice";
import { FALLBACK_COVER } from "../../services/bookService";

const MyLoansPage = () => {
  const dispatch = useDispatch();
  const borrowedBooks = useSelector(
    (state: RootState) => state.loans.borrowedBooks,
  );

  const [listRef] = useAutoAnimate<HTMLUListElement>();

  const handleReturn = (bookId: string, bookTitle: string) => {
    dispatch(returnBook(bookId));
    toast.success(`"${bookTitle}" returned successfully.`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">My Loans</h1>

      {borrowedBooks.length === 0 ? (
        <div className="text-center py-12 flex flex-col items-center">
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">
            You haven't requested any books yet.
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            Go to Catalog
          </Link>
        </div>
      ) : (
        <ul ref={listRef} className="flex flex-col gap-4">
          {borrowedBooks.map((book) => (
            <li
              key={book.id}
              className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-shadow hover:shadow-lg"
            >
              <img
                src={book.coverUrl || FALLBACK_COVER}
                alt={`Cover of ${book.title}`}
                className="w-16 h-20 object-cover rounded-md flex-shrink-0 bg-gray-200 dark:bg-gray-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_COVER;
                }}
              />

              <div className="flex-grow min-w-0">
                <Link
                  to={`/book/${book.id}`}
                  className="text-base font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                >
                  {book.title}
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                  {book.author}
                </p>
              </div>

              <button
                onClick={() => handleReturn(book.id, book.title)}
                className="flex-shrink-0 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-bold py-2 px-4 rounded-full transition-all duration-200 cursor-pointer"
              >
                Return
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyLoansPage;
