import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const setCookie = (user, res) => {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only send the cookie over HTTPS in production
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour in milliseconds
    });

    res.status(200).json({ message: 'Login successful', user: { id: user._id, role: user.role, email: user.email } },);
};

export default setCookie;
