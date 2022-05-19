import React from 'react';
import './main.css';
import {swapColor} from "../App/App";
import {currentlyActive} from "../Keywords/Keywords.js";
import {
    keywordContent,
    examplesContent,
    updatesContent,
    mainRetrieve,
    childUpdatesContent,
    postUpdates,
    request
} from "../Queries/queries";
import Button from "../Button/Button";

function updatesAndExamples(importvar, varname) { // gets importvar as constant and varname as string
    for (let i = 0; i < importvar.length; i++) {

        const box = document.createElement('div');
        const title = document.createElement('p');
        const content = document.createElement('p');
        let titletext;
        let contenttext;
        title.addEventListener('click', toggle);
        title.setAttribute('class', 'exampleTitle');
        if (varname === 'examplesContent') {
            content.setAttribute('class', 'exampleContent closed');
            titletext = document.createTextNode('NÄIDE: '+examplesContent[i].versionnumber + ' | ' + examplesContent[i].versiondate);
            contenttext = document.createTextNode(examplesContent[i].content);
        } else if (varname === 'updatesContent') {
            content.setAttribute('class', 'exampleContent');
            titletext = document.createTextNode('UUENDUS: '+updatesContent[i].versionnumber + ' | ' + updatesContent[i].versiondate);
            contenttext = document.createTextNode(updatesContent[i].content);
        } else if (varname === 'childUpdatesContent') {
            content.setAttribute('class', 'exampleContent');
            titletext = document.createTextNode('UUENDUS: '+childUpdatesContent[i].versionnumber + ' | ' + childUpdatesContent[i].versiondate);
            contenttext = document.createTextNode(childUpdatesContent[i].content);
        }
        box.appendChild(title);
        box.appendChild(content);
        title.appendChild(titletext);
        content.appendChild(contenttext);
        if (varname === 'examplesContent') {
            document.getElementById("examples").appendChild(box);
        } else if (varname === 'updatesContent' || varname === 'childUpdatesContent') {
            document.getElementById("updates").appendChild(box);
        }

    }
}

function toggle(event) {
    let contentbox = event.target.nextElementSibling;
    contentbox.style.transitionDuration = '0.3s';

    if (contentbox.classList.contains('closed')) {
        contentbox.classList.remove('closed');
        contentbox.classList.add('open');

    } else {
        contentbox.classList.remove('open');
        contentbox.classList.add('closed');
    }
    setTimeout(() => contentbox.removeAttribute('style'), 300);
}

export async function displayKeywordContent(id) {

    let exampleBox = document.getElementById('examples');
    while (exampleBox.lastChild) {
        exampleBox.removeChild(exampleBox.lastChild);
    }
    let updateBox = document.getElementById('updates');
    while (updateBox.lastChild) {
        updateBox.removeChild(updateBox.lastChild);
    }

    //await keywordRetrieve();
    await mainRetrieve(id);
    if (currentlyActive() !== null) {

        let content = keywordContent.content.replace(/(\r\n|\n|\r)/gm, '<br>');

        let type = keywordContent.keywordtype;

        // API returns type as written in cases. Rewritten to make it more understandable to newcomers
        // and to translate it into Estonian
        switch(type){
            case 'FUNC':
                type = 'Funktsioon';
                break;
            case 'GLOBEVAR':
                type = 'Globaalne muutuja';
                break;
            case 'SYSCONF':
                type = 'Süsteemi konfiguratsioon';
                break;
            case 'SYSSCR':
                type = 'Süsteemne skript'
                break;
            case 'GLOBVAR':
                type = 'Globaalne muutuja'
                break;
            default:
                type = ''
        }

        let deprecation = keywordContent.deprecated;
        if (deprecation === '-' || deprecation === undefined) {
            deprecation = 'Ei';
        } else if (deprecation === '+') {
            deprecation = 'JAH';
        } else {
            deprecation = 'Info puudub';
        }

        if (document.querySelector('h1') === null){ // If keyword explanation structure exists
            document.querySelector('#type > h3').innerHTML = type;
            document.querySelector('#content > p').innerHTML = content;

        } else { // If the structure does not exist, then create it
            document.querySelector('h1').remove();
            document.querySelector('#type').appendChild(document.createElement('h3')).innerHTML = type;
            document.querySelector('#type').appendChild(document.createElement('p')).innerHTML = 'Aegunud: '+deprecation;
            document.querySelector('#content').appendChild(document.createElement('p')).innerHTML = content;
        }
        document.querySelector('h2').innerHTML = keywordContent.keywordname;


        updatesAndExamples(examplesContent, 'examplesContent');
        updatesAndExamples(updatesContent, 'updatesContent');
        updatesAndExamples(childUpdatesContent, 'childUpdatesContent');

        document.getElementById('addContent').style.display = 'block';

    }
    if (localStorage.getItem('code size') !== null){
        document.querySelectorAll('#content > p').forEach(el => {
            el.style.fontSize = localStorage.getItem('code size')+'px';
        });
    }
}



export default class Main extends React.Component {



    render() {
        return (
            <div id="main">
                    <div id="colorMode" title="Toggle theme" onClick={swapColor}>
                    </div>
                    <h1>Vali vasakust menüüst sobiv element</h1>
                    <h2> </h2>
                    <div className="mainBody">
                        <div id="type">
                        </div>
                        <div id="content">
                        </div>
                        <div id="examples">
                        </div>
                        <div id="updates">
                        </div>
                        <div style={{display:'none'}} id="addContent">
                            <form>
                                <div id="addContentChoices">
                                    <div>
                                        <input type="radio" id="addUpdate" name="contentChoice"/>
                                        <label htmlFor="addUpdate">uuendus</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="addComment" name="contentChoice"/>
                                        <label htmlFor="addComment">kommentaar</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="addExample" name="contentChoice"/>
                                        <label htmlFor="addExample">näide</label>
                                    </div>
                                </div>
                                <input name="addContentEditor" id="addContentEditor" placeholder="Muutja nimi"/>
                                <textarea name="addContentText" id="addContentText" placeholder="Sisu"/>
                                <Button id="submitNewContent" name="SISESTA" click={addContent}/>
                            </form>
                            <div id="successMessage" style={{visibility: 'hidden'}}>
                                <p>
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
            )
        }
}