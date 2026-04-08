import { useCallback } from 'react';
import { useBookSearch } from '../../hooks/useBookSearch';
import { BookGrid } from '../books/BookGrid/BookGrid';
import { SearchBar } from '../layout/SearchBar/SearchBar';

const CatalogPage = () => {
  const { books, loading, error, search } = useBookSearch();

  const handleSearch = useCallback((query: string) => {
    search(query);
  }, [search]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Book Catalog</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div className="text-center py-12">Loading books...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : (
        <BookGrid books={books} />
      )}
    </div>
  );
};

export default CatalogPage;