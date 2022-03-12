import { testRoute } from './testRoute';
import { signUpRoute } from './signUpRoute';
import { logInRoute } from './logInRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { testEmailRoute } from './testEmailRoute';
import { verifyEmailRoute } from './verifyEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { getGoogleOAuthURLRoute } from './getGoogleOAuthURLRoute';
import { googleOAuthCallbackRoute } from './googleOAuthCallbackRoute';
export const routes = [
    testRoute,
    signUpRoute,
    logInRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    getGoogleOAuthURLRoute,
    googleOAuthCallbackRoute,
];
