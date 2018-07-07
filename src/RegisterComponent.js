import React, { Component } from 'react';
var AllComponents = require('./components');
import ReactDOMServer from 'react-dom/server';
class RegisterComponent extends Component {

   constructor (props) {
      super(props);
      this.state = {
         showRegisterButton: false,
         component: '',
         title: ''
      }
      this.registerComp = this.registerComp.bind(this);
   };

   searchComp() {
      const component = document.getElementById('register-component-name').value;
      const title = document.getElementById('register-component-title').value;
      var Ele=AllComponents[component];
      if (Ele) {
         document.getElementById('test-id').innerHTML = ReactDOMServer.renderToString(<Ele />);
         this.setState({ showRegisterButton: true, component, title });
      } else {
         document.getElementById('test-id').innerHTML = ReactDOMServer.renderToString(<div>NO Such Component Found</div>);
      }
   }

   registerComp() {
      const compToRegister = (document.getElementById('test-id'));
      document.getElementById('raw').innerHTML = "`"+compToRegister.innerHTML+"`";
      const { component, title } = this.state;
      const data1 = {
         "name": JSON.stringify(component) || '',
         "title": title || '',
         "content": compToRegister || '',
      }
      $.ajax({
         url: "http://192.168.3.92:8000/theme/set_thumbnail/",
         method: "POST",
         data: data1,
         success: function(res){
            console.log(res);
         }
      });
   }

   render() {
      return (
         <div className="register-component">
            <div>Enter the Component to register</div>
            <input type="text" id={'register-component-name'} placeholder={'Enter Component Name'}></input>
            <input type="text" id={'register-component-title'} placeholder={'Enter Thumbnail Title'}></input>
            <button onClick={() => { this.searchComp(); }}>Search Component</button>
            <br />
            <div id={'test-id'}></div>
            <code>
            <div id='raw'>

            </div>
            </code>
            <button onClick={this.registerComp}>Register</button>
         </div>
      );
   }
}
export default RegisterComponent;
