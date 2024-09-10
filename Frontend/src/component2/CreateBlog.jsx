import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const farmerId = localStorage.getItem('FarmerId');
        if (!farmerId) {
            alert('No farmer ID found in localStorage');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/blogs', {
                title,
                description,
                author: farmerId
            });
            console.log('Blog created:', response.data);
            setTitle('');
            setDescription('');
            navigate('/blogsList');
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Blog</button>
            </form>
        </div>
    );
};

export default CreateBlog;