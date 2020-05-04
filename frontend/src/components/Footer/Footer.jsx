import React from "react";
import "./Footer.css";
import Instagram from "./image/instagram.png"
import Fb from "./image/fb.png"
import Visa from "./image/visa.png"
import American from "./image/americanexpress.png"
import Cabal from "./image/cabal.png"
import Maestro from "./image/maestro.png"
import Master from "./image/mastercard.png"



export default function Footer(){
    return(
<div className ="Footer">
<div className ="container-fluid px-md-5">
<div className ="row element-footer">
<div className ="col-md mb-4">
              <h5 className="Text">Tabaqueria Las Antillas</h5>
        <p>Rivadavia 214B1642CEF San Isidro, Buenos Aires, Argentina</p>
    </div>
  <div className ="col-md mb-4">
        <h5 className="Text">Contactános</h5>
        <p>Mail: lasantillas.tabaqueria@gmail.com</p><br/>
        <p>Tel: +54 11-6354-0045</p>
        </div>
        <div className ="col-md mb-4">
        <h5 className="Text">Sigamos Conectados</h5>
        <a  href="https://www.instagram.com/tabaqueria.lasantillas/"><img className = "Icon"   src={Instagram} alt="" /></a>
        <a  href="https://www.facebook.com/Las-Antillas-Tabaqueria-679131215792588/"><img className = "Icon" src={Fb} alt="" /></a>
      </div>
      </div>
      </div>
      <div className="divider mb-5"></div>
      <div className ="container-fluid px-md-5">
      <div className ="row element-footer">
      <div className ="col-md-8">
      <div className ="footer-payments-shipping-logos">
      <div className ="row mb-4">
      <div className ="col mb-4">
      <h5 className="Text">Medios de pago</h5>
      </div>
      <div className ="col mb-8">
      <img className ="Payment-logos" src={Visa}></img>
      <img className ="Payment-logos" src={Cabal}></img>
      <img className ="Payment-logos" src={Maestro}></img>
      <img className ="Payment-logos" src={Master}></img>
      <img className ="Payment-logos" src={American}></img>
    </div>  
  </div>
  </div>
</div>
</div>
</div>
<div className ="Last-footer">
<div className ="Last-footer" className ="container-fluid px-md-5">
<div className ="Last-footer" className ="row">   
<div className ="Last-footer">Copyright Tabaqueria Las Antillas - 2020. Todos los derechos reservados.
</div>
</div>
</div>
</div>
</div>
    )
}