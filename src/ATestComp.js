import React, { Component } from 'react';
class ATestComp extends Component {
   super(props) {

   };
   render() {
      return (
         <div className="col-md-12">
            {this.props.value}
         </div>
      );
   }
}
export default ATestComp;