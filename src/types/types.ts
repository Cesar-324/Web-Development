export interface OpenLibraryDoc {
  key: string;               
  title: string;             
  author_name?: string[];    
  cover_i?: number;          
  first_publish_year?: number;
}

export interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];    
  numFound: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  publishedDate?: string;
  description?: string;
}

export interface GoogleBooksVolumeInfo {
  title?: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  infoLink?: string;
}

export interface GoogleBooksItem {
  id: string;
  volumeInfo: GoogleBooksVolumeInfo;
}

export interface GoogleBooksResponse {
  items?: GoogleBooksItem[];
  totalItems: number;
}

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}