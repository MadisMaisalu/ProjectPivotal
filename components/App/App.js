import React from 'react';
import './App.css';
import Sidebar from "../Sidebar/Sidebar.js";
import Main from "../Main/Main.js";

export function swapColor() {

  let general = document.getElementById('general');

  // If you press on the toggler, then your option will be saved into the local storage
  // used in Main.js
  if (general.classList.contains('dark')) {
    general.classList.remove('dark');
    localStorage.setItem('mode', 'light');
  } else {
    general.classList.add('dark')
    localStorage.setItem('mode', 'dark');
  }
}

export default class App extends React.Component {

  componentDidMount() {
    // Gets data about your style mode, uses local storage instead of cookies
    if (localStorage.getItem('mode') === 'dark') {
      let general = document.getElementById('general');
      if (!general.classList.contains('dark')){
        general.classList.add('dark')
      }
    }
  }

  render() {

    return (
    <div id="general" className="general">

      <Sidebar/>
      <Main/>
    </div>
    )
  }
}
