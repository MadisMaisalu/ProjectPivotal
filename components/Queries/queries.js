import axios from "axios";
import {addKeywords} from "../Keywords/Keywords";
let data = require('../configuration.json');

const noomservice = data.noomservice;


        export async function NewToken() {


            try {
                let token2 = await axios.get('http://'+noomservice.server+':'+noomservice.port+'/api/?act='+noomservice.token+'&user='+noomservice.username+'&pass='+noomservice.password)
                    .then((response) => response.data.data.accesstoken);


                if (token2 !== null) {
                    localStorage.setItem('accesstoken', token2);
                    localStorage.setItem('tokenDate', Date.now());
                }
            } catch {
                console.log('logimispäring kukkus läbi');
            }
        }

        //generates a token to be accessed to the database queries
        async function accesstoken(name, pass) {

            try {
                // if (current timestamp) - (timestamp in local storage) equals to more than 28 800(8h), then token will be removed as it will be expired after 28 800s
                if ((Math.floor(new Date().getTime()/1000) - Math.floor(localStorage.getItem('tokenDate')/1000)) > 28800) {
                    localStorage.removeItem('accesstoken');
                    localStorage.removeItem('tokenDate');
                } // if there is no token in local storage, then one will be created
                if ((localStorage.getItem('accesstoken') === '') || (localStorage.getItem('accesstoken') === null)) {
                    await NewToken(name, pass);
                }
                if ((localStorage.getItem('accesstoken').length > 0)) {
                    console.log(document.getElementById('keywords').childElementCount);
                    if (document.getElementById('keywords').childElementCount === 1) {
                        console.log('käivitan addkeywords')
                        addKeywords();
                    }
                }

            } catch {

            }
        }


        export async function keywordRetrieve(){
            // if there is no token in local storage, wait for accesstoken to be created
            try {

                if ((localStorage.getItem('accesstoken') === '') || (localStorage.getItem('accesstoken') === null) ||
                   ((Math.floor(new Date().getTime()/1000) - Math.floor(localStorage.getItem('tokenDate')/1000)) > 28800)) {
                    await accesstoken();
                }
                keywords = await axios.get('http://'+noomservice.server+':'+noomservice.port+'/api/?act=query&qid='+noomservice.verdoc_keyword_qid+'&accesstoken=' + localStorage.getItem('accesstoken'))
                    .then((response) => response.data.data);

            } catch{
                console.log('kukkusin catch-i');
            }
        }
        export var keywords;


        export async function mainRetrieve(id) {
            if ((localStorage.getItem('accesstoken') === '') || (localStorage.getItem('accesstoken') === null)) {
                await keywordRetrieve();
            }
            keywordContent = await axios.get('http://'+noomservice.server+':'+noomservice.port+'/api/?act=query&qid='+noomservice.verdoc_keyword_qid+'&par.id='+id+'&accesstoken='+localStorage.getItem('accesstoken'))
                .then((response) => response.data.data[0]);

            examplesContent = await axios.get('http://'+noomservice.server+':'+noomservice.port+'/api/?act=query&qid='+noomservice.verdoc_keyword_rel_qid+'&par.id='+id+'&par.case=EXAMPLE&accesstoken='+localStorage.getItem('accesstoken'))
                .then((response) => response.data);

            updatesContent = await axios.get('http://'+noomservice.server+':'+noomservice.port+'/api/?act=query&qid='+noomservice.verdoc_keyword_rel_qid+'&par.id='+id+'&par.case=UPDATE&accesstoken='+localStorage.getItem('accesstoken'))
                .then((response) => response.data.data);

            childUpdatesContent = await axios.get('http://'+noomservice.server+':'+noomservice.port+'/api/?act=query&qid='+noomservice.verdoc_keyword_rel_qid+'&par.id='+id+'&par.case=CHILDUPDATE&accesstoken='+localStorage.getItem('accesstoken'))
                .then((response) => response.data.data);
        }
        export var keywordContent;
        export var examplesContent;
        export var updatesContent;
        export var childUpdatesContent;


export async function postUpdates(type, contenttext, user) {
    request = await axios.post('http://'+noomservice.server+':'+noomservice.port+'/api/?act=query&qid='+noomservice.verdoc_ver_updates_qid+'&qop.insert&attrib=opinfo&accesstoken='+localStorage.getItem('accesstoken'), {
        data: [
            {
                updatetype: type,
                content: contenttext,
                usercommit: user
            }
        ]
    })
        .then((response) => console.log(response))
        .catch(function () {
            request = false;
        });
}
export var request;