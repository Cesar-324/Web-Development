import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { borrowBook } from "../../store/loansSlice";
import type { RootState } from "../../store/store";
import useFetch from "../../hooks/useFetch";
import {
  BookModel,
  getBookDetailsUrl,
  FALLBACK_COVER,
} from "../../services/bookService";
import type { GoogleBooksItem } from "../../types/types";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { BookDetailsSkeleton } from "../ui/SkeletonLoader";

const BookDetails = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  const url = id ? getBookDetailsUrl(id) : "";

  const {
    data: book,
    isLoading,
    error,
  } = useFetch<BookModel>(url, (rawData: GoogleBooksItem) => {
    return BookModel.fromGoogleItem(rawData);
  });

  const borrowedBooks = useSelector(
    (state: RootState) => state.loans.borrowedBooks,
  );
  const isAlreadyBorrowed = book
    ? borrowedBooks.some((b) => b.id === book.id)
    : false;

  const handleRequestBook = () => {
    if (!isAuthenticated) {
      toast.error("You need to log in to request a book.");
      return;
    }

    if (book && !isAlreadyBorrowed) {
      dispatch(borrowBook({ ...book }));
      toast.success(`"${book.title}" successfully requested!`);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#2563eb", "#7c3aed", "#059669", "#f59e0b", "#ec4899"],
      });
    }
  };

  const isButtonDisabled = isAuthenticated && isAlreadyBorrowed;

  if (isLoading) return <BookDetailsSkeleton />;
  if (error)
    return (
      <div className="text-center py-12 text-red-500">{error.message}</div>
    );
  if (!book) return <div className="text-center py-12">Book not found.</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Back to catalog
      </Link>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/3">
          <img
            src={book.coverUrl || FALLBACK_COVER}
            alt={book.title}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3 flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {book.author}
          </h2>

          <div
            className="text-gray-700 dark:text-gray-300 mb-6 prose dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: book.description || "No description available.",
            }}
          />

          <div className="flex justify-between items-center mt-auto">
            <p className="text-sm text-gray-500">
              Published: {book.publishedDate || "Unknown"}
            </p>

            <button
              onClick={handleRequestBook}
              disabled={isButtonDisabled}
              className={`font-bold py-2 px-6 rounded-full transition-all duration-200 active:scale-95 ${
                isButtonDisabled
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:shadow-lg"
              }`}
            >
              {isButtonDisabled ? "Already Requested" : "Request Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
