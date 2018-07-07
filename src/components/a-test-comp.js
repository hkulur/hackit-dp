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
            A Second Component
            { 
               window.data ? 
                  window.data[this.props.pageStore.contentSource].map(v => {
                     return (
                        <div>
                           <span>
                              {v.carname}<br/>
                           </span>
                           <span>
                              {v.cost}<br/>
                           </span>
                           <span>
                              {v.color}
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
