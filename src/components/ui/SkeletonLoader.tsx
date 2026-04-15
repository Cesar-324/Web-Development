export const BookCardSkeleton = () => (
  <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md h-full animate-pulse">
    <div className="w-full h-32 sm:h-44 md:h-56 bg-gray-300 dark:bg-gray-700" />
    <div className="p-3 sm:p-4 flex flex-col gap-2 flex-grow">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5" />
      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-3/5" />
    </div>
  </div>
);

export const BookGridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 py-5 max-w-7xl mx-auto">
    {Array.from({ length: 8 }).map((_, i) => (
      <BookCardSkeleton key={i} />
    ))}
  </div>
);

export const BookDetailsSkeleton = () => (
  <div className="container mx-auto p-4 max-w-4xl animate-pulse">
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-28 mb-6" />

    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden md:flex">
      <div className="md:w-1/3 bg-gray-300 dark:bg-gray-700 min-h-64" />

      <div className="p-6 md:w-2/3 flex flex-col gap-4">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
        <div className="space-y-2 mt-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
        </div>
        <div className="flex justify-between items-center mt-auto pt-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32" />
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-full w-32" />
        </div>
      </div>
    </div>
  </div>
);
