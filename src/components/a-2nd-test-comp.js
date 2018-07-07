import React, { Component } from 'react';
class ATest extends Component {
   super(props) {

   };
   componentWillMount() {
    console.log(this.props);
   }
   render() {
      return (
         <div className="col-md-12 a-test-component">
            A Second Component {this.props.data.uuid}
            {
               window.data ?
                  window.data[this.props.pageStore].map(v => {
                     return (
                        <div>
                           <span>
                              {v.username}<br/>
                           </span>
                           <span>
                              {v.age}<br/>
                           </span>
                           <span>
                              {v.phone}
                           </span>
                        </div>
                     );
                  })
                  : null
            }
         </div>
      );
   }
}
export default ATest;
