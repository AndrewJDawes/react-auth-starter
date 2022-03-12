import jwt from 'jsonwebtoken';
import { getGoogleUser } from '../util/getGoogleUser';
import { updateOrCreateUserFromOAuth } from '../util/updateOrCreateUserFromOAuth';

export const googleOAuthCallbackRoute = {
    path: '/auth/google/callback',
    method: 'get',
    handler: async (req, res) => {
        const { code } = req.query;
        try {
            const oAuthUserInfo = await getGoogleUser({ code });
            // return res.sendStatus(200);
            const updatedUser = await updateOrCreateUserFromOAuth({ oAuthUserInfo });
            const { _id: id, isVerified, email, info } = updatedUser;
            jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    return res.sendStatus(500);
                }
                return res.redirect(`http://localhost:3000/login?token=${token}`);
            });
        } catch (err) {
            return res.status(500).redirect(`http://localhost:3000/login`);
        }
    }
}