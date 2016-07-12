import React from 'react';
export default class Teambodyc extends React.Component{
	constructor(props){
		super(props);
		
		this.closeme = this.closeme.bind(this);
		this.state={

		}
	}
	closeme(){
		this.props.closeme();
	}
	render(){
		return (
			<div>
				<div className="detailback" id="myback" onClick={this.closeme}>
				</div>
				<div className="mydetail" id="mydetail">
					
					<div className="assme">
						<span>项目名称</span>
						<span>创建者</span>
						<span>执行者</span>
						<span>创建时间</span>
					</div>
					{
						this.props.teambodyme.map(function(item,i){
							return(
								<div className="assmedet" key={i}>
									<span>{item.assignname}</span>
									<span>{item.creator}</span>
									<span>{item.executor}</span>
									<span>{item.createtime}</span>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}