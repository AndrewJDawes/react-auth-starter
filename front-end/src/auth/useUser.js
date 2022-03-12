import { useState, useEffect } from 'react';
import { useToken } from './useToken';
export const useUser = () => {
    // Get token from localStorage.
    const [token] = useToken();

    // Helper function to parse User data out of token
    const getPayloadFromToken = token => {
        // Get middle portion of JWT
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload));
    }

    // Try to get the User data from the token (if token exists).
    const [user, setUser] = useState(() => {
        if (!token) return null;
        return getPayloadFromToken(token);
    })

    // Whenever component state updates, check whether the token has changed values.
    // If it has, update the User object accordingly.
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (!token) {
                setUser(null);
            } else {
                setUser(getPayloadFromToken(token));
            }
        }
        return () => { isMounted = false }
    }, [token])

    return [user];
}