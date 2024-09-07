import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImage] = useState(null); // Store file object
  const [previewImage, setPreviewImage] = useState(''); // For previewing image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('img', img); // Append image file to FormData

    axios.post('http://localhost:5000/api/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response.data);
        setTitle('');
        setAuthor('');
        setCategory('');
        setDescription('');
        setPrice('');
        setImage(null);
        setPreviewImage(''); // Clear image preview after submission
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
