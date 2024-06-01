import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Adjust the import path as needed

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
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    const { name, email, bio } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: String(id) },
        data: { name, email, bio },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'User update failed' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}