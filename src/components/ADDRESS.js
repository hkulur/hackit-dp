import React, { Component } from 'react';
class ATest extends Component {
   super(props) {

   };
   componentWillMount() {
    console.log(this.props);
   }
   render() {
      const { children } = this.props;
   	return (
         <div className="col-md-12">
            {children}
         </div>
      );
   }
}
export default ATest;
