import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        unique: true // Ensuring product names are unique
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Product brand is required'],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        min: [0, 'Product stock cannot be negative'],
        default: 0
    },
    imageUrl: {
        type: String,
        required: [true, 'Product image URL is required'],
        trim: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Middleware to update updatedAt field
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Calculate the rating and number of reviews whenever a review is added or updated
productSchema.methods.calculateRating = function() {
    if (this.reviews.length > 0) {
        const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        this.rating = totalRating / this.reviews.length;
        this.numReviews = this.reviews.length;
    } else {
        this.rating = 0;
        this.numReviews = 0;
    }
};

reviewSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

reviewSchema.post('save', async function() {
    const product = await this.model('Product').findById(this.parent()._id);
    product.calculateRating();
    await product.save();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
