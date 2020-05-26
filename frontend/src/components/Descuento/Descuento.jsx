import React from "react";
import "./Descuento.css";
import Car from "./image/caminhao.png"
import Money from "./image/money.png"
import Safe from "./image/safe.png"
export default function Descuento() {
    return (

        <div>
            <div className="container-fluid px-md-5 box">
                <div className="row element-footer  ">
                    <div className="col-md mb-4 line1">
                        <img className="imagemdescuento" src={Car}></img>
                        <div className="content">
                            <h5 className="Text">Envíos gratis</h5>
                            <p>Para compras superiores a $3.000</p>
                        </div>
                    </div>
                    <div className="col-md mb-4 line1">
                        <img className="imagemdescuento" src={Money}></img>
                        <div className="content">
                            <h5 className="Text">10% Descuento</h5>
                            <p>Pagando con Débito o Efectivo</p>
                        </div>
                    </div>
                    <div className="col-md mb-4 line">
                        <img className="imagemdescuento" src={Safe}></img>
                        <div className="content">
                            <h5 className="Text">Sitio seguro</h5>
                            <p>Protegemos tus datos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}