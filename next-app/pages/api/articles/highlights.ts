import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../../lib/models/article';
import sequelize from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await sequelize.authenticate();

    const mostViewed = await Article.findOne({ order: [['views', 'DESC']] });
    const mostShared = await Article.findOne({ order: [['shares', 'DESC']] });

    res.status(200).json({ success: true, mostViewed, mostShared });
  } catch (err: any) {
    console.error('🔥 Error fetching highlights:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
