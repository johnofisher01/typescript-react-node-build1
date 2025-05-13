import type { NextApiRequest, NextApiResponse } from 'next';
import Article from '../../../../lib/models/article';
import sequelize from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await sequelize.authenticate();

    const { id } = req.query;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    const summary = `Mock summary for article "${article.title}" by ${article.author}.`;
    res.status(200).json({ success: true, summary });
  } catch (error: any) {
    console.error('Error summarizing article:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
