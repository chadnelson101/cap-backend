// Function to authenticate the user and retrieve the user ID from the JWT token
import jwt from 'jsonwebtoken';

export const getUserId = (req) => {
    // Extract JWT token from the request headers or cookies
    const token = req.headers.authorization || req.cookies.jwt;

    if (token) {
        try {
            // Decode the JWT token to retrieve user information
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            
            // Extract user ID from the decoded token
            const userId = decodedToken.id;

            return userId;
        } catch (error) {
            // Handle invalid or expired tokens
            console.error('Error decoding JWT token:', error);
            return null;
        }
    } else {
        // If token doesn't exist or not provided
        return null;
    }
};


export default getUserId