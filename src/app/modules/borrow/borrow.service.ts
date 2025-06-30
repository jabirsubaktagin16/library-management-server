import { IGenericResponse } from '../../../interfaces/common';
import { IBorrow } from './borrow.interface';
import { Borrow } from './borrow.model';

const addBorrow = async (
  payload: IBorrow,
): Promise<IBorrow | null | undefined> => {
  try {
    await Borrow.decrementBookCopies(payload.book.toString(), payload.quantity);

    const result = await Borrow.create(payload);
    return result;
  } catch (error: any) {
    throw error;
  }
};

const getBorrowSummary = async (): Promise<IGenericResponse<IBorrow[]>> => {
  const result = await Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'bookInfo',
      },
    },
    {
      $unwind: '$bookInfo',
    },
    {
      $project: {
        _id: 0,
        book: {
          title: '$bookInfo.title',
          isbn: '$bookInfo.isbn',
        },
        totalQuantity: 1,
      },
    },
  ]);

  return {
    data: result,
  };
};

export const BorrowService = {
  addBorrow,
  getBorrowSummary,
};
