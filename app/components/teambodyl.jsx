import React from 'react';
var ReBs = require('react-bootstrap');

var Tooltip = ReBs.Tooltip;

var Popover = ReBs.Popover;

var OverlayTrigger = ReBs.OverlayTrigger;

export default class Teambodyl extends React.Component{
	constructor(props){
		super(props);
		this.showdetail = this.showdetail.bind(this);
		this.changexecutor = this.changexecutor.bind(this);
		this.saveassignname  = this.saveassignname.bind(this);
		this.hide = this.hide.bind(this);
		this.state={
			executor:"",
			assignname:""

		}
	}
	componentDidMount(){

	}
	show(){
		$("#lmiddle").show();
	}
	hide(){
		this.props.addassign(this.state.assignname,this.state.executor);
		$("#lmiddle").hide();
		this.state.assignname = this.state.executor = "";
		this.setState({assignname:this.state.assignname,executor:this.state.executor});
	}
	showdetail(event){
		this.props.showdetail(event.currentTarget.id);
	}
	changexecutor(event){

		this.state.executor = event.target.value;
		this.setState({executor:this.state.executor});
	}
	saveassignname(event){
		this.state.assignname = event.target.value;
		this.setState({assignname:this.state.assignname});
	}
	render(){
		return (
			<div className="teambodyl">
				<div className="ltop">
					<span>需求点·</span>
					<span>{this.props.assigns.length}</span>
					<i className="icon iconfonteam">&#xe626;</i>
					<OverlayTrigger  placement="bottom" overlay={<Popover title="所有任务" id="popover"><strong>包含这个项目的所有任务!</strong> </Popover>}>
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
								<div onClick={this.showdetail} className={item.assignstate == "待开发" ? "loth" : item.assignstate == "测试" ? "lothtest" : "lothend"} key={item.assignid} id={item.assignid}>
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
				<div className="lmiddle" id="lmiddle">
					<textarea className="assign" placeholder="任务名称" id="assignname" value={this.state.assignname} onChange={this.saveassignname}></textarea>
					<h3>参与者</h3>
					<i className="icon iconfonteam adjustadd">&#xe630;</i>
					<select value={this.state.executor} onChange={this.changexecutor}>
						<option value="请选择">请选择</option>
						<option value="龙相">龙相</option>
						<option value="青叶">青叶</option>
						<option value="予心">予心</option>
					</select>
					<button type="button" className="createbtn" onClick={this.hide}>创建</button>
				</div>
				<div className="lbottom" onClick={this.show}>
					<i className="icon iconfonteam">&#xe627;</i>
					<span>添加任务</span>
				</div>
			</div>
		)
	}
}