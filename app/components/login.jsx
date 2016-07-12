var React = require('react');
var Login = React.createClass({
	change:function(){
		var name = document.getElementById('login').value;
		window.location.href='http://localhost:8080/index.html?name='+name;
	},
	keycode:function(e){
		var e = e || event;
		var that = this;
		if(e.keyCode === 13){
			that.change();
		}
	},
	render:function(){
		return(
			<div className="maindiv">
				<div className="leftdiv">
				</div>
				<div className="rightdiv">
					<div className="logform">
						<h2 className="logmsg">输入你的用户名</h2>
						<input type="text" id="login" className="logname" placeholder="你的登录名" onKeyDown={this.keycode}></input><br/>
						<input type="button"  className="logbtn" value="登录" onClick={this.change}></input><br/>
						<h2 className="logcom">开始你的简聊之旅</h2>
					</div>
					<div className="copyright">copyright©2016/4/01-2016/4/28 xidian University,cenbokang All rights reserved. 
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Login;