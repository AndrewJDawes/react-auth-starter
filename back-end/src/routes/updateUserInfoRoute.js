import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db.js';

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers; // JWT
        const { userId } = req.params;

        const updates = (({
            favoriteFood,
            hairColor,
            bio,
        }) => ({
            favoriteFood,
            hairColor,
            bio,
        }))(req.body)

        if (!authorization) {
            return res.status(401).json({ message: 'No authorization header sent' });
        }
        const token = authorization.split(' ')[1]; // Remove the "Bearer " prefix
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unable to verify token' });

            const { id, isVerified: currentIsVerified } = decoded;
            if (id !== userId) return res.status(403).json({ message: 'Not allowed to update this user\'s data' });
            if (!currentIsVerified) return res.status(403).json({ message: 'You need to verify your email before you can update your data' })
            const db = getDbConnection('react-auth-db');
            const result = await db.collection('users').findOneAndUpdate(
                { _id: ObjectID(id) },
                { $set: { info: updates } },
                { returnOriginal: false }
            )
            const { email, isVerified, info } = result.value;
            jwt.sign({ id, email, isVerified, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    return res.status(500).json({ err });
                }
                return res.status(200).json({ token });
            })
        });
    },
};