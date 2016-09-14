import React from 'react';
import ReactDOM from 'react-dom'; // needed to mount React components

class Hello extends React.Component {
  render() {
    return (
      <div class='row'>
        
      </div>
    )
  }
}

ReactDOM.render(<Hello/>, document.getElementById('hello'));
