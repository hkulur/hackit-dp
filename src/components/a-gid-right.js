import React, { Component } from 'react';
class ATest extends Component {
   super(props) {

   };
   render() {
   	return (
         <div className="col-md-12">
            Right Side
            {this.props.children}
         </div>
      );
   }
}
export default ATest;