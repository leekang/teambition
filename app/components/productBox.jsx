var React = require('react');
var ContentLeft = require('./contentleft.jsx');
var ContentRight = require('./contentright.jsx');
var Header = require('./header.jsx');
var Chat = {
	usename:null,
	socket:null,
	userid:null
};
var d = document;
var ProductBox = React.createClass({
	getInitialState:function(){
		return {
			userlist:[],//左边用户列表

			currentuser:'',//主界面和谁的对话框

			loginuser:'',//保存登录者的信息

			usercomment:[],//保存所有的聊天记录

			currentcomment:{}
		};
	},
	componentWillMount:function(){
		var name = this.getQueryString("name");
		this.state.loginuser = name;
		this.setState({loginuser:this.state.loginuser});
		this.getdata(name);
	},
	getQueryString:function(obj){
		var reg = new RegExp("(^|&)" + obj + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return decodeURI(r[2]); return null; 
	},
	scrolltobottom:function(){
		var clienth = d.getElementById('middlediv').clientHeight;
		var scrollh = d.getElementById('middlediv').scrollHeight;
		d.getElementById('middlediv').scrollTop = scrollh - clienth;		
	},
	submitmsg:function(){
		var content = d.getElementById('subval').value;
			//console.log(this);这里this指向的是window这个对象。可能是react内部改变了
		if(content != ''){
			var sendtime = new Date();
			var obj = {
				senduser:this.state.loginuser,
				revuesr:this.state.currentuser,
				sendcontent:content,
				type:this.state.currentcomment.type,
				sendtime:sendtime.toLocaleString()
			};
			Chat.socket.emit('message',obj);
		}
	},
	getdata:function(obj){
		var that = this;
		var redata;
		$.ajax({
    			data: {name:obj},
    			url: 'http://localhost:3000/',
    			type:'get',
    			dataType: 'json',
    			cache: false,
    			async: false,
    			success: function(revdata){
    				revdata.data.map(function(item,i){
    					var usermsg = {
    						type:item.key,
    						connect:item.names,
    						message:item.comment,
    						chatcontent:[]
    					}
    					that.state.usercomment.push(usermsg);
    					that.state.userlist.push(item);
    				});
    				that.state.currentuser = that.state.userlist[0].names;
    				that.state.currentcomment = that.state.usercomment[0];
    				that.setState({userlist:that.state.userlist,currentuser:that.state.currentuser,currentcomment:that.state.currentcomment});
    			},
    			error: function(jqXHR, textStatus, errorThrown){
    				alert('error ' + textStatus + " " + errorThrown);  
    			}
    	});
	},
	init:function(){
		var that = this;
		Chat.socket = io.connect('http://localhost:3000');
		//console.log(this);这里this指向的是Chat这个对象
		Chat.socket.on('message',function(obj){//将信息保存进对应的state中
			
			if(obj.type == 2){//如果这条信息是发送给项目的那么有该项目的都应该保存
				that.state.usercomment.map(function(item,i){
					if(item.connect == obj.revuesr){
						var temp = {
							senduser:obj.senduser,
							sendtime:obj.sendtime,
							sendcontent:obj.sendcontent
						}
						item.chatcontent.push(temp);
						that.setState({usercomment:that.state.usercomment});
						if(that.state.currentuser == obj.revuesr){
							that.getmessage(item.connect);
						}
					}
				})
			}else{//如果这条信息是发给这个人的话
				
				if(that.state.loginuser == obj.senduser){//发送者和登陆者是同一个人
					
					that.state.usercomment.map(function(item,i){
						if(item.connect == obj.revuesr){
							var temp = {
								senduser:obj.senduser,
								sendtime:obj.sendtime,
								sendcontent:obj.sendcontent
							}
							item.chatcontent.push(temp);
							that.setState({usercomment:that.state.usercomment});
							if(that.currentuser == obj.revuesr){
								that.getmessage(item.connect);//信息保存之后是否在本页面显示需要判断
							}
						}
					})
				}else if(that.state.loginuser == obj.revuesr){//登录者和接收者是同一个人
					that.state.usercomment.map(function(item,i){
						if(item.connect == obj.senduser){
							var temp = {
								senduser:obj.senduser,
								sendtime:obj.sendtime,
								sendcontent:obj.sendcontent
							}
							item.chatcontent.push(temp);
							that.setState({usercomment:that.state.usercomment});
							if(that.currentuser == obj.senduser){
								that.getmessage(item.connect);
							}
						}
					})
				}
			}
			
			that.scrolltobottom();
		});
	},
	componentDidMount:function(){
		this.init();
	},
	distop:function(obj){//用户置顶，这里我并没有阻止事件的冒泡因为置顶后一定是需要更换用户的
		let temp = this.state.userlist[0];
		this.state.userlist[0] = this.state.userlist[obj];
		this.state.userlist[obj] = temp;
		this.setState({userlist:this.state.userlist});
	},
	changeuser:function(obj){
		this.state.currentuser = obj;
		this.setState({currentuser:this.state.currentuser});
		this.getmessage(obj);
	},
	getmessage:function(name){//更换右侧需要显示的信息
		this.state.usercomment.map(function(item,i){
			if(item.connect == name){
				this.state.currentcomment = item;
				this.setState({currentcomment:this.state.currentcomment});
				
			}
		}.bind(this))
	},
  	render: function () {
   		return (
    		<div className="maindiv">
    			<Header />
				<ContentLeft userlist = {this.state.userlist} 
				changeuser = {this.changeuser}
				distop={this.distop}/>
				<ContentRight sendmsg = {this.submitmsg} 
				currentcomment = {this.state.currentcomment}
				currentuser = {this.state.currentuser}/>
      		</div>
    	);
 	}
});

module.exports = ProductBox;