import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../lib/db';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [rows] = await sequelize.query('SELECT NOW()');

    res.status(200).json({ dbTime: (rows as any)[0].now });
  } catch (error: any) {
    console.error('Database connection failed:', error.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
}
