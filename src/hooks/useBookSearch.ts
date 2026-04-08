import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "./useFetch";
import { BookModel, getBookSearchUrl } from "../services/bookService";
import type { GoogleBooksResponse } from "../types/types";
import type { RootState } from "../store/store";
import { setSearchResults } from "../store/searchSlice";

interface UseBookSearchResult {
  books: BookModel[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
}

export const useBookSearch = (): UseBookSearchResult => {
  const dispatch = useDispatch();

  const { query: savedQuery, results: savedBooks } = useSelector(
    (state: RootState) => state.search,
  );
  const [currentQuery, setCurrentQuery] = useState<string>(savedQuery);

  const isCached = currentQuery === savedQuery && savedBooks.length > 0;
  const fetchUrl = isCached ? "" : getBookSearchUrl(currentQuery);

  const { data, isLoading, error } = useFetch<BookModel[]>(
    fetchUrl,
    (rawData: GoogleBooksResponse) => {
      const items = rawData.items ?? [];
      return items.map(BookModel.fromGoogleItem);
    },
  );

  const prevDataRef = useRef<BookModel[] | null>(null);

  useEffect(() => {
    if (data && data !== prevDataRef.current && !isCached) {
      prevDataRef.current = data;

      const plainBooks = data.map((book) => ({ ...book }));
      dispatch(setSearchResults({ query: currentQuery, books: plainBooks }));
    }
  }, [data, currentQuery, isCached, dispatch]);

  const search = (searchText: string) => {
    if (searchText.trim() === "") return;
    setCurrentQuery(searchText);
  };

  return {
    books: isCached ? savedBooks : data || [],
    loading: isCached ? false : isLoading,
    error: error ? error.message : null,
    search,
  };
};
