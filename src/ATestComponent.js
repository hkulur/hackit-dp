import React, { Component } from 'react';


class ATestComponent extends Component {


   super(props) {
   		debugger;
   		this.state = {
   			url1 : '',
   			url2 : '',
   			url3 : '',
   		}
   };

   	componentWillMount(){
   		console.log('trying');
   		const apisToCall = this.props.apisToCall;
   		const self=this;
   		for(var i=0;i<apisToCall.length;i++)
   		{
   			$.ajax({
		            url:  "http://192.168.3.92:8000/theme/get_dummy",
		            type: 'GET',
		            success: function(res) {
		                self.props.dataReceive(res);
		            }
		    });

   		}
   		
   }

   render() {
      return null;
   }
}
export default ATestComponent;