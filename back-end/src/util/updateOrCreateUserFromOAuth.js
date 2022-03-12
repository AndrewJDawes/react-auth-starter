import { getDbConnection } from "../db";

export const updateOrCreateUserFromOAuth = async ({ oAuthUserInfo }) => {
    /*
    {
        oAuthUserInfo: {
            id: '112952065866025899646',
            email: 'arthurianromance@gmail.com',
            verified_email: true,
            name: 'Andrew Dawes',
            given_name: 'Andrew',
            family_name: 'Dawes',
            picture: 'https://lh3.googleusercontent.com/a-/AOh14GjkNrW7SGFRnu3v3LgsTQMBhFvqSK2iK6j2AADDIQ=s96-c',
            locale: 'en'
        }
    }
    */
    const {
        id: googleId,
        verified_email: isVerified,
        email,
    } = oAuthUserInfo;

    const db = getDbConnection('react-auth-db');
    const existingUser = await db.collection('users').findOne({
        email
    });

    if (existingUser) {
        // findOneAndUpdate returns a results object like this
        /*
        {
            "lastErrorObject": { "n": 1, "updatedExisting": true },
            "value": {
            "_id": "622cc569d90faf65c205ce0e",
            "email": "testing@gmail.com",
            "googleId": "12345",
            "info": { "hairColor": "", "favoriteFood": "", "bio": "" },
            "isVerified": true
            },
            "ok": 1
        }
        */
        const result = await db.collection('users').findOneAndUpdate(
            { email },
            { $set: { googleId, isVerified } },
            { returnOriginal: false }
        );
        return result.value;
    } else {
        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        };

        // insertOne returns a results object like this
        /*
        {
            "result": { "n": 1, "ok": 1 },
            "connection": {
            "_events": {},
            "_eventsCount": 4,
            "id": 1,
            "address": "127.0.0.1:27017",
            "bson": {},
            "socketTimeout": 0,
            "host": "localhost",
            "port": 27017,
            "monitorCommands": false,
            "closed": false,
            "destroyed": false,
            "lastIsMasterMS": 1
            },
            "ops": [
            {
                "email": "testing@gmail.com",
                "googleId": "12345",
                "info": { "hairColor": "", "favoriteFood": "", "bio": "" },
                "isVerified": true,
                "_id": "622cc62971fb1a67eda49740"
            }
            ],
            "insertedCount": 1,
            "insertedId": "622cc62971fb1a67eda49740",
            "n": 1,
            "ok": 1
        }
        */
        const result = db.collection('users').insertOne({
            email,
            // passwordHash,
            googleId,
            info: startingInfo,
            isVerified,
            // verificationString,
        });

        // const { insertedId } = result;

        return result.ops[0];
    }

}