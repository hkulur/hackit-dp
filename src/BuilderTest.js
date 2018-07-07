import React, { Component } from 'react';
import ATestComp from "./ATestComp";
import ATestComponent from "./ATestComponent";
var AllComponents = require('./components');
class BuilderTest extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      key: Math.random()
	    };
	 }
	buildThePage(){
		const pages = Object.keys(window.tree);
		let apiList = [];
		pages.map((i) => {
			apiList.push(window.tree[i].data);
		});
		const TREE = window.tree.json_data;
		const path = window.location.pathname.trim().split('/builder-test/');
		const page = (path.length>1 && path[1] ? path[1] : 'index-page');
		const thePage = TREE[page.substr(0,page.length-1)];
		const theTree = this.getTheComp(thePage,'', thePage.data);
		return theTree;
	};
	getTheApiList() {
		const pages = Object.keys(window.tree.json_data);
		let apiList = [];
		pages.map((i) => {
			if(window.tree.json_data[i].data)
			apiList.push(window.tree.json_data[i].data);
		});
		return apiList;
	}
	componentWillMount(){
		const apiList = this.getTheApiList();
   		const self=this;
   		for(var i=0;i<apiList.length;i++)
   		{
   			$.ajax({
		            url:  "http://192.168.3.92:8000/theme/"+apiList[i]+"/",
		            type: 'GET',
		            success: function(res) {
		            	if(!window.data) {
		            		window['data'] = {};
		            	}
		            	window.data[res.type] = res.data;
		                self.setState({ key: Math.random() });
		            }
		    });

   		}

   };
	getTheComp(node, pName, pageStore){
		if(!node) return null;
		const child = [];
		if (node && node.child) {
			for(var i=0;i<node.child.length;i++) {
				const k = this.getTheComp(node.child[i], node.component + '_' + pName + i, pageStore);
				if(k)
				child.push(k);
			}
		}
		var Ele=AllComponents[node.component];
		if (Ele) {
			return <Ele pageStore={pageStore} data={{...node.data}} key={Math.random()}>{child}</Ele>;
		} else {
			var Element = AllComponents['a-row'];
			return <Element pageStore={pageStore} data={{...node.data}} key={Math.random()}>{child}</Element>;
		}
	};
	render() {
		return (
			<div key={this.state.key}>
				{this.buildThePage()}
			</div>
		)
   	}
}
export default BuilderTest;
