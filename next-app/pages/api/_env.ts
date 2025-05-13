// pages/api/_env.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    DB_HOST:    process.env.DB_HOST,
    DB_NAME:    process.env.DB_NAME,
    DB_USER:    process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD ? '********' : undefined,
    DB_PORT:    process.env.DB_PORT,
  });
}
