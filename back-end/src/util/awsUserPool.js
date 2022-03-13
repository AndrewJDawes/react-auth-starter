import { CognitoUserPool } from 'amazon-cognito-identity-js';
import AWS, { CognitoIdentityCredentials } from 'aws-sdk';
import fetch from 'cross-fetch';
/*

Error [ERR_REQUIRE_ESM]: require() of ES Module /home/anton/Projects/react-auth-starter/back-end/node_modules/node-fetch/src/index.js from /home/anton/Projects/react-auth-starter/back-end/src/util/awsUserPool.js not supported.
Instead change the require of index.js in /home/anton/Projects/react-auth-starter/back-end/src/util/awsUserPool.js to a dynamic import() which is available in all CommonJS modules.
*/
// import nodeFetch from 'node-fetch'; // Did not work because it claimed we are trying to use require() when we are using import.
// This is because Babel is forcing CommonJS (require) instead of using ES Modules (import)
// https://stackoverflow.com/questions/66095924/force-babel-to-transform-import-into-require
// https://babeljs.io/docs/en/babel-preset-env
// global.fetch = nodeFetch; // Polyfill so aws libraries know to use node fetch instead of browser fetch
global.fetch = fetch; // Polyfill so aws libraries know to use node fetch instead of browser fetch

AWS.config.region = process.env.AWS_REGION;
AWS.config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
});

const poolData = {
    UserPoolId: process.env.AWS_USER_POOL_ID,
    ClientId: process.env.AWS_CLIENT_ID
};

export const awsUserPool = new CognitoUserPool(poolData);