import React from 'react';
import Header from './teamheader.jsx';
import Teambodyl from './teambodyl.jsx';
import Teambodym from './teambodym.jsx';
import Teambodyr from './teambodyr.jsx';
import Teambodyrt from './teambodyrt.jsx';
import Teambodydet from './teambodyc.jsx';
import Teambodyme from './teambodyme.jsx';
import Fheader from './fheader.jsx';

export default class Teambition extends React.Component{
	constructor(props){
		
		super(props);
		this.showme = this.showme.bind(this);
		this.closeme = this.closeme.bind(this);
		this.showdetail = this.showdetail.bind(this);
		this.changestate = this.changestate.bind(this);
		this.addassign = this.addassign.bind(this);
		this.state = {
			teambodyl:[
				
			],

			teambodym:[
				
			],

			teambodyr:[
				
			],

			teambodyrt:[
				
			],

			teambodyme:[

			],

			teambodydet:{},

			workname:"",

			loguser:"龙相",

			userlist:null
		};
	}
	componentWillMount(){
		var that = this;
		var workname = this.getQueryString("workname");
		this.state.workname = workname;
		$.ajax({
			data:{workname:workname},
			url:'http://localhost:3000/project',
			type:'get',
			datatype:'json',
			cache:false,
			async:false,
			success:function(revdata){
				
				that.state.userlist = revdata.data;
			},
			error: function(jqXHR, textStatus, errorThrown){
    				alert('error ' + textStatus + " " + errorThrown);  
    		}
		});
		$.ajax({
			data:{workname:workname},
			url:'http://localhost:3000/assign',
			type:'get',
			datatype:'json',
			cache:false,
			async:false,
			success:function(revdata){
				that.state.teambodyl = revdata.assignlist;
				that.state.teambodydet = revdata.assignlist[0];
			},
			error: function(jqXHR, textStatus, errorThrown){
    				alert('error ' + textStatus + " " + errorThrown);  
    		}
		});
		
		this.setState({teambodyl:this.state.teambodyl,teambodydet:this.state.teambodydet,userlist:this.state.userlist,workname:this.state.workname});
		
	}
	getQueryString(obj){
		var reg = new RegExp("(^|&)" + obj + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return decodeURI(r[2]); return null; 
	}
	componentDidMount(){
		
		this.fetch();//取一次数据
	}
	showdetail(obj){
		var that = this; 
		this.state.teambodyl.map(function(item,i){
			if(item.assignid == obj){
				that.state.teambodydet = item
			}
		});
		this.setState({teambodydet:this.state.teambodydet});
		
		$("#detailback").show();
		$("#detailmain").show();
	}
	changestate(type,assignid,value,executor){
		if(this.state.loguser == executor){
			this.state.teambodyl.map(function(item,i){
				if(item.assignid == assignid){
					var content = executor+"更改了任务状态";
					var operatetime = (new Date()).toLocaleString();
					var commet = {content:content,operatetime:operatetime};
					item.commet.push(commet);
					item.assignstate = value;
				}
			});
			this.setState({teambodyl:this.state.teambodyl});
			this.clearstate();
			this.fetch();//改变状态后要取一次数据
		}else{
			this.showwarn();
		}
	}
	showwarn(){
		$("#warning").show();
	}
	showme(){
		this.state.teambodyl.map(function(item,i){
			if(item.executor == "龙相"){
				this.state.teambodyme.push(item);
			}
		}.bind(this));
		this.setState({teambodyme:this.state.teambodyme});
		console.log(this.state.teambodyme);
		$("#myback").show();
		$("#mydetail").show();
	}
	closeme(){
		this.state.teambodyme = [];
		this.setState({teambodyme:this.state.teambodyme});
		$("#myback").hide();
		$("#mydetail").hide();
	}
	clearstate(){
		this.state.teambodym = [];
		this.state.teambodyr = [];
		this.state.teambodyrt = [];
		this.setState({teambodym:this.state.teambodym,teambodyr:this.state.teambodyr,teambodyrt:this.state.teambodyrt});
	}
	addassign(assignname,executor){
		var len = this.state.teambodyl.length;
		var assignid = this.state.teambodyl[len-1].assignid+1;
		var createtime = (new Date()).toLocaleDateString();
		var newassign = {assignid:assignid,assignname:assignname,creator:this.state.loguser,executor:executor,assignstate:"待开发",createtime:createtime,commet:[{content:"龙相创建了此项目",operatetime:"2016/5/7 下午22:23:31"}]};
		this.state.teambodyl.push(newassign);
		this.setState({teambodyl:this.state.teambodyl});

		this.fetch();//添加了一个之后要更新当前的任务列表
	}
	fetch(){//将所有任务按照状态分组

		var that = this;
		this.state.teambodyl.map(function(item,i){
			if(item.assignstate == "待开发"){
				that.state.teambodym.push(item);
			}else if(item.assignstate == "测试"){
				that.state.teambodyr.push(item);
			}else{
				that.state.teambodyrt.push(item);
			}
		});
		this.setState({teambodym:this.state.teambodym,teambodyr:this.state.teambodyr,teambodyrt:this.state.teambodyrt});
		$("#detailback").hide();
		$("#detailmain").hide();
	}
	render(){
		return (
			<div className="container">
				<Header showme={this.showme}/>

				<Fheader userlist = {this.state.userlist}
				workname={this.state.workname}/>
				
				<Teambodyl 
				addassign = {this.addassign}
				showdetail = {this.showdetail}
				assigns={this.state.teambodyl}/>
				
				<Teambodym 
				showdetail = {this.showdetail}
				assigns={this.state.teambodym}/>
				
				<Teambodyr 
				showdetail = {this.showdetail}
				assigns={this.state.teambodyr}/>

				<Teambodyrt 
				showdetail = {this.showdetail}
				assigns={this.state.teambodyrt}/>

				<Teambodydet 
				changestate = {this.changestate}
				assigns={this.state.teambodydet}/>

				<Teambodyme teambodyme = {this.state.teambodyme}
				closeme = {this.closeme}/>
			</div>
		)
	}
}