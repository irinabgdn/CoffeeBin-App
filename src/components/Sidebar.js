import React, { Component} from 'react';

import PropTypes from 'prop-types';

import VenueSearch from '../components/VenueSearch';

class Sidebar extends Component { 
    render() {
        return (
            <nav className='sidebar-navigation'>
                
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
    }
}

Sidebar.proptypes = {    
    // addressError: PropTypes.bool.isRequired,
    // updateLocation: PropTypes.func.isRequired,

    venuesError: PropTypes.func.isRequired,
    venues: PropTypes.array.isRequired,
    filteredVenues: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    updateFilter: PropTypes.func.isRequired,
    toggleInfo: PropTypes.func.isRequired,
    toggleSidebarVisibility: PropTypes.func.isRequired
}

export default Sidebar