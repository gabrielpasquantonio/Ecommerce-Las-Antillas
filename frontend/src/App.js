import React from 'react';
import './App.css';
import Header from './components/NavBar/NavBar.jsx'
import Footer from './components/Footer/Footer.jsx'
import ThumbNail from './components/Thumbnails/Thumbnail';
import Descuento from './components/Descuento/Descuento';
function App() {
  return (
  <> 
  <Header/>
  <ThumbNail/>
  <Descuento/>
  <Footer />
    
  </>
  );
}

export default App;
