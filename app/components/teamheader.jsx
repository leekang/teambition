import React from 'react';
var ReBs = require('react-bootstrap');
var Tooltip = ReBs.Tooltip;

var OverlayTrigger = ReBs.OverlayTrigger;
export default class Header extends React.Component{
	constructor(){
		super();
		this.showme = this.showme.bind(this);
		this.state = {
			headercon:['项目','企业','我的','日历','收件箱']
		}
	}
	showme(){
		this.props.showme();
	}
	render(){
		return (
			<div className="headerback">
				<div className="headerl"></div>
				<div className="headerm" id="headerm">
					{this.state.headercon.map(function(item,i){
						return(
							<a key={item} onClick={this.showme}>{item}</a>
						)
					}.bind(this))}
				</div>
				<div className="headerr">
				<OverlayTrigger placement="left" overlay={<Tooltip id="tooltip">龙相</Tooltip>}>
					<i className="icon iconfonteam justi">&#xe631;</i>
					</OverlayTrigger>
				</div>
			</div>
		)
	}
}