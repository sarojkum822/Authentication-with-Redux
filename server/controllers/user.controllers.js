import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import setCookie from '../utils/sendCookie.js';

// Register User
export const register = async (req, res) => {
    const { fullname, email, password, contact, picture } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = new User({ fullname, email, password, contact, picture });
        await user.save();
        setCookie(user, res);
    } catch (error) {
        console.log("error: " , error)
        res.status(500).json({ message: 'Server error'});
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        setCookie(user, res);

    } catch (error) {
        console.log( error.message );
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Profile Details
export const getProfileDetails = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Details by ID
export const getDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the requester is an admin or the user himself
        if (req.user.role === 'admin' || req.user._id.toString() === user._id.toString()) {
            res.status(200).json(user);
        } else {
            res.status(403).json({ message: 'Access Denied' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const logout=async (req,res)=>{
   try {
    await res.clearCookie('token');
     res.status(200).json({ message: 'Logged out' });
   } catch (error) {
        res.status(500).json({ message:error.message });
   }
}
