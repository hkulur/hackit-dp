import React, { Component } from 'react';
import map from 'lodash/map';
import utils from '../www/js/utils.js';
// import from './styles.css';


const folderData ={
  child: [
    {
      id: Math.random(),
      type: 'folder',
      name: '__Root',
      child: [],
    }
  ]
}

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      isAdding: false
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
      <div>
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle branch-drop-down" type="button" data-toggle="dropdown">{name}
          <span className="caret"></span></button>
          <ul className="dropdown-menu">
            <li onClick={() => { this.toggle(); }}>Expand/ Collapse</li>
            <li onClick={(e) => { setValue('file', id); this.setState({ isOpen: true });}}>Add Page</li>
            <li onClick={(e) => { setValue('folder', id); this.setState({ isOpen: true }); }}>Add Branch</li>
          </ul>
        </div>
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
      dataStore: ['userData', 'itemData', 'locationData'],
    };
  }

  setValue(val, id) {
    this.setState({ addingValue: val, setValueIn: id });
  }

  addNewName(val) {
    this.setState({ newValue: val });
  }
  editPage(pageName) {
      utils.addAPage(pageName);
  }
  onAddClick() {
    let data = this.state.data;
    let mapped = '';
    const ka = this.trace(JSON.parse(JSON.stringify(data.child)), this.state.setValueIn);
    data.child = ka;
    this.setState({ data, addingValue: '' });

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
  deleteRecur(data, lookingFor) {
    if(data.id == lookingFor)
    {
      return 'delete';
    }
    for(var i=0;i<(data.child && data.child.length);i++){
      const v=this.deleteRecur(data.child[i], lookingFor);
      if(v=='delete')
      data.child.splice(i, 1);

    }
    return data;
  }
  deleteStructure(lookingFor) {
    let d = this.state.data;
    d = this.deleteRecur(d, lookingFor);
    this.setState({ data: d });
  }
  getStructure(data) {
    const { addingValue, setValueIn, newValue } = this.state;
    if (data && data.child) {
     return data.child.map(dt => {
        //const dt = data[id];
          console.log(dt);
          if (dt.type === 'folder') {
            return (
              <div style={{ marginTop: '5px', paddingLeft: '100px'}}>
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
              <div style={{ marginTop: '5px', paddingLeft: '100px'}}>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle page-drop-down" type="button" data-toggle="dropdown">{dt.name} ( page )
                    <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                      <li onClick={() => this.editPage(dt.name)}>Edit</li>
                      <li onClick={() => this.deleteStructure(dt.id)}>Delete</li>
                    </ul>
                  </div>
                  <div id={`data-connect${dt.id}`} className="connector-dot" draggable="true" onDragStart={utils.drag.bind(utils)}>
                  </div>
                  <div className="store-connector-line" id={`data-connect${dt.id}-line`} data-pagename={dt.name}>
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
  render() {
    const { data, dataStore } = this.state;
    console.log(data, 'new');
    return (
      <div className="col-md-12">
        <h1>Tree structure of the site</h1>
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
