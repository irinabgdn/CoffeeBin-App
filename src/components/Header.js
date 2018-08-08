import React from 'react'
import logo from '../img/coffeebinlogo.svg'

const Header = props =>
    <header className="header">
            <img src={logo} className="app-logo" width="48px" height="48px" alt="CoffeBin Logo"/>

            <h1 className="App-title">CoffeeBin</h1>
            <button className="menu-button" type="button"
                    aria-label="Menu" aria-controls="navigation" aria-expanded={true/false}>
                <span className="menu-box">
                    <span className="menu-inner"></span>
                </span>
                <span className="menu-label">Menu</span>
            </button>
    </header>

export default Header