
import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'

import PropTypes from 'prop-types'
  
class AddressSearch extends Component {

    changeAddress(suggest) {
        console.log(this.props, suggest.location)
        this.props.updateLocation(suggest.location)
    }

    render() {
        return (
            <div className="address-search-container">
                <Geosuggest
                    placeholder="Search cities"
                    className="geo-suggest"
                    inputClassName="address-input"
                    type={["(cities)"]}
                    label="Search cities"
                    id="addres-search"
                    onSuggestSelect= {(suggest) => {this.changeAddress(suggest)}}
                    changeAddress={this.props.changeAddress}
                />
            </div>
        );
    }
}

AddressSearch.propTypes = {
    updateLocation: PropTypes.func.isRequired
}

export default AddressSearch