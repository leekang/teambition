import React from 'react';
import Header from './teamheader.jsx';
import Displaybody from './displaybody.jsx';

export default class Collect extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		
	}
	render(){
		return (
			<div className="container">
				<Header />
				<Displaybody />
			</div>
		)
	}
}