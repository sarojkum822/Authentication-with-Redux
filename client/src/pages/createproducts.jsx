import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        stock: '',
        image: null
    });

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log(userData);

        // Check if user is admin
        if (userData && userData.role === 'admin') {
            setIsAdmin(true);
        } else {
            // Redirect non-admin users
            toast.error("You are not an admin");
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:8080/api/products/createProduct', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log(response.data);
            toast.success("Product created successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create product.");
        }
    };

    if (!isAdmin) {
        return null; // Or display a loading indicator
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-full max-w-md'>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <h2 className='text-2xl font-bold mb-6 text-center'>Create Product</h2>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Name" 
                        required 
                        className='mb-4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300'
                    />
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        placeholder="Description" 
                        required 
                        className='mb-4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300'
                    />
                    <input 
                        type="number" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        placeholder="Price" 
                        required 
                        className='mb-4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300'
                    />
                    <input 
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        placeholder="Category" 
                        required 
                        className='mb-4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300'
                    />
                    <input 
                        type="text" 
                        name="brand" 
                        value={formData.brand} 
                        onChange={handleChange} 
                        placeholder="Brand" 
                        required 
                        className='mb-4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300'
                    />
                    <input 
                        type="number" 
                        name="stock" 
                        value={formData.stock} 
                        onChange={handleChange} 
                        placeholder="Stock" 
                        required 
                        className='mb-4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300'
                    />
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleFileChange} 
                        required 
                        className='mb-4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300'
                    />
                    <button 
                        type="submit" 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
