window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            web3.eth.sendTransaction({ });
        } catch (error) {
            web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d81a3501521247ce9a510f4e8317219b"));
        }
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        web3.eth.sendTransaction({/* ... */ });
    }
    else {
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d81a3501521247ce9a510f4e8317219b"));
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

$(".noreload").click(function(event) {
    event.preventDefault();
})

function query() {
    docQuery(
        document.getElementById('title').value, 
        document.getElementById('index').value
    );
}

var hash;

async function getHash(blob, algo = "SHA-256") {
    const buf = await new Response(blob).arrayBuffer();
    const hashd = await crypto.subtle.digest(algo, buf);
    let result = '';
    const view = new DataView(hashd);
    for (let i = 0; i < hashd.byteLength; i += 4) {
        result += view.getUint32(i).toString(16).padStart(2, '0');
    }
    return result;
}
inp.onchange = async e => {
    var eth_hash = "0x" + await getHash(inp.files[0]);
    hash = eth_hash;
    console.log(eth_hash);
};


async function tempCheck() {
    var n = document.getElementById('title').value;
    var id = document.getElementById('index').value;
    checkTemp(n, id);
}

function mySig() {
    var n = document.getElementById('title').value;
    var id = document.getElementById('index').value;
    signDoc(n, id);
}

function int() {
    var title = document.getElementById('title').value;
    var description = document.getElementById('desc').value;
    var signee = document.getElementById('multi').value;
    var docHash;
    if (hash != undefined) {
        docHash = hash;
    }
    else {
        docHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
    }
    if (signee == '') {
        registerDoc(title, description, docHash);
    }
    else {
        registerMulti(title, description, docHash, signee);
    }
}

function intermediate() {
    var title = document.getElementById('title').value;
    var description = document.getElementById('desc').value;
    var docHash;
    if (hash != undefined) {
        docHash = hash;
    }
    else {
        docHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
    }
    registerDoc(title, description, docHash);
}


function loadThat() {
    console.log("I got here");
    var theLoad = document.getElementById('sel').value;
    console.log(theLoad, document.getElementById('sel').value);
    var inside = false;
    var title = '';
    var ind = '';
    for (var i = 0; i < theLoad.length; i++) {
        if (inside && theLoad[i] != ')') {
            ind+= theLoad[i];
            console.log(ind);
        }
        else if(theLoad[i] == '(') {
            inside = true;
            console.log('parentheses open')
        }
        else if (inside == false) {
            title+= theLoad[i];
            console.log(title);
        }
        else if (theLoad[i] == ')') {
            console.log(title, ind);
            document.getElementById('title').value = title;
            document.getElementById('index').value = ind;
        }
    }
}

