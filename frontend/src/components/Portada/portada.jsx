import React from "react";
import "./portada.css";
import FotoPortada from "./img/fotoPortada.jpeg";
//import FotoPortada2 from "./img/fotoPortada2.jpg";

export default function Portada() {
  return (
  <div>
    <div className="background-image">
      
      <div className="card-body col-12 col-sm-9 col-md-8 col-lg-5">
        <h5 className="slogan"> Classe y Estilo</h5>
        <h2 className="card-title h2portada">Tabaqueria Las Antillas</h2>
        <h5 className="card-text h5portada">Toda la diversidad y sofisticación del mundo del tabacco en un solo sitio!</h5>
        <a className="compre" href="#" tabindex="0">Compre Ahora!</a>
    </div>
    </div>
  </div>
  );
}
