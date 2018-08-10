import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Catch errors from Geosuggest address search
class AddressErrorBoundary extends Component {
    static propTypes = {
        addressError: PropTypes.bool,
        children: PropTypes.node
    }

    state = {
        gotError: false
    }

    componentDidCatch(error, info) {
        this.setState({
            gotError: true
        })
    }

    showErrorMessage = () => {
        return (
            <div className="error-container">
                <h1>Trouble finding the city you're searching for..</h1>
                <p>Did you add the Google Maps API credentials in App.js? If not, please do so. Else Google Maps is probably out of reach or your network connection is lost :(</p>
            </div>
        )
    }

    render() {
        if (this.gotError || this.props.addressError) {
            return this.showErrorMessage();
        }
        return this.props.children;
    }
}

export default AddressErrorBoundary