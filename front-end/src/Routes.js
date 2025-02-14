import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { PrivateRoute } from './auth/PrivateRoute';
import { PleaseVerifyEmailPage } from './pages/PleaseVerifyEmailPage';
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PasswordResetLandingPage } from './pages/PasswordResetLandingPage';
import { EmailVerificationCodePage } from './pages/EmailVerificationCodePage';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path="/login" exact>
                    <LoginPage />
                </Route>
                <Route path="/signup" exact>
                    <SignUpPage />
                </Route>
                <Route path="/verify-email" exact>
                    <EmailVerificationCodePage></EmailVerificationCodePage>
                </Route>
                <Route path="/verify-email/:verificationString" exact>
                    <EmailVerificationLandingPage />
                </Route>
                <Route path="/please-verify" exact>
                    <PleaseVerifyEmailPage />
                </Route>
                <Route path="/forgot-password" exact>
                    <ForgotPasswordPage />
                </Route>
                <Route path="/reset-password" exact>
                    <PasswordResetLandingPage />
                </Route>
            </Switch>
        </Router>
    );
}