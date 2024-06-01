import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'Jason Maverick D. Serencio', email: '202180383@psu.palawan.edu.ph', bio: 'Cultist' });
}