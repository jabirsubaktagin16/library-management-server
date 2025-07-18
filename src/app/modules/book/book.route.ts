import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('', BookController.addBook);

router.get('', BookController.getAllBooks);

router.get('/:bookId', BookController.getSingleBook);

router.patch('/:bookId', BookController.updateBook);

router.delete('/:bookId', BookController.deleteBook);

export const BookRoutes = router;
