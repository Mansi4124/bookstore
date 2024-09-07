import React from 'react';
import { Carousel, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

import img1 from '../assests/Library_Illustration_1.c54dafea582d6757c53e.jpg';
import img2 from '../assests/b2.jpeg';
import img3 from '../assests/b3.webp';
import img4 from '../assests/b4.jpg';
import img5 from '../assests/b5.jpg';
import img6 from '../assests/b6.webp';
import img7 from '../assests/thegreat.jpeg';
import img8 from '../assests/1984.jpeg';
import img9 from '../assests/kill.jpeg';
import history from '../assests/history.jpg';
import fiction from '../assests/fiction.jpeg';
import love from '../assests/love.jpeg';
import science from '../assests/science.jpg';
import travel from '../assests/travel.jpg';
import philo from '../assests/philo.jpeg';

const Home = () => {
  const navigate = useNavigate(); // Define navigate using useNavigate hook

  const categories = [
    { name: 'Fiction', img: fiction, description: 'Dive into imaginative worlds and captivating storytelling.',  },
    { name: 'Science', img: science, description: 'Discover the wonders of the universe and the natural world.', },
    { name: 'Philosophy', img: philo, description: 'Explore the fundamental questions of existence, reality, and ethics.', },
    { name: 'Travel', img: travel, description: 'Embark on journeys to faraway places and exotic destinations.',},
    { name: 'Love', img: love, description: 'Stories and insights about love, relationships, and human connections.', },
    { name: 'History', img: history, description: 'Uncover the events and people that shaped our world.',}
  ];
  

  return (
    <div className="home">
      {/* Carousel Section */}
      <Carousel className="carousel-container">
        <Carousel.Item>
          <img
            className="d-block w-100 cimg"
            src={img1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Discover Your Next Favorite Book</h3>
            <p>Explore a wide range of genres and find your next read.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 cimg"
            src={img2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Best Sellers</h3>
            <p>Check out the top-selling books and bestsellers of the month.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 cimg"
            src={img3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>New Arrivals</h3>
            <p>Be the first to read the latest releases and new arrivals.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Bookstore Features Section */}
      <div className="store-details">
        <h2>Why Choose Our Bookstore?</h2>
        <div className="card-container">
          <Card className="feature-card">
            <Card.Body>
              <Card.Title>Wide Selection</Card.Title>
              <Card.Text>
                We offer a diverse range of books, from classic literature to the latest bestsellers.
              </Card.Text>
              <img src={img4} alt='not found' className='card-img'/>
            </Card.Body>
          </Card>
          <Card className="feature-card">
            <Card.Body>
              <Card.Title>Great Deals</Card.Title>
              <Card.Text>
                Enjoy exclusive discounts and offers on your favorite books.
              </Card.Text>
              <img src={img5} alt='not found' className='card-img'/>
            </Card.Body>
          </Card>
          <Card className="feature-card">
            <Card.Body>
              <Card.Title>Community Events</Card.Title>
              <Card.Text>
                Participate in book signings, readings, and other exciting events.
              </Card.Text>
              <img src={img6} alt='not found' className='card-img'/>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Popular Books Section */}
     {/* Popular Books Section */}
     <div className="popular-books">
  <h2>Popular Books</h2>
  <div className="card-container">
    <Card className="book-card">
      <Card.Img variant="top" src={img7} className="p-img" />
      <Card.Body>
        <Card.Title>The Great Gatsby</Card.Title>
        <Card.Text>
          A classic novel by F. Scott Fitzgerald, exploring themes of decadence and idealism.
        </Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
    
    <Card className="book-card">
      <Card.Img variant="top" src={img8} className="p-img" />
      <Card.Body>
        <Card.Title>1984</Card.Title>
        <Card.Text>
          George Orwell's dystopian masterpiece about surveillance and totalitarianism.
        </Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
    
    <Card className="book-card">
      <Card.Img variant="top" src={img9} className="p-img" />
      <Card.Body>
        <Card.Title>To Kill a Mockingbird</Card.Title>
        <Card.Text>
          Harper Lee's Pulitzer Prize-winning novel on racial injustice and moral growth.
        </Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  </div>
</div>



      {/* Category Section */}
      <div className="category-section">
        <h2>Categories</h2>
        <Row>
          {categories.map((category, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card onClick={() => navigate('/books')} className="category-card" style={{ cursor: 'pointer' }}>
                <Card.Img variant="top" src={category.img} alt={category.name} />
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Text>{category.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
