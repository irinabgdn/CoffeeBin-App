import React from 'react'

import PropTypes from 'prop-types'
import { compose, withProps } from "recompose"
import {
    withGoogleMap,
    GoogleMap,
    InfoWindow,
    Marker
} from "react-google-maps"

/*global google*/

const Map = compose(
    withProps({
        loadingElement: <div style={{ height: `100vh` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withGoogleMap
)(props => (
    <GoogleMap 
        defaultZoom={props.zoom} 
        center={props.location}
        onTilesLoaded={()=>{
            let map = document.querySelector('iframe')
            map.setAttribute('title','Cafés Map')
        }}
    >

        {props.isMarkerShown && props.venues.map(venue => {
            return (                
                <Marker 
                    key={venue.id}
                    position={{lat: Number(venue.location.lat), lng: Number(venue.location.lng)}}
                    title={venue.name}
                    defaultAnimation= {google.maps.Animation.DROP}
                    onClick={() => props.toggleInfo(venue)}
                    
                    
                >
                
                {props.selectedVenue.id === venue.id &&
                    <InfoWindow
                        onCloseClick={() => props.toggleInfo(venue)}>

                        <div className="info-window" tabIndex="0">
                            <h1>{venue.name}</h1>
                            <p>{venue.description}</p>
                            {/* <img></img> */}
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