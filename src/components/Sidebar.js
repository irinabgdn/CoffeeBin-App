import React from 'react'

import PropTypes from 'prop-types'

import VenueSearch from '../components/VenueSearch'
import AddressSearch from '../components/AddressSearch'
import AddressErrorBoundary from '../components/AddressErrorBoundary'

const Sidebar = props => 
    <nav className='sidebar-navigation'>
        <AddressErrorBoundary addressError={props.addressError}>
            <AddressSearch 
                updateLocation = {props.updateLocation}
            />
        </AddressErrorBoundary>
        <VenueSearch
            venues = {props.venues}
            filteredVenues = {props.filteredVenues}
            query = {props.query}
            updateFilter = {props.updateFilter}
            toggleInfo = {props.toggleInfo}
            venuesError = {props.venuesError}
        />
    </nav>

Sidebar.proptypes = {
    addressError: PropTypes.bool.isRequired,
    updateLocation: PropTypes.func.isRequired,

    venuesError: PropTypes.func.isRequired,
    venues: PropTypes.array.isRequired,
    filteredVenues: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    updateFilter: PropTypes.func.isRequired,
    toggleInfo: PropTypes.func.isRequired
}

export default Sidebar