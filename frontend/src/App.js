import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Login from './components/Login';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import About from './components/About'
import BookList from './components/Booklist';
import AddBook from './components/AddBook';
import ViewDetails from './components/ViewDetails'
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/books/:id" element={<ViewDetails />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/signup" element={<SignUp/>}/>

      </Routes>
    </Router>
  );
}

export default App;
