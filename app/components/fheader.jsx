import React from 'react';
var ReBs = require('react-bootstrap');
var Tooltip = ReBs.Tooltip;
var Popover = ReBs.Popover;
var OverlayTrigger = ReBs.OverlayTrigger;

export default class Fheader extends React.Component{
	constructor(){
		super();
		this.state={
			fheadercon:['分享','文件','日程']
			
		}
	}
	render(){
		return (
			<div className="fheader">
				<div className="fheaderl">
					<span>商家促销</span>
					<OverlayTrigger  placement="bottom" overlay={<Popover title="团队简介" id="popover"><strong>这是一个年轻的充满创造力的团队!</strong> </Popover>}>
      				<i className="icon iconfont adjustfh">&#xe624;</i>
   					 </OverlayTrigger>
					
					<i className="icon iconfont adjustfh">&#xe622;</i>
				</div>
				<div className="fheaderm">
				<a >{this.props.workname}</a>
				<OverlayTrigger  placement="bottom" overlay={<Popover title="项目简介" id="popover"><strong>这个项目的目的在于优化魔方!</strong> </Popover>}>
				<i className="icon iconfont adjustfhm">&#xe624;</i>
				</OverlayTrigger>
					{
						this.state.fheadercon.map(function(item,i){
							return (
								<a key={item}>{item}</a>
							)
						})
					}
				</div>
				<div className="fheaderr">
				<OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">总人数</Tooltip>}>
					<i className="icon iconfontsmall adjustfhr">&#xe619;</i>
					</OverlayTrigger>

					<span>{this.props.userlist.length}</span>
					<OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">筛选</Tooltip>}>
					<i className="icon iconfontsmall adjustfhr">&#xe620;</i>
					</OverlayTrigger>

					<span>筛选</span>

					<OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">菜单</Tooltip>}>
					<i className="icon iconfontsmall adjustfhr">&#xe618;</i>
					</OverlayTrigger>
					<span>菜单</span>
				</div>
			</div>
		)
	}
}