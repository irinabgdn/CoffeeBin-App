import React, { Component } from 'react'

import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

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
    defaultZoom: 14.5,

    // Venues lists
    venues: [],
    filteredVenues: [],
    selectedVenue: {},
    query: "",

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
 
  }

  updateLocation = () => {
    this.getVenues(this.state.location)
  }

  toggleInfo = (venue) => {
    this.setState({
      selectedVenue: venue,
    })
    console.log(this.state.selectedVenue)
  }

  updateFilter = (query) => {
    if (query) {
        this.setState({ query })
        const match = new RegExp(escapeRegExp(query), 'i')
        let sorted = this.state.venues.filter(venue => match.test(venue.name)).sort(sortBy('name'))
        this.setState({
            filteredVenues: sorted
        })
        
        console.log(this.state.filteredVenues)
    } else {
        this.setState({
            query: "",
            filteredVenues: this.state.venues
        })
    }
}


  render() {
    return (
      <div className="App">
        <Header/>
        <VenueSearch
          venues = {this.state.venues}
          filteredVenues = {this.state.filteredVenues}
          query = {this.state.query}
          updateFilter = {this.updateFilter}
          toggleInfo = {this.toggleInfo}
        />
        <Map
          isMarkerShown
          venues = {this.state.filteredVenues}
          location = {this.state.location}
          selectedVenue = {this.state.selectedVenue}
          zoom = {this.state.defaultZoom}
          toggleInfo = {this.toggleInfo}
        />
      </div>
    )
  }
}

export default App
