import { getDbConnection } from "../db";
export const testRoute = {
    path: '/api/test',
    method: 'get',
    handler: async (req, res) => {
        const db = getDbConnection();
        const email = 'testing@gmail.com';
        const googleId = '12345';
        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        };
        const isVerified = true;
        const result = await db.collection('users').findOneAndUpdate(
            { email },
            { $set: { googleId, isVerified } },
            { returnOriginal: false }
        );
        // const result = await db.collection('users').insertOne({
        //     email,
        //     // passwordHash,
        //     googleId,
        //     info: startingInfo,
        //     isVerified,
        //     // verificationString,
        // });

        const { insertedId } = result;

        return res.status(200).json({ result });
        // res.status(200).send('It works!');
    },
};