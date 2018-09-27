import React, { Component } from 'react';
import './NewPerson.css';

class Logout extends Component {
  render(){
    localStorage.clear();
    window.location.assign("/")
    return(
       <div>
      </div>
      );
  }
}

export default Logout;
