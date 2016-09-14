import React from 'react';
import ReactDOM from 'react-dom';

export default class TripDetailsCard extends React.Component {
  render() {
    return (
      <div className="col s12 m4 semi-transparent">
        <div className="card">
          <div className="card-image">
            <img src="img/acropolis.jpg"/>
            <span className="card-title">Athens</span>
          </div>
          <div className="card-content">
            <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>
    );
  }
}
