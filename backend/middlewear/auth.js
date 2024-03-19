import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { check,getUserByEmail } from '../models/users.js';



const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Fetch user information
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid email or password'
            });
        }

        // Fetch hashed password from the database
        const { hashedPassword } = await check(email);

        // Compare passwords using bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            // Generate JWT token with user ID included in the payload
            const payload = {
                userId: user,
                email: user.email,
                role: user.role,
                // Include other user information as needed
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
            console.log('Generated Token:', token); // Log the generated token
            res.cookie('jwt', token, { httpOnly: true });
            
            // Send success response
            return res.json({
                user: user,
                token: token,
                msg: 'You have logged in successfully'
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
