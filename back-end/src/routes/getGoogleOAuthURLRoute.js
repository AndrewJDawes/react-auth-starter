import { getGoogleOAuthURL } from "../util/getGoogleOAuthURL";

export const getGoogleOAuthURLRoute = {
    path: '/auth/google/url',
    method: 'get',
    handler: (req, res) => {
        const url = getGoogleOAuthURL();
        res.status(200).json({ url });
    },
}