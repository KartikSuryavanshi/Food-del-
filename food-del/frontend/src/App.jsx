import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();  // useNavigate hook from react-router-dom

  // Function to handle navigation and show login popup
  const handleNavigation = (path) => {
    if (path === '/Cart') {
      // Navigate to Cart page and show login popup if not logged in
      setShowLogin(true);
      navigate(path);
    } else {
      // Navigate to other pages without showing login popup
      setShowLogin(false);
      navigate(path);
    }
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        {/* Pass setShowLogin to Navbar */}
        <Navbar handleNavigation={handleNavigation} setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Order' element={<PlaceOrder />} />
        </Routes>
      </div>
      {/* Conditionally render Footer based on current route */}
      {window.location.pathname !== '/Cart' && <Footer />}
    </>
  );
}

export default App;
