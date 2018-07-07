import React, { Component } from 'react';
import map from 'lodash/map';
import utils from '../www/js/utils.js';
// import from './styles.css';


const folderData ={
  child: [
    {
      id: Math.random(),
      type: 'folder',
      name: '__root',
      child: [
      ],
    }
  ]
}

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      isAdding: false,
    }
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen})
  }

  addNew() {
    this.setState({ isAdding: !this.state.isAdding})
  }

  render() {
    const { name, id, children, addingValue, setValue, setValueIn, newValue, addNewName, onAddClick } = this.props;
    const { isOpen, isAdding } = this.state;
    return (
      <div className="folder-icon" onDoubleClick={() => { this.addNew(); }}>
        {name}:
        <span onClick={() => { this.toggle(); }} className="small-plus"> + </span>
        {isAdding &&
          <select value={addingValue} onChange={(e) => { setValue(e.target.value, id); this.setState({ isOpen: true }); }}>
            <option value="file">Add a page</option>
            <option value="folder">Add a branch(Group of many page)</option>
          </select>
        }
        {isOpen &&
          <div>
            {children}
            {addingValue !== '' && setValueIn === id &&
              <div>
                <input type='text' value={newValue} onChange={(e) => { addNewName(e.target.value); }} placeholder={`Enter ${addingValue} name`} />
                <button onClick={() => { onAddClick(); this.setState({ isOpen: true }); }}>Add</button>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

class File extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { name, id } = this.props;
    return (
      <div>{name}</div>
    );
  }
}

class FolderStructure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: folderData,
      addingValue: 'Select',
      setValueIn: '',
      newValue: '',
      searchStr: '',
      dataStore: ['http://lag/hju/ola.jpg', 'http://xyz/hju/ola.jpg', 'http://tta/hju/kaa.jpg'],
    };
  }

  setValue(val, id) {
    this.setState({ addingValue: val, setValueIn: id });
  }

  addNewName(val) {
    this.setState({ newValue: val });
  }
  editPage(pageName) {
    return function() {
      utils.addAPage(pageName);
    }
  }

  trace(data, lookingFor) {
    const { newValue, addingValue, setValueIn } = this.state;
    if(!data) return null;
    for(var i = 0; i < data.length; i++)
    {
      const dt = data[i];
      // debugger;
      if(dt.id === lookingFor) {
        console.log('HIT');
        if (addingValue === 'folder') {
          data[i].child.push({ id: Math.random(), name: newValue, type: addingValue, child: [] });
          // data[kys[i]].child = {...data[kys[i]].child, newValue: { id: 1234, name: newValue, type: addingValue, child: [] }};
        } else {
          data[i].child.push({ id: Math.random(), name: newValue, type: addingValue });
          // data[kys[i]].child = {...data[kys[i]].child, newValue: { id: 1234, name: newValue, type: addingValue }};
        }

        return data;
      } else {
        data[i].child = this.trace(data[i].child,lookingFor);
      }
    }
    return data;
  }

  onAddClick() {
    let data = this.state.data;
    let mapped = '';
    const ka = this.trace(JSON.parse(JSON.stringify(data.child)), this.state.setValueIn);
    data.child = ka;
    this.setState({ data, addingValue: '' });

  }
  filterTheStructure(data) {
    let isFound = false;
    let searchStr = document.getElementById('searchStr');
    searchStr = searchStr ? searchStr.value : '';
    const ary = [];
    for(var i=0;i<(data.child && data.child.length);i++){
      const l = this.filterTheStructure(data.child[i]);
      data.child[i] = l[0];
      if(l[1]) {
        data.child[i].display = 'block';
        isFound = isFound || true;
      }
      else if(data.child[i].name.indexOf(searchStr) > -1 || searchStr === '') {
        data.child[i].display = 'block';
        isFound = isFound || true;
      } else {
        data.child[i].display = 'none';
        isFound = isFound || false;
      }
    }
    if(!data.child && (data.name.indexOf(searchStr) > -1 || searchStr === ''))
    {
      data.display = 'block';
    } else if(!(data.name && (data.name.indexOf(searchStr) > -1 || searchStr === ''))) {
      data.display = 'none';
    }
    return [data, (isFound || false)];
  }
  getStructure(data) {
    const { addingValue, setValueIn, newValue } = this.state;
    let searchStr = document.getElementById('searchStr');
    searchStr = searchStr ? searchStr.value : '';
    if (data && data.child) {
     return data.child.map(dt => {
          const display = dt.display;
          if (dt.type === 'folder') {
            return (
              <div style={{ marginTop: '20px', paddingLeft: '40px', display}}>
                <Folder
                  key={dt.id}
                  name={dt.name}
                  id={dt.id}
                  setValue={(val, id) => { this.setValue(val, id); }}
                  addingValue={addingValue}
                  setValueIn={setValueIn}
                  newValue={newValue}
                  addNewName={(val) => { this.addNewName(val); }}
                  onAddClick={() => this.onAddClick()}
                >
                  {this.getStructure(dt)}
                </Folder>
              </div>
            );
          } else {
            return (
              <div style={{ marginTop: '20px', paddingLeft: '40px', display}}>
                <div className="page-icon">
                  <span className="text">
                    {dt.name} page
                  </span>
                  <div id={`data-connect${dt.id}`} className="connector-dot" draggable="true" onDragStart={utils.drag.bind(utils)}>
                  </div>
                  <div className="store-connector-line" id={`data-connect${dt.id}-line`} data-pagename={dt.name}>
                  </div>
                </div>
              </div>
            );
          }
      });
    }
  };
  getDataClaster() {
    return this.state.dataStore.map((d, i) => {
      const color = "#"+((1<<24)*Math.random()|0).toString(16);
      return (
        <div className="data-claster common-btn" id={Math.random()} data-storename={d} onDrop={utils.connectedToDataStore.bind(utils)} data-linepos={`${(i * 20)}`} onDragOver={utils.allowDrop}>
          <div className="data-connector-color" style={{ left: `${(i * 20 * -1)}px`, top: `${(i * 50 + 10)}px`, backgroundColor: color }}></div>
          <div className="data-connector-color-v" style={{ left: `${(i * 20 * -1)}px`, width: `${((i+1) * 20)}px`, top: `${(i * 50 + 10)}px`, backgroundColor: color }}></div>
          {d}
        </div>
      );
    });
  };
  closeModal() {
    const y=document.getElementById('v-directory');
      y && y.classList.toggle('show');
  };
  searchFile() {
    const searchStr = document.getElementById('searchStr').value;
    const data = this.filterTheStructure(this.state.data);
    this.setState({ searchStr, data: data[0] });
  }
  render() {
    const { data, dataStore } = this.state;
    console.log(data, 'new');
    return (
      <div className="col-md-12 v-dir">
        <h1>Assets Directory <span className="close-icon" onClick={this.closeModal}><b>X</b></span></h1>
        <input className='col-md-4' id='searchStr' onChange={() => this.searchFile()}></input>
        <div className="col-md-10">
          {this.getStructure(data)}
        </div>
        <div className="col-md-2 data-claster-holder">
          {this.getDataClaster()}
        </div>
      </div>
    );
  }
}

export default FolderStructure;
