import React from 'react';
import './App.css';
import Header from './components/NavBar/NavBar.jsx'
import Footer from './components/Footer/Footer.jsx'
import ThumbNail from './components/Thumbnails/Thumbnail';
import Descuento from './components/Descuento/Descuento';
import Portada from './components/Portada/portada.jsx';
function App() {
  return (
  <> 
  <Header/>
  <Portada/>
  <ThumbNail/>
  <Descuento/>
  <Footer />
    
  </>
  );
}

export default App;
