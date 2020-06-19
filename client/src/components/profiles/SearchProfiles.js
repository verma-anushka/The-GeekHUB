import React from 'react';

import axios from "axios";
import "./allprofiles.css"

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../store/actions/profile";

class Search extends  React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			query: '',
		};
		this.cancel = '';
	}

	handleOnInputChange = (event) => {

		const key = event.target.value;		
		this.setState(prevState=>{
            return {
				...prevState,
				query: key
            }
        })
	};

	oninputkeppressup = () => {

		if (this.cancel) {
			this.cancel.cancel();
		}
		this.cancel = axios.CancelToken.source();
    	this.props.getProfiles(this.state.query, this.cancel.token);
	} 

	render() {
		
		return (
			<div className="search-profiles">
				<label className="search-label" htmlFor="search-input">
					<input
						type="text"
						value={this.state.query}
						id="search-input"
						placeholder="Search..."
						onChange={this.handleOnInputChange}
						onKeyUp={this.oninputkeppressup}
					/>
				</label>
				
			</div>
			)
	}
}


Search.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, { getProfiles })(Search);

