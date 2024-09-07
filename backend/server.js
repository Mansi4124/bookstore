const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); // Add this line at the top

const cors = require('cors');
// const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const authroutes=require('./routes/auth')
const app = express();
const path=require('path')

app.use(cors({
  credentials: true, // Enable credentials (cookies, sessions)
  origin: 'http://localhost:3000' // Make sure this is your React frontend URL
}));

app.use(express.json());
console.log(__dirname)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/books', bookRoutes);
app.use(session({
  secret: 'mysecretkey', // Use a strong key for production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // In production, set to true if using HTTPS
}));
app.use('/api/users', authroutes);
mongoose.connect('mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
