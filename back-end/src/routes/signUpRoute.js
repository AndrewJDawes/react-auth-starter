import { getDbConnection } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { sendEmail } from '../util/sendEmail';
export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {

        // Get POSTed email and password
        const { email, password } = req.body;
        // Get db connection
        const db = getDbConnection('react-auth-db');
        // Create user in database

        // Check if user already exists
        const user = await db.collection('users').findOne({ email });
        // Bail
        if (user) {
            // 409 - conflict error - there is some kind of conflicting resource on the server.
            return res.sendStatus(409);
        }

        // Encrypt user's password
        const passwordHash = await bcrypt.hash(password, 10);

        const verificationString = uuid();

        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        };

        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
            verificationString,
        });

        const { insertedId } = result;

        try {
            await sendEmail({
                to: email,
                from: 'andrewjamesdawes+sendgrid@gmail.com',
                subject: 'Verify your email',
                text: `
                    Thanks for signing up! To verify your email, click here:
                    http://localhost:3000/verify-email/${verificationString}
                `
            })
        } catch (err) {
            console.log(e);
            res.sendStatus(500);
        }

        // Don't send the password back!
        // Return JWT so user can continue to perform auth'd actions.
        jwt.sign(
            {
                id: insertedId,
                email,
                info: startingInfo,
                isVerified: false,
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
    },
};