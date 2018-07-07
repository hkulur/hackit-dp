import React, { Component } from 'react';
import map from 'lodash/map';
// import from './styles.css';


const folderData ={
  child: [
    {
      id: 1,
      type: 'folder',
      name: 'base',
      child: [
        {
          id: 11,
          type: 'folder',
          name: 'child1',
          child: []
        },
        {
          id: 12, 
          type: 'folder',
          name: 'child2',
          child: [
            {
              id: 123,
              type: 'file',
              name: 'file1',
            }
          ]
        }
      ],
    }
  ]
}

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
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
      <div>{name}: 
        <button onClick={() => { this.toggle(); }}>{isOpen ? 'Close' : 'Open'}</button>
        <button onClick={() => { this.addNew(); }}>+</button>
        {isAdding && 
          <select value={addingValue} onChange={(e) => { setValue(e.target.value, id); this.setState({ isOpen: true, }); }}>
            <option value="file">File</option>
            <option value="folder">Folder</option>
          </select>
        }
        {isOpen && 
          <div>
            {children}
            {addingValue !== '' && setValueIn === id && 
              <div>
                <input type='text' value={newValue} onChange={(e) => { addNewName(e.target.value); }} placeholder={`Enter ${addingValue} name`} />
                <button onClick={() => { onAddClick(); this.setState({ isOpen: false, }); }}>Add</button>
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
    };
  }

  setValue(val, id) {
    this.setState({ addingValue: val, setValueIn: id });
  }

  addNewName(val) {
    this.setState({ newValue: val });
  }

  trace(data, lookingFor) {
    const { newValue, addingValue, setValueIn } = this.state;
    // debugger;
    for(var i = 0; i < data.length; i++)
    {
      const dt = data[i];
      // debugger;
      if(dt.id === lookingFor) {
        console.log('HIT');
        if (addingValue === 'folder') {
          data[i].child.push({ id: 888, name: newValue, type: addingValue, child: [] });
          // data[kys[i]].child = {...data[kys[i]].child, newValue: { id: 1234, name: newValue, type: addingValue, child: [] }}; 
        } else {
          data[i].child.push({ id: 777, name: newValue, type: addingValue });
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

  getStructure(data) {
    const { addingValue, setValueIn, newValue } = this.state;
    if (data && data.child) {
     return data.child.map(dt => {
        //const dt = data[id];
          console.log(dt);
          if (dt.type === 'folder') {
            return (
              <div style={{ marginTop: '20px', paddingLeft: '20px'}}>
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
              <div style={{ marginTop: '20px', paddingLeft: '20px'}}>
                <File key={dt.id} name={dt.name} id={dt.id} />
              </div>
            );
          }
      });
    }
  }
  hideVDir() {
    document.getElementById('v-directory').classList.toggle('show');
  };
  render() {
    const { data } = this.state;
    console.log(data, 'new');
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
        <div onClick={this.hideVDir}>
          X
        </div>
        <div style={{ width: '500px', height: '100%', backgroundColor: 'white', padding: '40px',}}>
          {this.getStructure(data)}
        </div>
      </div>
    );
  }
}

export default FolderStructure;