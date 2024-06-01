import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content, authorId } = req.body;
    try {
      const post = await prisma.post.create({
        data: { title, content, authorId },
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Post creation failed' });
    }
  } else {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  }
}