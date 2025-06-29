import { Request, Response } from 'express';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { IBook } from './book.interface';
import { BookService } from './book.service';

const addBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;

  try {
    const result = await BookService.addBook(bookData);

    sendResponse<IBook>(res, {
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error._message,
      success: false,
      error,
    });
  }
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    success: true,
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bookId;

  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bookId;
  const updatedData = req.body;

  const result = await BookService.updateBook(id, updatedData);

  sendResponse<IBook>(res, {
    success: result === null ? false : true,
    message: result === null ? 'Book not found' : 'Book updated successfully',
    data: result,
  });
});

export const BookController = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
};
