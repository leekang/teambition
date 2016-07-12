import React from 'react';
var ReBs = require('react-bootstrap');

var Tooltip = ReBs.Tooltip;

var Popover = ReBs.Popover;

var OverlayTrigger = ReBs.OverlayTrigger;

export default class Teambodyr extends React.Component{
	constructor(props){
		super(props);
		this.showdetail = this.showdetail.bind(this);
		this.state={

		}
	}
	showdetail(event){
		this.props.showdetail(event.currentTarget.id);
	}
	render(){
		return (
			<div className="teambody">
				<div className="ltop">
					<span>测试中·</span>
					<span>{this.props.assigns.length}</span>
					<i className="icon iconfonteam">&#xe626;</i>
					<OverlayTrigger  placement="bottom" overlay={<Popover title="测试阶段" id="popover"><strong>包含这个项目测试任务!</strong> </Popover>}>
					<i className="icon iconfonteam">&#xe61e;</i>
					</OverlayTrigger>
				</div>
				<ul>
					<li>
					{
						this.props.assigns.map(function(item,i){
							const tooltip = (
  								<Tooltip id="tooltip">{item.executor}</Tooltip>
							);
							return(
								<div onClick={this.showdetail} className="lothtest" key={item.assignid} id={item.assignid}>
									<i className="icon iconfonteam lothf">&#xe62e;</i>
									<span className="loths">{item.assignname}</span>
									<OverlayTrigger placement="top" overlay={tooltip}>
									<i className="icon iconfonteam lotht">&#xe619;</i>
									</OverlayTrigger>
								</div>
							)
						}.bind(this))
					}</li>
				</ul>
				<div className="lbottom">
					<i className="icon iconfonteam">&#xe62c;</i>
					<span>测试中任务</span>
				</div>
			</div>
		)
	}
}