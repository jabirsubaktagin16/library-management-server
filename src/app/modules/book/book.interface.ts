import { Model } from 'mongoose';

export type IBook = {
  id: string;
  title: string;
  author: string;
  genre:
    | 'FICTION'
    | 'NON_FICTION'
    | 'SCIENCE'
    | 'HISTORY'
    | 'BIOGRAPHY'
    | 'FANTASY';

  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
};
