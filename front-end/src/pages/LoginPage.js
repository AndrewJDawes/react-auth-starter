import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams";
export const LoginPage = () => {

    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [googleOAuthURL, setGoogleOAuthURL] = useState('');
    const history = useHistory();
    const { token: oAuthToken } = useQueryParams();
    useEffect(() => {
        if (oAuthToken) {
            setToken(oAuthToken);
            history.push('/');
        }
    }, [oAuthToken, setToken, history]);
    useEffect(() => {
        const loadOAuthURL = async () => {
            try {
                const response = await axios.get('/auth/google/url');
                console.log({ response });
                const url = response.data?.url;
                setGoogleOAuthURL(url);
            } catch (err) {
                console.log({ err });
            }
        }
        loadOAuthURL();
    }, []);
    const onLogInClicked = async () => {
        const response = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        });
        const newToken = response.data?.token;
        setToken(newToken);
        history.push('/');
        // alert('Log in not implemented yet')
    }
    return (
        <div className="content-container">
            <h1>Log In</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                placeholder="someone@gmail.com"
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
            />
            <input
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
            />
            <hr />
            <button
                onClick={onLogInClicked}
                disabled={!emailValue || !passwordValue}
            >
                Log In
            </button>
            <button onClick={() => history.push('/forgot-password')}>Forgot Your Password?</button>
            <button onClick={() => history.push('/signup')}>Don't have an account? Sign Up</button>
            <button
                disabled={!googleOAuthURL}
                onClick={() => window.location.href = googleOAuthURL}
            >Log in with Google</button>
        </div>
    )
}