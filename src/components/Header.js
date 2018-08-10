import React from 'react';
import logo from '../img/coffeebinlogo.svg';
import PropTypes from 'prop-types';

const Header = props =>
    <header className="header">
        <button className="btn" type="button"
                aria-label="Click to toggle cafe filter"
                tabIndex="0" 
                aria-controls="navigation" 
                aria-haspopup="listbox"
                onClick={props.toggleSidebarVisibility}
                onKeyPress={props.toggleNavVisibility}>
            <i className="fa fa-search"></i>
        </button>
        <div className="app-name">
            <h1 className="app-title">CoffeeBin</h1>
            <img src={logo} className="app-logo" width="48px" height="48px" alt="CoffeBin Logo"/>
        </div>
    </header>

Header.propTypes = {
    toggleSidebarVisibility: PropTypes.func.isRequired
}
export default Header