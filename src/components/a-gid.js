import React, { Component } from 'react';
class ATest extends Component {
   super(props) {

   };
   componentWillMount() {
    console.log(this.props);
   }
   render() {
   	return (
         <div className="a-grid">
            {this.props.children}
         </div>
      );
   }
}
export default ATest;
