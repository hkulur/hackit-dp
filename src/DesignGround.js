import React, { Component } from 'react';
import utils from '../www/js/utils.js';
import Builder from './Builder';
import SiteTree from './SiteTree';
import FolderStructure from './FolderStructure';
import { Link } from 'react-router-dom';
class CraftBoard extends Component {
   constructor(props) {
       super(props);

       this.state = {
         showVDirectory: false
       }
  }
   showCompList() {
      var compList = document.querySelector('#comp-list'); // Using a class instead, see note below.
      compList.classList.toggle('show');
   };
   showJson() {
      var compList = document.querySelector('#comp-json'); // Using a class instead, see note below.
      compList.classList.toggle('show');
   };
   showSiteTree() {
      var compList = document.querySelector('#site-tree'); // Using a class instead, see note below.
      compList.classList.toggle('show');
   };
   componentWillMount() {
      $.ajax({
         url: "http://192.168.3.92:8000/theme/get_theme/",
         method: "POST",
         data: JSON.stringify({name: "GALE", json_data: window.tree, site_thumb: JSON.stringify(window.treeThumb) }),
         success: function(res){
            console.log(res);
         }
      });
   }
   saveTheme() {
      $.ajax({
         url: "http://192.168.3.92:8000/theme/save-theme/",
         method: "POST",
         data: JSON.stringify({name: "GALE", json_data: window.tree, site_thumb: JSON.stringify(window.treeThumb) }),
         success: function(res){
            console.log(res);
         }
      });
   };
   addAssets(assetsToSetFor) {
      return function() {
         this.setState({ showVDirectory: true, assetsToSetFor });
      }
   }
   switchToMobile () {
      const board = document.getElementById('board');
      board.classList.toggle('mobile');
   }
   render() {
      return (
         <div className="the-container">
            <div className=" site-tree-btn common-btn" onClick={this.showSiteTree}>
               Site Tree
            </div>
            <div className="col-md-12 button-list">
               <button  className={'common-btn build-tree-btn'} onClick={utils.buildTree.bind(utils)}>
                  Build Tree
               </button>
               <button className={'common-btn toggle-view-btn'} onClick={this.switchToMobile}>
                  Toggle View
               </button>
            </div>
            <div className="go-left" onClick={this.showCompList}>
               &gt;
            </div>
            <div id='site-tree' className="col-md-12 site-tree">
               <SiteTree />
            </div>
            <div id='comp-list' className="col-md-12 left-section">
               <div id="div3" className="col-md-10 comp-list">
                  <div className="comp-holder">
                     <span> component 1: </span>
                     <span className="select-for-add" data-forcomp="comp1" onClick={utils.clickForDrag.bind(utils)}> + </span>
                     <div id="comp1" data-compname="a-test-comp" className="a-test-component"
                        >
                        A TEST COMPONENT
                     </div>
                  </div>
                  <div className="comp-holder">
                     <span> component 2: </span>
                     <span className="select-for-add" data-forcomp="comp2" onClick={utils.clickForDrag.bind(utils)}> + </span>
                     <div id="comp2" data-compname="a-2nd-test-comp" className="col-md-12 a-test-component"
                        >
                        Another TEST COMPONENT
                     </div>
                  </div>
                  <div className="comp-holder">
                     <span> component 3: </span>
                     <span className="select-for-add" data-forcomp="comp3" onClick={utils.clickForDrag.bind(utils)}> + </span>
                     <div id="comp3" data-compname="a-row" className="a-row">
                        <span className="add-assets" onClick={this.addAssets('comp1')}>
                           +
                        </span>
                     </div>
                  </div>
                  <div className="comp-holder">
                     <span> component 4: </span>
                     <span className="select-for-add" data-forcomp="comp4" onClick={utils.clickForDrag.bind(utils)}> + </span>
                     <div id="comp4" data-compname="a-gid"
                         className="a-grid">
                        <div className="left" id="comp4-left" data-compname="a-gid-left" onDrop={utils.drop.bind(utils)} onDragOver={utils.allowDrop}>

                        </div>
                        <div className="left" id="comp4-right" data-compname="a-gid-right" onDrop={utils.drop.bind(utils)} onDragOver={utils.allowDrop}>

                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="mid-section" id="board">
               <div className='the-editor' id="_root" data-compname="index-page" onDrop={utils.drop.bind(utils)} onDragOver={utils.allowDrop}>

               </div>
               <div className='selected-one' id='selected-one' >

               </div>
               <div id="v-directory" className="v-directory">
                  <FolderStructure />
               </div>
            </div>
            <div id='comp-json' className="right-section">
               <div className="col-md-12">
                  <button onClick={this.saveTheme}>
                     Save The theme
                  </button>
                  <Link to={'/builder-test/'}>
                     Preview
                  </Link>
               </div>
               <pre>
                  <div id='the-tree-json' className="the-tree-json">

                  </div>
               </pre>
            </div>
            <div className="go-right" onClick={this.showJson}>
               &lt;
            </div>
         </div>
      );
   }
}
export default CraftBoard;
