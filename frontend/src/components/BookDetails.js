import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`/api/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <img src={book.image_url} alt={book.title} />
      <p>{book.description}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      {/* Add functionality for adding to cart or buying here */}
    </div>
  );
};

export default BookDetails;
