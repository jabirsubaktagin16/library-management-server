import { model, Schema } from 'mongoose';
import { Borrow } from '../borrow/borrow.model';
import { BookModel, IBook } from './book.interface';

export const BookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: {
        values: [
          'FICTION',
          'NON_FICTION',
          'SCIENCE',
          'HISTORY',
          'BIOGRAPHY',
          'FANTASY',
        ],
        message:
          'Genre must be one of FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY',
      },
    },

    isbn: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, 'Copies must be a positive number'],
    },
    available: {
      type: Boolean,
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

BookSchema.post('findOneAndDelete', async function (doc, next) {
  if (doc) {
    Borrow.deleteMany({ book: doc._id });
  }
  next();
});

export const Book = model<IBook, BookModel>('Book', BookSchema);
