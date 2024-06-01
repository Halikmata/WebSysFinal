import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    try {
      const user = await prisma.user.create({
        data: { name, email, password },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'User creation failed' });
    }
  } else {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  }
}