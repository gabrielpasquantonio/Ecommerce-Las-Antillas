import React from "react";
import "./Thumbnails.css";
import Foto1 from "./img/f1.jpg";
import Foto2 from "./img/f2.jpg";
import Foto3 from "./img/f3.jpg";

export default function ThumbNail() {

  return (
  <div id="principal">
    <div className="col-12 text-center">
     <h3> Destacados </h3>
     </div>

     <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
       <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
  
  <div className="carousel-inner">
    <div className="carousel-item active img-fluid">
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
      </div>
    
    </div>
    
    {/* <div className="carousel-item img-fluid ">
      <img src={Foto2} className="d-block w-100 " alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Habano</h5>
        <p>Montecristo N°2</p>
        <p>$1.000</p>
        <button type="button" className="btn btn-dark btn-lg btn-block">Agregar al Carrito</button>
      </div>
    </div>
    <div className="carousel-item  img-fluid">
      <img src={Foto3} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Habano</h5>
        <p>Montecristo N°3</p>
        <p>$1.000</p>
        <button type="button" className="btn btn-dark btn-lg btn-block">Agregar al Carrito</button>
      </div>
    </div> */}
  </div>
  <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>



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




   
    </div> //Aca termina el Div que nos permite usar react
  )
}

