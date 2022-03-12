import axios from 'axios';
import { oAuthClient } from './oAuthClient';

const getAccessAndBearerTokenUrl = ({ accessToken }) =>
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

export const getGoogleUser = async ({ code }) => {
    // We take the code Google OAuth returned in callback request
    // We then must use that code to make an API request to get tokens from Google which we can use to access the user info
    const { tokens } = await oAuthClient.getToken(code);
    // const access = await oAuthClient.getAccessToken();
    // console.log({ tokens });
    const url = getAccessAndBearerTokenUrl({ accessToken: tokens.access_token });
    const authorizationHeaderValue = `Bearer ${tokens.id_token}`;
    // console.log({ url });
    // console.log({ authorizationHeaderValue });
    try {
        const response = await axios.get(
            url,
            { headers: { Authorization: authorizationHeaderValue } }
        )
        return response.data;
    } catch (err) {
        console.log({ err });
        throw new Error('Could not get user info from Google API!');
    }
}