import React from 'react'
// import VenuesList from './components/VenuesList'

import PropTypes from 'prop-types'
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    InfoWindow,
    Marker
} from "react-google-maps";

const Map = compose(
    withProps({
        // Insert your Google Maps API Key here
        googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyALK8Ns0VjwYiaUdgufSGahJlEbXRUWr18&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100vh` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100vh` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap 
        defaultZoom={props.zoom} 
        defaultCenter={props.location}>

        {props.isMarkerShown && props.venues.map(venue => {
            return (                
                <Marker 
                    key={venue.id}
                    position={{lat: Number(venue.location.lat), lng: Number(venue.location.lng)}}
                    title={venue.name}
                    // animation= {google.maps.Animation.DROP}
                    onClick={() => props.toggleInfo(venue)}
                >
                
                {props.selectedVenue.id === venue.id &&
                    <InfoWindow
                        onCloseClick={() => props.toggleInfo(venue)}>

                        <div className="info-window" tabIndex="0">
                            <h1>{venue.name}</h1>
                            <p>{venue.description}</p>
                            <p>{venue.location.address}</p>
                        </div>
                    </InfoWindow>
                }
                </Marker>
            )
        })
        }
    </GoogleMap>
))

Map.propTypes = {
    venues: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.object.isRequired,
    selectedVenue: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    toggleInfo: PropTypes.func.isRequired
}
export default Map