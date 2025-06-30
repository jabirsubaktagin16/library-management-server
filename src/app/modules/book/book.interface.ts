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
  available: boolean | true;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  filter?: string;
};
