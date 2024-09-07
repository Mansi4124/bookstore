import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Booklist.css";
import axios from "axios";
import {
  Card,
  Button,
  Row,
  Col,
  ListGroup,
  Modal,
  Form,
  Toast,
} from "react-bootstrap";
import Cart from "./Cart";
import img10 from "../assests/b8.jpeg";
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  // Fetch books and categories when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);

        // Extract categories from books
        const uniqueCategories = [
          ...new Set(response.data.map((book) => book.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error(error));
  }, []);

  // Filter books based on selected category
  const filterByCategory = (category) => {
    if (category === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) => book.category === category);
      setFilteredBooks(filtered);
    }
    setSelectedCategory(category);
  };

  // Open the quantity selection modal
  const handleAddToCartClick = (book) => {
    setSelectedBook(book);
    setQuantity(1);
    setShowQuantityModal(true);
  };

  // Add book to cart
  const addToCart = () => {
    setCart((prevCart) => {
      const existingBook = prevCart.find(
        (item) => item._id === selectedBook._id
      );
      if (existingBook) {
        // Increase quantity if book already in cart
        return prevCart.map((item) =>
          item._id === selectedBook._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new book to cart
        return [...prevCart, { ...selectedBook, quantity }];
      }
    });
    setShowQuantityModal(false);
    setShowToast(true); // Show toast message
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Count total items in cart
  const cartItemCount = cart.length;
  return (
    <div className="book-list-container">
      {/* Sidebar for Category Filter */}
      <div className="sidebar">
        <h3>Categories</h3>
        <ListGroup>
          <ListGroup.Item
            active={selectedCategory === ""}
            onClick={() => filterByCategory("")}
            style={{ cursor: "pointer" }}
          >
            All
          </ListGroup.Item>
          {categories.map((category, index) => (
            <ListGroup.Item
              key={index}
              active={selectedCategory === category}
              onClick={() => filterByCategory(category)}
              style={{ cursor: "pointer" }}
            >
              {category}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      {/* Book List */}
      <div className="book-list">
        <h1>Book List</h1>

        <Row>
          {filteredBooks.map((book) => (
            <Col md={5} key={book._id} className="mb-4">
            
              <Card className="book-card">
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/${book.img}`}
                  alt={book.title}
                  className="bimg"
                />

                <Card.Body className="cbody">
                  <Card.Title className="ctitle">{book.title}</Card.Title>
                  {/* <Card.Text>{book.description.substring(0, 100)}...</Card.Text> */}
                  <Card.Text className="cprice">Price: ₹{book.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCartClick(book)}
                    className="btn view1"
                  >
                    Add to Cart
                  </Button>
                  <Link
                    to={`/books/${book._id}`}
                    className="btn btn-secondary mb-5 view"
                   
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Cart Button with Badge */}
      <Button onClick={toggleCart} className="cart-button ">
        {showCart ? "Hide Cart" : "Show Cart"}
        {cartItemCount > 0 && (
          <span className="badge bg-danger position-absolute top-0  start-100 translate-middle rounded-pill">
            {cartItemCount}
          </span>
        )}
      </Button>

      {/* Cart Component */}
      {showCart && <Cart cart={cart} setCart={setCart} />}

      {/* Quantity Selection Modal */}
      <Modal
        show={showQuantityModal}
        onHide={() => setShowQuantityModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook && (
            <>
              <p>{selectedBook.title}</p>
              <Form>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min=""
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowQuantityModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={addToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body>Book added to cart!</Toast.Body>
      </Toast>
    </div>
  );
};

export default BookList;
