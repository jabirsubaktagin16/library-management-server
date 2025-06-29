import { Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';

export type IBorrow = {
  id: string;
  book: Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
};

export interface BorrowStaticMethods extends Model<IBorrow> {
  decrementBookCopies(book: string, quantity: number): Promise<void>;
}
