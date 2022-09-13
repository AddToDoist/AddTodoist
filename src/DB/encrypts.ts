import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const secret = process.env.DB_SECRET || null;
if (!secret) throw new Error('DB_SECRET is not set');

type User = {
  apiToken: string;
  projectId: string;
};

export const hashId = (id: string) => crypto.createHash('sha256').update(id).digest('hex');

export const encodeUser = (user: User) => jwt.sign(user, secret, { noTimestamp: true });

export const decodeUser = (encodedUser: string): User => jwt.verify(encodedUser, secret) as User;
