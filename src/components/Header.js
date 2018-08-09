import React from 'react';
import logo from '../img/coffeebinlogo.svg';
import PropTypes from 'prop-types';

const Header = props =>
    <header className="header">
        <div className="app-name">
            <img src={logo} className="app-logo" width="48px" height="48px" alt="CoffeBin Logo"/>
            <h1 className="app-title">CoffeeBin</h1>
        </div>
        <button className="btn" type="button"
                aria-label="Menu" aria-controls="navigation" aria-expanded={true/false}
                onClick={props.toggleSidebarVisibility}>
            <i className="fa fa-bars"></i>
        </button>
    </header>

Header.propTypes = {
    toggleSidebarVisibility: PropTypes.func.isRequired
}
export default Header