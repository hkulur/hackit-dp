import React, { Component } from 'react';
import ATestComp from "./ATestComp";
var AllComponents = require('./components');
class BuilderTest extends Component {
	super(props) {
		console.log(window.tree);
	};
	buildThePage(){
		console.log('yoo',window.tree);
		const TREE = [JSON.parse(`{"component":"_root","child":[{"component":"a-gid","child":[{"component":"a-gid-left","child":[{"component":"a-test-comp","child":[null],"data":{}}],"data":{}},{"component":"a-gid-right","child":[{"component":"a-2nd-test-comp","child":[null],"data":{}}],"data":{}}],"data":{}}],"data":{}}`)];
		const theTree = this.getTheComp(TREE[0],'');
		return theTree;
	};
	getTheComp(node, pName){
		if(!node) return null;
		const child = [];
		if (node && node.child) {
			for(var i=0;i<node.child.length;i++) {
				const k = this.getTheComp(node.child[0], node.component + '_' + pName);
				if(k)
				child.push(k);
			}
		}
		var Ele=AllComponents[node.component];
		node.data['uid'] = node.component + '_' + pName;
		return <Ele data={{...node.data}}>{child}</Ele>;
	};
	render() {
		return (this.buildThePage());
   	}
}
export default BuilderTest;
