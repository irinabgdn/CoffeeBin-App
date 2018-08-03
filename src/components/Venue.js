import React from 'react'
import PropTypes from 'prop-types'

const Venue = (props) => {
    <div className="venue-name"
        onClick = {() => props.toggleInfo(props.venue)}
        tabIndex = "0">
    {props.venue.name}
    </div>   

}

Venue.propTypes = {
    venue = PropTypes.object.isRequired,
    toggleInfo = PropTypes.func.isRequired
}

export default Venue