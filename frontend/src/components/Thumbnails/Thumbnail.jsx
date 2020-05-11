import React from "react";
import Foto1 from "./img/f1.jpg";
import Foto2 from "./img/f2.jpg";
import Foto3 from "./img/f3.jpg";

export default function ThumbNail() {
   
    return (

<div className="card-deck">
  <div className="card">
    <img src={Foto1} className="card-img-top" alt="..."></img>
    <div className="card-body">
      <h5 className="card-title">Habano</h5>
      <p className="card-text">Montecristo N°5.<br></br>$1.000</p>
    </div>
    <div className="card-footer">
    <button type="button" class="btn btn-dark btn-lg btn-block">Agregar al Carrito</button>
    </div>
  </div>
  <div className="card">
    <img src={Foto2} className="card-img-top" alt="..."></img>
    <div className="card-body">
      <h5 className="card-title">Habano</h5>
      <p className="card-text">Montecristo N°5.<br></br>$1.000</p>
    </div>
    <div className="card-footer">
    <button type="button" class="btn btn-dark btn-lg btn-block">Agregar al Carrito</button>
    </div>
  </div>
  <div className="card">
    <img src={Foto3} className="card-img-top" alt="..."></img>
    <div className="card-body">
      <h5 className="card-title">Habano</h5>
      <p className="card-text">Montecristo N°5.<br></br>$1.000</p>
    </div>
    <div className="card-footer">
    <button type="button" class="btn btn-dark btn-lg btn-block">Agregar al Carrito</button>
    </div>
  </div>
</div>
)
}

