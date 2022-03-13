import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
export const ForgotPasswordPage = () => {
    const [emailValue, setEmailValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    const onSubmitClicked = async () => {
        try {
            await axios.put(`/api/forgot-password/${emailValue}`);
            setSuccess(true);
            setTimeout(() => {
                history.push(`/reset-password?email=${encodeURIComponent(emailValue)}`);
            }, 3000);
        } catch (err) {
            setErrorMessage(err.message);
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Check your email for a reset link</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>
                Enter your email and we'll send you a reset link
            </p>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com"
            />
            <button
                disabled={!emailValue}
                onClick={onSubmitClicked}
            >
                Send Reset Link
            </button>
        </div>
    )
}