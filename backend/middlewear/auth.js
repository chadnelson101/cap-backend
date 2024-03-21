import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { check } from '../models/users.js';


const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Fetch user information
        const user = await check(email);

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid email or password'
            });
        }

        // Check if hashedPassword exists in the user object
        if (!user.hashedPassword) {
            return res.status(500).json({
                msg: 'Internal server error: hashed password not found'
            });
        }

        // Fetch hashed password from the database
        const { hashedPassword, userId } = user;

        // Compare passwords using bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            // Generate JWT token with user ID included in the payload
            const payload = {
                userId: userId, // Include user ID in the payload
                email: email, // Include email in the payload
            };
            

            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3m' });
            
            // Log the generated token and user ID
            console.log('Generated Token:', token);
            console.log('User ID:', userId);

            // Send success response with token
            return res.json({
                token: token,
                userId: userId,
                msg: 'You have logged in successfully',
            });
        } else {
            // Send failure response if passwords don't match
            return res.status(401).json({
                msg: 'Invalid email or password'
            });
        }
    } catch (error) {
        // Handle any errors
        console.error('Error during login:', error);
        return res.status(500).json({
            msg: 'Internal server error'
        });
    }
};


export default loginUser;
export const verifyToken = (token) => {
    try {
        // Check if the token is a string
        if (typeof token !== 'string') {
            throw new Error('Token must be a string');
        }

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        
        // Logging the decoded token to ensure it's correct
        console.log('Verified Token:', decodedToken);

        // Extract user ID from the decoded token
        const userId = decodedToken.userId;

        // Return the userId
        return userId;
    } catch (error) {
        // Handle invalid or expired tokens
        console.error('Error verifying JWT token:', error);
        // Throw the error to be handled by the caller
        throw error;
    }
};




