import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBorrow } from './borrow.interface';
import { BorrowService } from './borrow.service';

const addBorrow = catchAsync(async (req: Request, res: Response) => {
  const { ...borrowData } = req.body;

  try {
    const result = await BorrowService.addBorrow(borrowData);

    sendResponse<IBorrow>(res, {
      success: true,
      message: 'Book borrowed successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

export const BorrowController = {
  addBorrow,
};
