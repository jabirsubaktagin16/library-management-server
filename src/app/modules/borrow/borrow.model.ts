import { model, Schema } from 'mongoose';
import { Book } from '../book/book.model';
import { BorrowStaticMethods, IBorrow } from './borrow.interface';

export const BorrowSchema = new Schema<IBorrow, BorrowStaticMethods>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

BorrowSchema.static(
  'decrementBookCopies',
  async function (book: string, quantity: number) {
    const bookCheck = await Book.findById(book);

    if (!bookCheck) {
      throw new Error('Book not found');
    }

    if (bookCheck.copies < quantity) {
      throw new Error(`Not enough copies. Available: ${bookCheck.copies}`);
    }

    bookCheck.copies -= quantity;

    if (bookCheck.copies === 0) {
      bookCheck.available = false;
    }

    await bookCheck.save();
  },
);

export const Borrow = model<IBorrow, BorrowStaticMethods>(
  'Borrow',
  BorrowSchema,
);
