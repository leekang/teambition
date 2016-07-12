var React = require('react');
var Header = React.createClass({
	render:function(){
		return (
			<div className="header">
				<div className="list"><i className="icon iconfont">&#xe618;</i></div>
				<h2 className="chat">简聊</h2>
				<div className="beginchat"><i className="icon iconfont">&#xe602;</i>&nbsp;&nbsp;<span className="font">开始简聊</span></div>
				<div className="right">
					<a><i className="icon iconfont">&#xe608;</i></a>
					<a><i className="icon iconfont">&#xe600;</i></a>
					<a><i className="icon iconfont">&#xe605;</i></a>
					<a><i className="icon iconfont">&#xe609;</i></a>
					<a><i className="icon iconfont">&#xe619;</i></a>
				</div>
			</div>
		);
	}
});

module.exports = Header;