import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('', BookController.addBook);

router.get('', BookController.getAllBooks);

router.get('/:bookId', BookController.getSingleBook);

export const BookRoutes = router;
