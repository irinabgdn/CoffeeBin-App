import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Catch errors from Geosuggest address search
class MapErrorBoundary extends Component {
    static propTypes = {
        mapsError: PropTypes.bool,
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
                <h1>Trouble loading the map..</h1>
                <p>Did you add the Google Maps API credentials in App.js? If not, please do so. Else Google Maps is probably out of reach or your network connection is lost :(</p>
            </div>
        )
    }

    render() {
        if (this.gotError || this.props.mapsError) {
            return this.showErrorMessage()
        }
        return this.props.children
    }
}

export default MapErrorBoundary