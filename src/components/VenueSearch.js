import React, { Component } from 'react'

import PropTypes from 'prop-types'

import VenuesList from '../components/VenuesList';

// import VenueErrorBoundary from './components/VenueErrorBoundary'

class VenueSearch extends Component {

    render() {
        return (
            <nav className="navigation">
                <div role="search">
                    <label htmlFor="filter">Filter cafés</label>
                    <input 
                        type="text"
                        className="filter-input"
                        name="filter"
                        placeholder="Filter cafés"
                        value= {this.props.query}
                        onChange= {(e) => this.props.updateFilter(e.target.value)}
                    />
                </div>
                {/* <VenueErrorBoundary venuesError={this.props.venuesError}> */}
                    <VenuesList
                        venues = {this.props.filteredVenues}
                        toggleInfo = {this.props.toggleInfo}
                    />
                {/* </VenueErrorBoundary> */}
            </nav>
        )
    }
}
VenueSearch.propTypes = {
    venues: PropTypes.array.isRequired,
    filteredVenues: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    updateFilter: PropTypes.func.isRequired,
    toggleInfo: PropTypes.func.isRequired
}

export default VenueSearch