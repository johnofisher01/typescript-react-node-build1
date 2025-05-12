import type { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize';
import Article from '../../../lib/models/article';
import sequelize from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await sequelize.authenticate();

    const {
      page = '1',
      limit = '10',
      author,
      sort,
      sortDirection,
    } = req.query;

    const validSortFields = ['views', 'shares'];
    const validSortDirections = ['asc', 'desc'];

    const sortField = validSortFields.includes(sort as string) ? (sort as string) : 'id';
    const direction = validSortDirections.includes((sortDirection as string)?.toLowerCase())
      ? (sortDirection as string).toUpperCase()
      : 'DESC';

    const order: any = [[sortField, direction]];
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where = author
      ? { author: { [Op.iLike]: `%${author}%` } }
      : {};

    const { count, rows } = await Article.findAndCountAll({
      where,
      order,
      limit: parseInt(limit as string),
      offset,
    });

    res.status(200).json({
      success: true,
      source: 'database',
      total: count,
      currentPage: parseInt(page as string),
      totalPages: Math.ceil(count / parseInt(limit as string)),
      hasNextPage: parseInt(page as string) * parseInt(limit as string) < count,
      data: rows,
    });
  } catch (err: any) {
    console.error('Error fetching articles:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
