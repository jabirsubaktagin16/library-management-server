import express from 'express';
import { BorrowController } from './borrow.controller';

const router = express.Router();

router.post('', BorrowController.addBorrow);

router.get('', BorrowController.getBorrowSummary);

export const BorrowRoutes = router;
