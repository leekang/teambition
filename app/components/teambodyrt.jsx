import React from 'react';
var ReBs = require('react-bootstrap');

var Tooltip = ReBs.Tooltip;

var Popover = ReBs.Popover;

var OverlayTrigger = ReBs.OverlayTrigger;

export default class Teambodyrt extends React.Component{
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
					<span>已完成·</span>
					<span>{this.props.assigns.length}</span>
					<i className="icon iconfonteam">&#xe626;</i>
					<OverlayTrigger  placement="bottom" overlay={<Popover title="结束阶段" id="popover"><strong>包含这个项目已结束任务!</strong> </Popover>}>
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
								<div onClick={this.showdetail} className="lothend" key={item.assignid} id={item.assignid}>
									<i className="icon iconfonteam lothf">&#xe62e;</i>
									<span className="loths">{item.assignname}</span>
									<OverlayTrigger placement="top" overlay={tooltip}>
									<i className="icon iconfonteam lotht">&#xe619;</i>
									</OverlayTrigger>
								</div>
							)
						}.bind(this))
					}
					</li>
				</ul>
				<div className="lbottom">
					<i className="icon iconfonteam">&#xe62a;</i>
					<span>已完成任务</span>
				</div>
			</div>
		)
	}
}