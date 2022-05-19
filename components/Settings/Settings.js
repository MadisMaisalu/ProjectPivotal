import React from 'react';
import Button from "../Button/Button.js";
import Slider from "../Slider/Slider.js";
import './settings.css';

export function settingsVisibility(){
    const settingsMenu = document.getElementById('settingsMenu');

    if (settingsMenu.style.display === 'none') {
        settingsMenu.style.display = 'block';

    } else {
        settingsMenu.style.display = 'none';
    }

}

export default class Settings extends React.Component {


    componentDidMount() {

        document.getElementById('keywordSize').oninput = function() { // when changing the values, mark them in localStorage and use them
            document.querySelectorAll('#keywords > p').forEach(el => {
                el.style.fontSize = this.value+'px';
            });
            localStorage.setItem('keyword size', this.value);
        }
        document.getElementById('codeSize').oninput = function() {
            let code = document.querySelector('#content > p');
            if (code !== null) {
                code.style.fontSize = this.value+'px';
                localStorage.setItem('code size', this.value);
            }
        }
    }

    render(){
        return(
            <div id="settingsMenu" style={{display: 'none'}}>
                <Button id="closeSettings" click={settingsVisibility} name="X"/>
                <div id="settingsContent">
                    <h4>Seadistus</h4>
                    <Slider id='keywordSize' name='Võtmesõnade suurus' min='15' max='30' value={localStorage.getItem('keyword size')}/>
                    <Slider id='codeSize' name='Koodi suurus' min='15' max='30' value={localStorage.getItem('code size')}/>
                </div>
            </div>
        )
    }
}