import React from "react";
import "./NavBar.css";
import Logo from "./image/logo.png"
import Login from "./image/login.png"
import Search from "./image/search.png"
import Car from "./image/car.png"

export default function navBar() {

    return (
        <div className="App">
            <div className="main">
                <div className="header-bottom js-fixed hd-fixed">
                    <div className="container-fluid my-container">
                        <div className="row js-compare">
                            <div className="header-left col-lg-3">
                                <a href="#">
                                    <img className="Logo" src={Logo}></img>
                                </a>
                            </div>
                            <div className="header-center col-lg-6 js-dad position-relative">
                                <nav className="navbar navbar-expand-lg">
                                    <div id="navbarsupportedcontent" className="collapse navbar-collapse">
                                        <ul className="navbar-nav">

                                            <li className="nav-item">
                                                <a className="nav-link" href="#"> <span>Home</span></a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"><span> Habanos </span></a>
                                                <div className="dropdown-menu1" >
                                                    <a className="dropdown-item" href="#">Habano A</a>
                                                    <a className="dropdown-item" href="#">Habano B</a>
                                                    <a className="dropdown-item" href="#">Habano C</a>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"><span> Cigarros </span></a>
                                                <div className="dropdown-menu1">
                                                    <a className="dropdown-item" href="#">Cigarro A</a>
                                                    <a className="dropdown-item" href="#">Cigarro B</a>
                                                    <a className="dropdown-item" href="#">Cigarro C</a>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"><span> Pipas </span></a>
                                                <div className="dropdown-menu1">
                                                    <a className="dropdown-item" href="#">Pipa A</a>
                                                    <a className="dropdown-item" href="#">Pipa B</a>
                                                    <a className="dropdown-item" href="#">Pipa C</a>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"> <span>Acessorios</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>

                            <div className="header-right col-lg-3 justify-content-lg-end">
                                <div className="language text-uppercase">
                                    <a href="#">eng</a>
                                </div>
                                <div className="acount">

                                    <a href="#">
                                        <img className="login" src={Login}></img></a>

                                    <ul className="account-selection list-unstyled">
                                        <div className="testando">
                                            <li>
                                                <a href="#" >"Log in"</a>
                                                <a href="#" >"Register"</a>
                                            </li>
                                        </div>
                                    </ul>
                                </div>

                                <div className="Search">
                                    <a href="#">
                                        <img className="imagem" src={Search}></img>
                                    </a>
                                </div>
                                <div className="js-minicart d-flex mini-cart">
                                    <a href="#">
                                        <img className="Car" src={Car}></img>
                                    </a>
                                    <span class="minicart-bag-number enj-cartcount">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
