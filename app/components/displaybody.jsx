import React from 'react';

export default class Displaybody extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			workname : []
		}
	}
	componentWillMount(){
		var that = this;
		$.ajax({
			data:{},
			url:'http://localhost:3000/work',
			type:'get',
			datatype:'json',
			cache:false,
			async:false,
			success:function(rev){
				that.state.workname = rev.data;
				that.setState({workname:that.state.workname});
			}
		})
	}
	
	changeurl(event){
		var workname = event.target.id;
		window.location.href = 'http://localhost:8080/team.html?workname='+workname;
	}
	render(){
		return(
			<div className="bodymain">
				<div className="person">
					<span>个人项目</span>
					<div className="line">
					</div>
				</div>
				<div className="displaypro">
					{
						this.state.workname.map(function(item,i){
							return(
								<div className={i == 0 ? "workback" : "workback1"} key={i}>
									<h3 className="workname" onClick={this.changeurl} id={item}>{item}</h3>
								</div>
							)
						}.bind(this))
					}
				</div>
				<div className="person">
					<span>已归档项目</span>
					<div className="line">
					</div>
				</div>
			</div>
		)
	}
}