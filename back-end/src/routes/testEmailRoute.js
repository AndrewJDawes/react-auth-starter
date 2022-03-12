import { sendEmail } from "../util/sendEmail";

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: 'andrewjamesdawes+user@gmail.com',
                from: 'andrewjamesdawes+sendgrid@gmail.com',
                subject: 'Hello world',
                text: 'If you\'re reading this, it works',
            })
            res.sendStatus(200);

        } catch (e) {
            console.log({ e });
            res.sendStatus(500);
        }
    }
}