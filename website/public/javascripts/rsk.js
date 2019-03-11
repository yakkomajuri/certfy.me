web3.eth.defaultAccount = web3.eth.accounts[0];

account = web3.eth.accounts[0];

// INSTANTIATE CONTRACT AND ABI

var DocumentRegistrationContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			}
		],
		"name": "registerAddress",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_metadata",
				"type": "string"
			},
			{
				"name": "_fileHash",
				"type": "bytes32"
			}
		],
		"name": "registerDocument",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_metadata",
				"type": "string"
			},
			{
				"name": "_fileHash",
				"type": "bytes32"
			},
			{
				"name": "_signee",
				"type": "address"
			}
		],
		"name": "registerMultiSig",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_current",
				"type": "address"
			}
		],
		"name": "setCurrent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ownerContract",
				"type": "address"
			}
		],
		"name": "setOwnerContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_index",
				"type": "uint8"
			},
			{
				"name": "_price",
				"type": "uint128"
			}
		],
		"name": "setPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_price1",
				"type": "uint128"
			},
			{
				"name": "_price2",
				"type": "uint128"
			},
			{
				"name": "_price3",
				"type": "uint128"
			},
			{
				"name": "_price4",
				"type": "uint128"
			}
		],
		"name": "setPrices",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_temporaryIndex",
				"type": "uint32"
			}
		],
		"name": "signDocument",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			}
		],
		"name": "updateInfo",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "DocumentIndex",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_index",
				"type": "uint32"
			}
		],
		"name": "checkTemporary",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "current",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "docsPerUser",
		"outputs": [
			{
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_nameIndex",
				"type": "uint32"
			}
		],
		"name": "documentQuery",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "documents",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "metadata",
				"type": "string"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"name": "registrant",
				"type": "address"
			},
			{
				"name": "signee",
				"type": "address"
			},
			{
				"name": "hash",
				"type": "bytes32"
			},
			{
				"name": "isEntity",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "prices",
		"outputs": [
			{
				"name": "",
				"type": "uint128"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "registrants",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "user",
				"type": "address"
			},
			{
				"name": "isEntity",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "registry",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "metadata",
				"type": "string"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"name": "registrant",
				"type": "address"
			},
			{
				"name": "signee",
				"type": "address"
			},
			{
				"name": "hash",
				"type": "bytes32"
			},
			{
				"name": "isEntity",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "temporaryDocs",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "metadata",
				"type": "string"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"name": "registrant",
				"type": "address"
			},
			{
				"name": "signee",
				"type": "address"
			},
			{
				"name": "hash",
				"type": "bytes32"
			},
			{
				"name": "isEntity",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "temporaryRegistry",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "metadata",
				"type": "string"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"name": "registrant",
				"type": "address"
			},
			{
				"name": "signee",
				"type": "address"
			},
			{
				"name": "hash",
				"type": "bytes32"
			},
			{
				"name": "isEntity",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint32"
			}
		],
		"name": "userDocs",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "metadata",
				"type": "string"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"name": "registrant",
				"type": "address"
			},
			{
				"name": "signee",
				"type": "address"
			},
			{
				"name": "hash",
				"type": "bytes32"
			},
			{
				"name": "isEntity",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "verifiedAddress",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "user",
				"type": "address"
			},
			{
				"name": "isEntity",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_nameIndex",
				"type": "uint32"
			},
			{
				"name": "_fileHash",
				"type": "bytes32"
			}
		],
		"name": "verifyDocument",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);

var contractAddress = '0xcf27d55931623144d2babe6a0889b97d14ca4330';

var DocumentRegistration = DocumentRegistrationContract.at(contractAddress);

console.log(DocumentRegistration);


// TRANSACTION FUNCTIONS

/* Prices are defined in an array, with items corresponding to:
     prices[0] = Price to register an address,
     prices[1] = Price to register a simple document,
     prices[2] = Price to register a multi-sig document (split between parties)
     prices[3] = Price to update information of a pre-existing registrant
 */

function registerAdd(name, description) {
    var tx = DocumentRegistration.registerAddress(name, description, {
        from: account,
        // gas: "3000000",
        to: contractAddress,
        value: checkPrice(0),
        data: ""
    }, function (err, transactionHash) {
        if (!err)
            console.log(transactionHash);
    }
    )
};

function registerDoc(name, metadata, fileHash) {
	checkPrice(1);
	sleep(200);
    var tx = DocumentRegistration.registerDocument(name, metadata, fileHash, {
        from: account,
        // gas: "3000000",
        to: contractAddress,
        value: prices[1],
        data: ""
    }, function (err, transactionHash) {
        if (!err)
            console.log(transactionHash);
    }
    )
};

function registerMulti(name, metadata, fileHash, signee) {
	checkPrice(2);
	sleep(200);
    var tx = DocumentRegistration.registerMultiSig(name, metadata, fileHash, signee, {
        from: account,
        // gas: "3000000",
        to: contractAddress,
        value: prices[2] / 2,
        data: ""
    }, function (err, transactionHash) {
        if (!err)
            console.log(transactionHash);
    }
    )
};

function signDoc(name, index) {
    var tx = DocumentRegistration.signDocument(name, index, {
        from: account,
        // gas: "3000000",
        to: contractAddress,
        value: checkPrice(2) / 2,
        data: ""
    }, function (err, transactionHash) {
        if (!err)
            console.log(transactionHash);
    }
    )
};

function updateInformation(name, description) {
    var tx = DocumentRegistration.updateInfo(name, description, {
        from: account,
        // gas: "3000000",
        to: contractAddress,
        value: checkPrice(3),
        data: ""
    }, function (err, transactionHash) {
        if (!err)
            console.log(transactionHash);
    }
    )
};


// VIEW FUNCTIONS

var prices = [0, 0, 0, 0];

function checkAdd(address) {
    DocumentRegistration.checkAddress(address, (error, data) => {
        return data[0], data[1];
    });
}

function verifyDoc(name, index, hash) {
    DocumentRegistration.verifyDocument(name, index, hash, (error, data) => {
		document.getElementById('response').innerHTML = data ? "The documents match." : "The documents do not match or the wrong information was supplied.";
	});
}

function docQuery(name, index) {
    DocumentRegistration.documentQuery(name, index, (error, data) => {
        console.log(data[0], data[1], data[2], data[3], data[4]);
    });
}

function checkTemp(name, index) {
    DocumentRegistration.checkTemporary(name, index, (error, data) => {
        return data[0], data[1], data[2], data[3], data[4];
    });
}

function checkPrice(index) {
    DocumentRegistration.prices(index, (error, data) => {
        prices[index] = data.toNumber();
    });
}


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

  // INTERMEDIATE

window.addEventListener('load', async () => {
	web3 = new Web3(new Web3.providers.HttpProvider("https://public-node.rsk.co"));
});

$(".noreload").click(function(event) {
    event.preventDefault();
})

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

function checkDoc() {
	console.log('I ran');
    var title = document.getElementById('title').value;
    var index = document.getElementById('index').value;
    verifyDoc(title, index, hash);
}