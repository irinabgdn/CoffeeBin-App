
import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';

import PropTypes from 'prop-types';
  
class AddressSearch extends Component {

    changeAddress(suggest) {
        if (suggest.location) {
            this.props.updateLocation(suggest.location);
        }
    }

    render() {
        return (
            <div className="address-search-container">
                <Geosuggest
                    placeholder="Search cities"
                    className="geo-suggest"
                    inputClassName="search-input"
                    label="Search cities"
                    role="search"
                    tabIndex="0"
                    id="addres-search"
                    type="(cities)"
                    onSuggestSelect= {(suggest) => {
                        this.changeAddress(suggest)
                    }}
                    changeAddress={this.props.changeAddress}
                    toggleSidebar={this.props.toggleSidebar}
                />
            </div>
        );
    }
}

AddressSearch.propTypes = {
    updateLocation: PropTypes.func.isRequired
}

export default AddressSearch