import React, { Component } from 'react';

import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapErrorBoundary from './components/MapErrorBoundary';
import Map from './components/Map';
import Footer from './components/Footer';
import AddressSearch from './components/AddressSearch';
import AddressErrorBoundary from './components/AddressErrorBoundary';

import './css/App.css';

// Insert here your Foursquare API key
const foursquare = require('react-foursquare')({
  clientID: 'VQEYYWX5BH511OPRHTBCKV5XCRXUHWI3UY5IVRZTZQ3XTDQO',
  clientSecret: '2FPVGCFNUYX3KJUVSYC2UZABT2RYUFUSYPJV1BQYFUVS3LBW'
})

// // A11y
// // Define values for keycodes
// var VK_ENTER      = 13;
// var VK_SPACE      = 32;
// var VK_LEFT       = 37;
// var VK_UP         = 38;
// var VK_RIGHT      = 39;
// var VK_DOWN       = 40;

class App extends Component {
  state = {
    // Default address
    location: {lat: 52.5272422, lng: 13.370466},
    defaultZoom: 14,

    // Sidebar visibility
    sidebarVisible: false,

    // Venues lists
    venues: [],
    filteredVenues: [],
    selectedVenue: {},
    query: "",

    // Catch errors
    venuesError: false,
    addressError: false,
    mapsError: false
  }


  componentWillMount() {
    this.getLocation();
  }
  

  // Get user's location from geolocation
  getLocation = () => {
    // Check if geolocation is supported/enabled on current browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            // // for when getting location is a success
            this.setState({
              location: {lat: Number(position.coords.latitude), lng: Number(position.coords.longitude)}
            });

            // Get venues based on user's location
            this.getVenues(this.state.location);
          },
          (error_message) => {
            // If getting location results in an error
            console.error('An error has occured while retrieving location', error_message);
            
            // Get venues based on default location
            this.getVenues(this.state.location);
          }
      );
    
    // If geolocation is not supported
    } else {
      console.log('Geolocation is not enabled on this browser');
      
      // Get venues based on default location
      this.getVenues(this.state.location);
    }
  }
  

  // Clear venues array
  clearVenues = () => {
    this.setState({
      venues: [],
      filteredVenues: []
    })
  }
  

  /* Method to fetch venues from foursquare
  * @params {object} {lat, lng} location  - default location, user's location 
  * or selected address from user's input (AddressSearch.js)
  */
  getVenues = (location) => {
    // Set parameters to use in the Foursquare API call.
    const params = {
      // Set current location in foursquare search
      'll': `${location.lat}, ${location.lng}`,
      // Search for cafes
      'section': 'coffee',
      // Get maximum 30 locations
      'limit': 25,
      venuePhotos: 1
    }

    // Clear venues array
    this.clearVenues();

    // Get venues from Foursquare
    foursquare.venues.explore(params)
    .then(r => {
      r.response.groups[0].items.map(item => {
        return this.setState({
          venues: this.state.venues.concat([item.venue]),
          filteredVenues: this.state.filteredVenues.concat([item.venue])
        })
      })
    }).catch(error => {return this.setState({venuesError: true})});
  }


  /* Update new location from user input
  * @params {object} {lat, lng} address - selected address 
  * from user's input (AddressSearch.js)
  */
  updateLocation = (address) => {
    if (address) {
      this.setState({ 
        location: address
      });

      // Clear venue list
      this.clearVenues();

      // Generate venue list for the new location
      this.getVenues(this.state.location);
    } 
  }


  /* Show infowindow for the selected location
  * @params {object} venue - selected venue from user's 
  * input (VenueSearch.js)
  */
  toggleInfo = (venue) => {
    this.setState({
      selectedVenue: venue,
    });

    if (this.state.sidebarVisible) {
      this.toggleSidebarVisibility();
    }
  }


  /* Filter venues list on user's input
  * @params {string} query - user's input (VenueSearch.js)
  */ 
  updateFilter = (query) => {
    if (query) {
        this.setState({ query })
        const match = new RegExp(escapeRegExp(query), 'i')
        // Alphabetically sort venue list by name
        let sortedVenueList = this.state.venues.filter(venue => match.test(venue.name)).sort(sortBy('name'))
        this.setState({
            filteredVenues: sortedVenueList
        });
    } else {
        this.setState({
            query: "",
            filteredVenues: this.state.venues
        });
    }
  }


  toggleSidebarVisibility = () => {
    this.setState({sidebarVisible: !this.state.sidebarVisible})
    
    let sidebar = document.querySelector('.sidebar-navigation');
  
    if (this.state.sidebarVisible) {
      sidebar.style.visibility = "hidden";
    } else {
      sidebar.style.visibility ="visible";
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          toggleSidebarVisibility = {this.toggleSidebarVisibility}
        />
        <AddressErrorBoundary addressError={this.props.addressError}>
                    <AddressSearch 
                        updateLocation = {this.updateLocation}
                        toggleSidebarVisibility = {this.toggleSidebarVisibility}
                    />
                </AddressErrorBoundary>
        <Sidebar
          location = {this.state.location}
          updateLocation = {this.updateLocation}
          addressError = {this.state.addressError}
                
          venues = {this.state.venues}
          filteredVenues = {this.state.filteredVenues}
          query = {this.state.query}
          updateFilter = {this.updateFilter}
          toggleInfo = {this.toggleInfo}
          venuesError = {this.state.venuesError}
          toggleSidebarVisibility = {this.toggleSidebarVisibility}
        />
        <MapErrorBoundary mapsError = {this.state.mapsError}>
          <Map
            isMarkerShown
            venues = {this.state.filteredVenues}
            location = {this.state.location}
            selectedVenue = {this.state.selectedVenue}
            zoom = {this.state.defaultZoom}
            toggleInfo = {this.toggleInfo}
            mapsError = {this.state.mapsError}
          />
        </MapErrorBoundary>

        <Footer />
      </div>
    )
  }
}

export default App
