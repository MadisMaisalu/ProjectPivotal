import Button from "../Button/Button";
import './sidebar.css';
import Search from "../Search/Search";
import Keywords from "../Keywords/Keywords.js";
import React from "react";
import Settings, {settingsVisibility} from "../Settings/Settings.js";
import Help, {helpVisibility} from "../Help/Help.js";

function hideSidebar(){ //for opening and closing the sidebar


  const sidebarElement = document.getElementById('sidebar');

  if (sidebarElement.className === 'visible') { // if sidebar has class "visible", then do changes
      sidebarElement.style.transitionDuration = '0.3s';
      document.getElementById('btn').innerHTML = '>'; //these are special case and do not go under 'for' loop
      sidebarElement.className = 'hidden'; // hidden class in sidebar.css, where width is 0
      sidebarElement.childNodes.display = 'none';
      document.getElementById('search').style.display = 'none';

      //all other elements to be made invisible
      let elements = document.getElementById('sidebar').getElementsByTagName('div');
      for (let i = 7; i < elements.length; i++) { // if you add elements into sidebar, fix the index value to the correct number
          elements[i].style.display = 'none';
      }
  }

  // just like previous block except in reverse
  else if (sidebarElement.className === 'hidden') {
      sidebarElement.style.transitionDuration = '0.3s';
      sidebarElement.className = 'visible';
      document.getElementById('btn').innerHTML = '<';


          document.getElementById('search').style.display = 'block';
          let elements = document.getElementById('sidebar').getElementsByTagName('div');
          for (let i = 6; i < elements.length; i++) {
              elements[i].style.display = 'block';
          }
          document.getElementById('bottomButtons').style.display = 'flex'; // has to be flex otherwise it breaks
          document.getElementById('keywordsAndVersions').style.display = 'flex';
          document.getElementById('sidebarHeader').style.display = 'flex';


  }
    setTimeout(() => sidebarElement.removeAttribute('style'), 300);
}


function Sidebar() {
    return (
            <div id="sidebar" className="visible">
                <Settings/>
                <Help />
                <div id="sidebarHeader">
                    <Button name="<" click={hideSidebar} id="btn" title="Toggle sidebar"/>
                    <Search />
                </div>
                <div id="keywordsAndVersions">
                    <Button id="home" name="Võtmesõnad" />
                    <Button id="versions" name="Versioonid"/>
                </div>
                <Keywords />
                <div id="bottomButtons">
                    <Button id="Settings" click={settingsVisibility} name="SEADISTUS"/>
                    <Button id="Help" click={helpVisibility} name="ABI"/>
                </div>

            </div>
    );
}


export default Sidebar;