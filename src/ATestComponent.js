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

   componentWillReceiveProps(next){
	   	if(next.fire && next.freshReq) {

		   		$.ajax({
		            url:  this.props.url1 || this.state.url1 //"http://192.168.3.92:8000/theme/get_thambnail/GALE/",
		            type: 'GET',
		            success: function(res) {
		                console.log(res);
		                window['data']['store1'] = res;
		            }
		        });

		   		$.ajax({
		   			url: this.props.url2 || this.state.url2 //"http://192.168.3.92:8000/theme/save-theme/",
		   			method:'POST'
		   			data:JSON.stringify({name: "GALE", json_data: {'hey':'hsg'}, site_thumb: {'ashjd': 'ajhsd'} })
		   			success: function(res){
		   				console.log(res);
		   			}
		   		});


		   		$.ajax({
			         url: this.props.url3 || this.state.url3 //"http://192.168.3.92:8000/theme/set_thumbnail/"
			         method: "POST",
			         data: JSON.stringify({name: "GALE", title: {'hey':'hsg'}, content: {'ashjd': 'ajhsd'} }),
			         success: function(res){
			            console.log(res);
			         }
		      });
	   	}
   }

   render() {
      return 
         null
   }
}
export default ATestComponent;