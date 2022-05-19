import React from 'react';
import './keywords.css';
import {keywordRetrieve} from "../Queries/queries";
import {keywords} from "../Queries/queries.js";
import {displayKeywordContent} from "../Main/Main.js";


let previousTarget;
export async function makeActive(event) {

    // for marking active element when pressing on one in the keywords section
    if (typeof previousTarget !== 'undefined') { // if there is already an element marked active, remove it first
        previousTarget.classList.remove('activeKeyword');
    }
    event.target.classList.add('activeKeyword'); // activeKeyword is the class that defines active element
    //await mainRetrieve();
    await displayKeywordContent(currentlyActive()); // displayKeywordContent is for information in the #main div
    previousTarget = event.target;

}

export function currentlyActive() { // currentlyActive returns the ID of the element which you click on
    if (document.querySelector('.activeKeyword') !== null) {
        return document.querySelector('.activeKeyword').getAttribute('id');
    } else {
        return null;
    }
}


export async function addKeywords() {
    let preloader = document.querySelector('.preloaderUnit');
    let keywordsElement = document.getElementById('keywords');

    if (preloader === null) {
        while (keywordsElement.lastChild) {
            keywordsElement.removeChild(keywordsElement.lastChild);
        }
    }

    try {
        await keywordRetrieve();

        for (let i = 0; i < keywords.length; i++) {
            if ((preloader !== null)
                && (document.getElementById('keywords').childElementCount >= 1)) {
                preloader.remove();
                // this will remove the preloader as soon as at least one keyword has been added to the list.
                // It is inside the loop to remove it on the first go to avoid the loader still being there
                // if the connection might be lagging
            }
            const node = document.createElement('p');
            const keywordNode = document.createTextNode(keywords[i].keywordname);
            node.addEventListener('click', makeActive);
            node.setAttribute('id', keywords[i].id);
            node.setAttribute('class', keywords[i].keywordtype);
            node.appendChild(keywordNode);
            document.getElementById("keywords").appendChild(node);
        }

        if (localStorage.getItem('keyword size') !== null){
            document.querySelectorAll('#keywords > p').forEach(el => {
                el.style.fontSize = localStorage.getItem('keyword size')+'px';
            });
        }

    } catch(e) {
        console.log(e);
    }
}

export default class Keywords extends React.Component {

    async componentDidMount() { // to make sure that the website loads in before adding keywords
        await addKeywords();
    }

    render() {

        return(
            <div id="keywords">
                <div className="preloaderUnit">
                    <div id="preloader">
                    </div>
                    <p>Laen...</p>
                </div>
            </div>
        )
    }
}

