import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    cart: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }],
        default: []
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    orders: {
        type: [{
            orderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order'
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    },
    contact: {
        type: String,
        default: "",
        trim: true
    },
    picture: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check if the user has a specific role
userSchema.methods.hasRole = function(role) {
    return this.role === role;
};

const User = mongoose.model("User", userSchema);
export default User;
