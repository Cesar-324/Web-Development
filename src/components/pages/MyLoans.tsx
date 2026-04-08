import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../store/store";
import { BookGrid } from "../books/BookGrid/BookGrid";

const MyLoansPage = () => {
  const borrowedBooks = useSelector(
    (state: RootState) => state.loans.borrowedBooks,
  );

  return (
    <div className="container mx-auto p-4">
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
        <BookGrid books={borrowedBooks} />
      )}
    </div>
  );
};

export default MyLoansPage;
