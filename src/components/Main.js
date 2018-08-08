import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Map from '../components/Map'

const Main = props =>
    <main className="main-container">
        <Map
            venues = {this.props.venues}
            location = {this.props.location}
            selectedVenue = {this.props.selectedVenue}
            zoom = {this.props.zoom}
            toggleInfo = {this.props.toggleInfo}
        />
    </main>

Main.propTypes = {
    venues: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.object.isRequired,
    selectedVenue: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    toggleInfo: PropTypes.func.isRequired
}

export default Main