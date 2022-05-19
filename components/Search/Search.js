import React from 'react';
import './search.css';

function useSearch() {
    let value = document.getElementById('search').value;
    value = value.toLowerCase();
    let keyword = document.querySelectorAll('#keywords > p');

    // otsing on tõstutundetu
    for (let i = 0; i < keyword.length; i++) {
        if (!keyword[i].innerHTML.toLowerCase().includes(value)) {
            keyword[i].style.display='none';
        }
        else {
            keyword[i].style.display='block';
        }
    }
}


export default class Search extends React.Component {

    componentDidMount() {
        document.getElementById('search').focus();
        document.getElementById('search').addEventListener('keyup', useSearch);
    }


    render() {
        return (
            <input title="Otsi võtmesõnu" id="search" placeholder="Otsi võtmesõnu..."/>
        )
    }
}


