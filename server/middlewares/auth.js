import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';  // Adjust the path as needed

dotenv.config();

const authenticate = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');  // Exclude password field
        if (!req.user) {
            return res.status(401).json({ message: 'Access Denied: Invalid Token!' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Access Denied: Invalid Token!' });
    }
};




export default authenticate;

