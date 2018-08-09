import React, { Component} from 'react';

import PropTypes from 'prop-types';

import VenueSearch from '../components/VenueSearch';
import AddressSearch from '../components/AddressSearch';
import AddressErrorBoundary from '../components/AddressErrorBoundary';

class Sidebar extends Component { 
    render() {
        if (this.props.sidebarVisible) {
            return (
                <nav className='sidebar-navigation'>
                    <AddressErrorBoundary addressError={this.props.addressError}>
                        <AddressSearch 
                            updateLocation = {this.props.updateLocation}
                        />
                    </AddressErrorBoundary>
                    <VenueSearch
                        venues = {this.props.venues}
                        filteredVenues = {this.props.filteredVenues}
                        query = {this.props.query}
                        updateFilter = {this.props.updateFilter}
                        toggleInfo = {this.props.toggleInfo}
                        venuesError = {this.props.venuesError}
                    />
                </nav>
            )
        } else {
            return null
        }
    }
}

Sidebar.proptypes = {
    sidebarVisible: PropTypes.bool.isRequired,
    
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