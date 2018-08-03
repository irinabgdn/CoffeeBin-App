import React from 'react'
import PropTypes from 'prop-types'

import Venue from '../components/Venue'

const VenuesList = (props) => (
    <div className="venue-list-container">
        <div className="venue-list-title">
            <h2>Your search results</h2>
        </div>

        <ul className="venue-list-content">
            {props.venues
                .map(venue => (
                    <li key={venue.id}>
                        <Venue 
                            venue = {venue}
                            toggleInfo= {props.toggleInfo}
                        />
                    </li>
                ))}
        </ul>
    </div>
)

VenuesList.propTypes = {
    venues: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleInfo: PropTypes.func.isRequired
}

export default VenuesList