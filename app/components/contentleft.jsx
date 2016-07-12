var React = require('react');
var ContentLeft = React.createClass({
	getInitialState:function(){
		return {};
	},
	distop:function(event){
		this.props.distop(event.target.id);
	},
	changeuser:function(event){
		this.props.changeuser(event.currentTarget.value);
	},
	render:function(){
		return (
			<div className="contentleft">
				<div className="contentf">
					<i className="icon iconfont">&#xe601;</i>&nbsp;&nbsp;&nbsp;
					<span id="test">最近联系</span>
				</div>
				{
					this.props.userlist.map(function(item,i){
						return(
							<a key={i} onClick={this.changeuser} value={item.names}><div className="usercontent" key={i} id="usercontent">
								<div className={item.key == 1 ? "userdis" : "workdis"}>
								</div>
								<div className="user">
									<h2 className="username">{item.names}</h2>
									<h1>{item.comment}</h1>
								</div>
								<div className="distop">
									<i className="icon iconfont" onClick={this.distop} id={i} value={item.names}>&#xe61c;</i>
								</div>
							</div></a>
						);
					}.bind(this))
				}
				<div className="contentf">
					<i className="icon iconfont">&#xe600;</i>&nbsp;&nbsp;&nbsp;
					<span>搜索成员</span>
				</div>
			</div>
		);
	}
});

module.exports = ContentLeft;