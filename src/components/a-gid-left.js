import React, { Component } from 'react';
class ATest extends Component {
   super(props) {

   };
   render() {
   	return (
         <div className="left">
            {this.props.children}
         </div>
      );
   }
}
export default ATest;