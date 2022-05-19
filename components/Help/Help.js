import React from 'react';
import Button from "../Button/Button.js";
import './help.css';

export function helpVisibility(){
    const helpMenu = document.getElementById('helpMenu');

    if (helpMenu.style.display === 'none') {
        helpMenu.style.display = 'block';

    } else {
        helpMenu.style.display = 'none';
    }

}

export default class Help extends React.Component {
    componentDidMount() {
        console.log(document.querySelector('#helpContent > p').firstChild);
    }

    render(){
        return(
            <div id="helpMenu" style={{display: 'none'}}>
                <Button id="closeHelp" click={helpVisibility} name="X"/>
                <div id="helpContent">
                    <h4>Abi</h4>

                    <p>See on <span className="highlight-content">NOOM</span> tarkvara dokumentatsiooni lehekülg.
                    Siit leiad arenduse jaoks vajalikku informatsiooni.</p>

                    <p>Vajutades võtmesõnade loetelus <span className="highlight-content"> võtmesõnale</span>,
                     näed selle kohta käivat informatsiooni.</p>

                    <p style={{marginBottom: '0'}}>Võtmesõnade tüübid jaotuvad järgnevalt:</p> <span className="highlight-content">
                        <ul style={{marginTop: '0'}}>
                            <li>Funktsioonid</li>
                            <li>Globaalsed muutujad</li>
                            <li>Süsteemi konfiguratsioon</li>
                            <li>Süsteemsed skriptid</li>
                        </ul></span>
                    <p>Isikikke seadistusi saab teha seadistuste menüüst, millele pääseb ligi vajutades
                        <span className="highlight-content"> seadistuste </span>nupule
                    võtmesõnade all.</p>
                    <p><span className="highlight-content">Dark </span> ja <span className="highlight-content">Light</span> mode saab valida üleval paremas nurgas olevale
                        <span className="highlight-content"> kuu </span>või<span className="highlight-content"> päikese </span>
                    sümbolile vajutades.</p>

                    <p>Kõik elementide väärtused, mis kasutaja saab redigeerida, näiteks tekstide suurused, salvestatakse brauseri <span className="highlight-content">local storage</span>'isse.</p>
                </div>
            </div>
        )
    }
}