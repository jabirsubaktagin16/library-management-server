import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';

const addBook = async (payload: IBook): Promise<IBook | null> => {
  const result = await Book.create(payload);
  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { page, limit, skip, sortBy, sort } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (Object.keys(filters).length) {
    andConditions.push({
      $and: Object.entries(filters).map(([field, value]) => ({
        genre: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sort) {
    sortConditions[sortBy] = sort;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const isExist = await Book.findById(id);

  if (!isExist) {
    return null;
  }

  const { ...bookData } = payload;

  const updatedBookData: Partial<IBook> = { ...bookData };

  const result = await Book.findOneAndUpdate({ _id: id }, updatedBookData, {
    new: true,
  });
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
