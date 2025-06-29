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

export const BorrowService = {
  addBorrow,
};
