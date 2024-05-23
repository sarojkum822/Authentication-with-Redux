import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../auth/productSlice'; // Ensure the correct path to productSlice

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.product);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(productList());
        }
    }, [dispatch, status]);

    let content;

    if (status === 'loading') {
        content = <p className="text-center text-xl">Loading...</p>;
    } else if (status === 'succeeded') {
        content = (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {products.map((product) => (
                    <div key={product._id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
                        <img className="w-full h-48 object-cover mb-4" src={product.imageUrl} alt={product.name} />
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="font-semibold mb-2">Price: ${product.price}</p>
                        <p className="text-gray-600 mb-2">Category: {product.category}</p>
                        <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
                        <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
                    </div>
                ))}
            </div>
        );
    } else if (status === 'failed') {
        content = <p className="text-center text-red-500 text-xl">{error}</p>;
    }

    return (
        <section className="container mx-auto my-8">
            <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
            {content}
        </section>
    );
};

export default ProductList;
