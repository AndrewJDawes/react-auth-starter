import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.sendStatus(401);
        }

        const { _id: id, isVerified, passwordHash, salt, info } = user;
        const pepper = process.env.PEPPER_STRING;
        const isCorrect = await bcrypt.compare(salt + password + pepper, passwordHash);

        if (isCorrect) {
            jwt.sign(
                {
                    id,
                    email,
                    info,
                    isVerified,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2d',
                },
                (err, token) => {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    return res.status(200).json({ token });
                }
            );
        } else {
            return res.sendStatus(401);
        }
    }
}