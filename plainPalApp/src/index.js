import React from "react";
import ReactDOM from "react-dom";

import TripDetailsCard from './pages/TripDetailsCard.jsx';
// ReactDOM.render(
//   <h1>Hello!</h1>,
//   document.getElementById("root")
// );

// import Hello from './pages/hello.jsx';
// import DashboardApp from './pages/dashboard.jsx';
//
(function(){
  $(".button-collapse").sideNav();
});

class App extends React.Component{
  render() {
    return (
      <div className='row'>
        <TripDetailsCard />
        <TripDetailsCard />
        <TripDetailsCard />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
