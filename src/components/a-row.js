import React, { Component } from 'react';
class ATest extends Component {
   super(props) {

   };
   componentWillMount() {
    console.log('a-row');
   }
   render() {
    return (
         <div className="col-md-12">
            {this.props.children}
         </div>
      );
   }
}
export default ATest;
