import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../../lib/models/article';
import sequelize from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    await sequelize.authenticate();

    const { id } = req.query;

    const article = await Article.findByPk(id as string);

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    const summary = `This is a mocked summary for the article titled "${article.getDataValue('title')}" by ${article.getDataValue('author')}.`;

    res.status(200).json({ success: true, summary });
  } catch (err: any) {
    console.error('Error generating summary:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
