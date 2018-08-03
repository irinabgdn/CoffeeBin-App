import React, { Component } from 'react'

import sortBy from 'sort-by'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'

import VenuesList from './components/VenuesList'

// import VenueErrorBoundary from './components/VenueErrorBoundary'

class VenueSearch extends Component {
    state = {
        query: ""
    }

    static propTypes = {
        venues: PropTypes.array.isRequired,
        filteredVenues: PropTypes.array.isRequired
    }

    updateFilter = (query) => {
        if (query) {
            this.setState({ query })
            const match = new RegExp(escapeRegExp(query), 'i')

            this.setState({
                filteredVenues: this.state.venues.filter(venue => match.test(venue.name).sort(sortBy('name')))
            })
        } else {
            this.setState({
                query: "",
                filteredVenues: this.state.venues
            })
        }
    }

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
                        value= {this.state.query}
                        onChange= {(e) => this.updateFilter(e.target.value)}
                    />
                </div>
                {/* <VenueErrorBoundary venuesError={this.props.venuesError}> */}
                <VenuesList 
                    venues = {this.props.filteredVenues}
                    updateFilter = {this.updateFilter}
                    toggleInfo = {this.props.toggleInfo}
                />
                {/* </VenueErrorBoundary> */}
            </nav>
        )
    }
}

export default VenueSearch