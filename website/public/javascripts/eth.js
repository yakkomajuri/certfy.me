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

var contractAddress = '0xa4f8e93b09c7164dc42187dbd8eabc86066755fd';

// first impl: 0x1C8F1B8ffd2092Aa68E87FFC3e847E3619EeE928
// Owners: 0xAA94954A51B647C0987F9ec6D9Ef5FCDaf15C353
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
			document.getElementById('myProgress').style.visibility = 'visible';
			document.getElementById('myBar').style.visibility = 'visible';
			move();
			document.getElementById('event').innerHTML = "Waiting for your transaction to be included in a block..."
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

var sig;
var prices = [0, 0, 0, 0];

function checkAdd(address) {
    DocumentRegistration.verifiedAddress(address, (error, data) => {
        return data[0];
    });
}

var outside;

function verifyDoc(name, index, hash) {
    DocumentRegistration.verifyDocument(name, index, hash, (error, data) => {
		document.getElementById('response').innerHTML = data ? "The documents match." : "The documents do not match or the wrong information was supplied.";
		if (data) {
			if (outside) {
			alert('The documents match.');
			} else {
				$("#matchModal").modal();
			}
		}
		else {
			if(outside) {
				alert('The documents do not match or the wrong information was supplied');
			} else {
				$("#notModal").modal();
			}
		}
	});
}

async function docQuery(name, index) {
    DocumentRegistration.documentQuery(name, index, async (error, dt) => {
			console.log(dt);
			await checkAdd(dt[3], (error, data) => {
				reg = data[0];
			});
			await checkAdd(dt[4], (error, data) => {
				sig = data[0];
			});
			if (reg == undefined) {
				document.getElementById('regs').innerHTML =  dt[3];
			}
			else {
				document.getElementById('regs').innerHTML = reg + '(' + dt[3] + ')';
			}
			if (sig == '0x0000000000000000000000000000000000000000000000000000000000000000' || sig == undefined) {
				document.getElementById('sigs').innerHTML =  "Document does not have a secondary signee.";
			}
			else {
				document.getElementById('sigs').innerHTML = sig + '(' + dt[4] + ')';
			}
			$("#queryModal").modal();
			document.getElementById('descs').innerHTML = dt[1];
			var date = String(new Date((dt[2].toNumber()) * 1000));
			var finalDate = date.substr(0, 15);
			document.getElementById('times').innerHTML = finalDate;
		    });
}

var reg;

function checkTemp(name, index) {
    DocumentRegistration.checkTemporary(name, index, (error, dt) => {
		checkAdd(dt[3], (error, data) => {
			reg = data[0];
		});
		if (reg == undefined) {
			document.getElementById('registrant').innerHTML =  dt[3];
		}
		else {
			document.getElementById('registrant').innerHTML = reg + '(' + dt[3] + ')';
		}
		$("#tempModal").modal();
		document.getElementById('description').innerHTML = dt[1];
		var date = String(new Date((dt[2].toNumber()) * 1000));
		var finalDate = date.substr(0, 15);
		document.getElementById('timestamp').innerHTML = finalDate;
		if (dt[5] == undefined) {
			document.getElementById('hash').innerHTML = "No hash registered";
		}
		else if (hash == dt[5]) {
			document.getElementById('hash').innerHTML = dt[5] + "(Document's match)";
		}
		else {
			document.getElementById('hash').innerHTML = dt[5] + "(Document's do not match)";
		}
		});
}

function checkPrice(index) {
    DocumentRegistration.prices(index, (error, data) => {
        prices[index] = data.toNumber();
    });
}

async function getPrices() {
	await checkPrice(1);
	await checkPrice(2);
	document.getElementById('stdPrice').innerHTML = " " + prices[1] + " ETH";
	document.getElementById('multiPrice').innerHTML = " " + prices[2] + " ETH";
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }



function checkDoc() {
    var title = document.getElementById('title').value;
	var index = document.getElementById('index').value;
    verifyDoc(title, index, hash);
}

//var DocumentIndex = DocumentRegistration.DocumentIndex();

const latest = web3.eth.getBlockNumber();


DocumentRegistration.allEvents({
    fromBlock: latest
}, (error, event) => { 
	var index = (event.args.index).toNumber();
	running = false;
	document.getElementById('myProgress').style.visibility = 'hidden';
	document.getElementById('myBar').style.visibility = 'hidden';
	document.getElementById('event').innerHTML = "Your registration's index number is: <b>" + index + 
	"</b>. This number is used along with your document's name to find your registered information. Write them both down or <a href='/users/login' style='border-bottom: 0.5px dashed; display: inline;'>login</a> so we take care of that for you next time.";
	console.log(index); 
});

var running = true;

function move() {
	var elem = document.getElementById("myBar"); 
	var width = 1;
	var id = setInterval(frame, 30);
	function frame() {
	  if (width >= 100 && running) {
		clearInterval(id);
		width = 1;
		move();
	  } else if (running) {
		width++; 
		elem.style.width = width + '%'; 
	  }
	  else if (running == false) {
		elem.style.width = 100 + '%'; 
	  }
	}
  }
/*
function myDocs(user, x) {
    for (k = 0; k < x; k++) {
    var data = await runUserDocs(user, k);
    console.log(x);
    console.log(k);
    var id = String("lt" + (x-1-k));
    console.log(id);
    var date = String(new Date((data[5].toNumber()) * 1000));
    var finalDate = date.substr(0, 33);
    document.getElementById(id).innerHTML = "<b>Title: </b>" + data[0] + ", <b>Description: </b>" + data[1] + 
     ", <b>Date: </b>" + finalDate + " &nbsp;&nbsp;<a href=/users/docs><u>SEE MORE</u></a>";
    }
}

*/


  

/*
async function myDocs(user, arr, x) {
    arr.forEach(async (item) => {
		await runUserDocs(user, item);
		await sleep(300);
		write(x, item);
    })
}

var iterations;
var current;

var arr = [];

function makeArray(user, x) {
    arr = [];
    for(i=0; i < x; i++) {
        arr.push(i);
    }
    myDocs(user, arr, x);
}


function nOfRegistrations(user) {
    DocumentRegistration.docsPerUser(user, (error, data) => {
       iterations = data.toNumber();
	});
	getDocs(user);
}

 function getDocs(user) {
	if (current <= iterations) {
	DocumentRegistration.userDocs(user, current, (error, data) => {
		var id = String("lt" + (iterations - current));
		console.log(id);
		var date = data[5];
        var meDate = String(new Date(date.toNumber() * 1000));
        var finalDate = meDate.substr(0, 33);
        document.getElementById(id).innerHTML = "<b>Title: </b>" + data[0] + ", <b>Description: </b>" + data[1] + 
         ", <b>Date: </b>" + finalDate + " &nbsp;&nbsp;<a href=/users/docs><u>SEE MORE</u></a>";
	  });
	  current++;
	  getDocs(user);
	}
	else {
		iterations = 0;
		current = 0;
	}
}
*/


   