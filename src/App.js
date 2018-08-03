import React, { Component } from 'react'
// import logo from './logo.svg'
import Header from './components/Header'
import Map from './components/Map'
import VenueSearch from './components/VenueSearch'

import './App.css'

// Insert here your Foursquare API keys
const foursquare = require('react-foursquare')({
  clientID: 'VQEYYWX5BH511OPRHTBCKV5XCRXUHWI3UY5IVRZTZQ3XTDQO',
  clientSecret: '2FPVGCFNUYX3KJUVSYC2UZABT2RYUFUSYPJV1BQYFUVS3LBW'
})


class App extends Component {
  state = {
    // Default address
    location: {lat: 46.7697071, lng: 23.5828261}, 
    zoom: 14.5,

    // Venues lists
    venues: [],
    filteredVenues: [],
    selectedVenue: {},

    // Catch errors
    venuesError: false,
    mapsError: false
  }
  
  componentDidMount() {
    this.getVenues(this.state.location);
  }
  
  getVenues = (location) => {
    // Set parameters to use in the Foursquare API call.
    const params = {
      // Set current location in foursquare search
      'll': `${location.lat}, ${location.lng}`,
      // Search for cafes
      'section': 'coffee',
      // Get maximum 30 locations
      'limit': 30
    }

    // Get venues from Foursquare
    foursquare.venues.explore(params)
    .then(r => {
      r.response.groups[0].items.map(item => {
        return this.setState({
          venues: this.state.venues.concat([item.venue]),
          filteredVenues: this.state.filteredVenues.concat([item.venue])
        })
      })
    }).catch(error => {return this.setState({venuesError: true})})
    
    // Set venues ids
    let i=0
    this.state.venues.foreach(venue => {
      venue.id = i
      i++
    })
  }

  updateLocation = () => {
    this.getVenues(this.state.location)
  }

  toggleInfo = (item) => {
    this.setState({
      venue: item
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <VenueSearch
          venues = {this.state.venues}
          filteredVenues = {this.state.filteredVenues}
          toggleInfo = {this.toggleInfo}
        />
        <Map
          venues = {this.state.venues}
          location = {this.state.location}
          selectedVenue = {this.state.selectedVenue}
        />
      </div>
    )
  }
}

export default App
