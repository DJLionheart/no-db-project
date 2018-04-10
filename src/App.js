//Node_Modules
import React, { Component } from 'react';
//import axios from 'axios';

//Components
import Logo from './Components/Logo/Logo';
import Console from './Components/Console/Console'

//Style and Other
import './App.css';


//const serverUrl = "/api/gamertrax";

class App extends Component {
 
  // componentDidMount() {
  //   axios.get(serverUrl, )
  // }
  render() {
    return (
      <div>
        <Logo/>
        <Console />
      </div>
    );
  }
}

export default App;
