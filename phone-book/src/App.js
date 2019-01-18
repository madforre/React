import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: 'madforre',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: 'linc',
        phone: '010-0000-0001'
      }
    ]
  }
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    })
    console.log(data);
  }
  render() {
    const { information } = this.state;
    return (
      <div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <PhoneForm 
          // 자식에게 전달할 함수 onCreate
          onCreate={this.handleCreate}
        />
        {JSON.stringify(information)}
      </div>
    );
  }
}

export default App;