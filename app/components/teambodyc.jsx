import React from 'react';
export default class Teambodyc extends React.Component{
	constructor(props){
		super(props);
		this.changestate = this.changestate.bind(this);
		this.state={

		}
	}
	closedet(){
		$("#detailback").hide();
		$("#detailmain").hide();
		$("#warning").hide();
	}
	changestate(event){
		this.props.changestate(0,event.target.id,event.target.value,this.props.assigns.executor);
	}
	render(){
		return (
			<div>
				<div className="detailback" id="detailback">
				</div>
				<div className="detailmain" id="detailmain">
					<div className="detailh">
						<span>任务分组</span>
						<span>{this.props.assigns.assignname}</span>
						<span>任务阶段</span>
						<span>{this.props.assigns.assignstate}</span>
						<span id="warning">你不是执行者无法改变任务状态</span>
						<i className="icon iconfonteam" onClick={this.closedet}>&#xe632;</i>
					</div>
					<div className="detailperson">
						<div className="createper">
							<h3>创建者</h3>
							<i className="icon iconfonteam">&#xe619;</i>
							<span className="detnormal">{this.props.assigns.creator}</span>
						</div>
						<div className="createper">
							<h3>执行者</h3>
							<i className="icon iconfonteam">&#xe62b;</i>
							<span className="detnormal">{this.props.assigns.executor}</span>
						</div>
						<div className="createper">
							<h3>优先级</h3>
							<i className="icon iconfonteam">&#xe609;</i>
							<select value={this.props.assigns.assignstate} onChange={this.changestate} id={this.props.assigns.assignid}>
							  <option value="待开发">待开发</option>
							  <option value="测试">测试</option>
							  <option value="完成">完成</option>
							</select>
						</div>
						<div className="createper">
							<h3>截止日期</h3>
							<i className="icon iconfonteam">&#xe615;</i>
							<span className="detnormal">{this.props.assigns.createtime}</span>
						</div>
					</div>
					<h3>任务状态</h3>
					<ul>
						<li>
						{
							this.props.assigns.commet.map(function(item,i){
								return(
									<div className="asste" key={i}>
										<span>{item.content}</span>
										<span>{item.operatetime}</span>
									</div>
								)
							})
						}
						</li>
					</ul>
				</div>
			</div>
		)
	}
}