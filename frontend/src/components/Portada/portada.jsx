import React from "react";
import "./portada.css";
import FotoPortada from "./img/fotoPortada.jpeg";
//import FotoPortada2 from "./img/fotoPortada2.jpg";

export default function Portada() {
  return (
  <div>
    <div className="card mb-3">
      <img src={FotoPortada} className="card-img-top2" alt="Foto de portada"></img>
      <div className="card-body">
        <h5 className="card-title">Bienvenido a tabaqueria Las Antillas</h5>
        <p className="card-text">En nuestro sitio encontraran la mas variedad cantidad y calidad de productos vinculados al refinado mundo de la tabaquera.</p>
    </div>
    </div>
  </div>
  );
}
