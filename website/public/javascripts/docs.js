function loadDocs() {
    var address = document.getElementById('adr').innerText;
    numberOfRegistrations(address);
    }

loadDocs();

  function numberOfRegistrations(user) {
    DocumentRegistration.docsPerUser(user, (error, data) => {
       var n = data.toNumber();
	   //makeArray(user, n);
	   iterations = n;
	   runUserDocs(user);
    });
}

var current = 0;
var iterations;
var data = [];

// event
async function runUserDocs(user) {
	if (current < iterations) {
	await sleep(200);
	DocumentRegistration.userDocs(user, current, (error, dt) => {
		data.push(dt);
		console.log(data);
  });
  current++;
  runUserDocs(user);
}
else {
	await sleep(400);
	createTable();
}
  }

function createTable() {
    var table = document.getElementById("table1");
    for (var j = 0; j < data.length; j++) {
        var row = table.insertRow(1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        cell0.innerHTML = data[j][0];
        if (data[j][4] == "0x0000000000000000000000000000000000000000") {
            cell1.innerHTML = "Document is not Multi-Sig";        
        }
        else {
            cell1.innerHTML = data[j][4];
        }
        cell2.innerHTML = data[j][1];
        var date = String(new Date((data[j][2].toNumber()) * 1000));
        var finalDate = date.substr(0, 15);
        cell3.innerHTML = finalDate;
    }
    r = false;
}
