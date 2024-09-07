import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import './ViewDetails.css';

const ViewDetails = () => {
  const { id } = useParams(); // get book ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch book details by ID
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        console.log(response);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className="view-details-container">
      <Card className="book-details-card mb-5">
        <div className="book-details-flex">
          <Card.Img
            variant="top"
            src={`http://localhost:5000/${book.img}`}
            alt={book.title}
            className="book-img"
          />
          <div className="book-info">
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>
                <strong>Author:</strong> {book.author}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {book.description}
              </Card.Text>
             
             
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewDetails;
