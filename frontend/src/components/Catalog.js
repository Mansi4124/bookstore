import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './Catalog.css';

const Catalog = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="catalog">
      <h2>Book Catalog</h2>
      <div className="card-container">
        {books.map(book => (
          <Card key={book._id} className="book-card">
            <Card.Img variant="top" src={book.image_url} />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>{book.description}</Card.Text>
              <Button variant="primary" href={`/book/${book._id}`}>View Details</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
