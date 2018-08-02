import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

class Map extends Component {
    static defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
   
    render() {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyALK8Ns0VjwYiaUdgufSGahJlEbXRUWr18' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          />
        </div>
      );
    }
}
   
export default Map;