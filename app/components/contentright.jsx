var React = require('react');
var ContentRight = React.createClass({
	getInitialState:function(){
		return {value:''};
	},
	handlechange:function(event){
		this.setState({value:event.target.value});
	},
	sendmsg:function(){
		this.props.sendmsg();
		this.state.value = '';
		this.setState({value:this.state.value});
	},
	componentDidMount:function(){
		var that = this;
		document.getElementById('subval').onkeydown = function(e){
			var e = e || event;
			if(e.keyCode === 13){
				that.sendmsg();
			}
		}
	},
	changeurl:function(){
		
		window.location.href='http://localhost:8080/collect.html';
	},
	render:function(){
		return(
			<div className="contentright">
				<div className="conrightf">
					<span className="conrightext">{this.props.currentuser}</span>
					<i className="icon iconfont putop">&#xe60a;</i>
					<div className="putright">清除消息</div>
				</div>
				<div className="middlediv" id="middlediv">
					<div className="chatmain">
						<div className={this.props.currentcomment.type == 2 ? "chatworkimg" : "chatuserimg"}></div>
						<div className="chatext">
						<h2 className="chatuser">Hi</h2>
						
						<h2 className="chatcontent">{this.props.currentcomment.type == 2 ? this.props.currentcomment.message : "有什么话想跟他(她)聊的呢"}</h2>
						</div>
						<div className={this.props.currentcomment.type == 2 ? "chatcon" : "chatnone"}>
							<div className="chatbutf">邀请朋友</div>
							<div className="chatbuts" onClick={this.changeurl}>采用其他服务</div>
							<div className="chatbutt">帮助中心</div>
						</div>
					</div>
					{
						this.props.currentcomment.chatcontent.map(function(item,i){
							return(
								<div className="chatmain" key={i}>
									<div className="chatimg"></div>
									<div className="chatext">
									<h2 className="chatuser">{item.senduser}</h2>
									<h2 className="chatime">{item.sendtime}</h2>
									<h2 className="chatcontent">{item.sendcontent}</h2>
									</div>
								</div>
							);
						}.bind(this))
					}
				</div>
				<div className="conrightb">
					<div className="conrightdiv">
						<div className="commentdiv">
							<i className="icon iconfont putop">&#xe604;</i>&nbsp;&nbsp;&nbsp;
							<input type="text"  placeholder="说点什么吧" className="comment" id='subval' value={this.state.value} onChange={this.handlechange}></input>
						</div>
						<span className="send" onClick={this.sendmsg} id='sendmsg'>发送</span>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ContentRight;