import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sort?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sort: SortOrder;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'createdAt';
  const sort = options.sort || 'desc';

  return { page, limit, skip, sortBy, sort };
};

export const paginationHelpers = {
  calculatePagination,
};
