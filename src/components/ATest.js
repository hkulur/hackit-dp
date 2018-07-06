import React, { Component } from 'react';
class ATest extends Component {
   super(props) {

   };
   render() {
   	return (
         <div className="col-md-12">
            This is from a Test Component
            {this.props.children}
         </div>
      );
   }
}
export default ATest;