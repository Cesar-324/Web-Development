import type { Book, GoogleBooksItem } from '../types/types';

const DEFAULT_SEARCH = 'best sellers';
const DEFAULT_IMAGE = 'https://via.placeholder.com/150x200?text=Sin+Portada';

const getApiKey = () => {
  const key = import.meta.env.VITE_API_KEY_GOOGLE_BOOK || import.meta.env.API_KEY_GOOGLE_BOOK;
  if (!key) {
    throw new Error('API key is missing. Please set VITE_API_KEY_GOOGLE_BOOK o API_KEY_GOOGLE_BOOK');
  }
  return key;
};

export class BookModel {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  publishedDate?: string;
  description?: string;

  constructor(data: Book) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.coverUrl = data.coverUrl;
    this.publishedDate = data.publishedDate;
    this.description = data.description;
  }

  static fromGoogleItem(item: GoogleBooksItem): BookModel {
    const volume = item.volumeInfo;
    const thumbnail = volume.imageLinks?.thumbnail || volume.imageLinks?.smallThumbnail || null;

    return new BookModel({
      id: item.id,
      title: volume.title || 'Title not available',
      author: volume.authors ? volume.authors.join(', ') : 'Author unknown',
      coverUrl: thumbnail,
      publishedDate: volume.publishedDate,
      description: volume.description,
    });
  }
}

export const getBookDetailsUrl = (id: string): string => {
  const apiKey = getApiKey();
  return `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}?key=${encodeURIComponent(apiKey)}`;
};

export const getBookSearchUrl = (searchQuery: string): string => {
  const query = searchQuery.trim().length > 0 ? searchQuery.trim() : DEFAULT_SEARCH;
  const apiKey = getApiKey();
  return `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12&key=${encodeURIComponent(apiKey)}`;
};

export const FALLBACK_COVER = DEFAULT_IMAGE;
