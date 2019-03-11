function loadDocs() {
    var address = document.getElementById('ad').innerText;
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
	await sleep(700);
	write();
}
  }

function write() {
	console.log('i ran');
	for (i = 0; i < iterations; i++) {
	if (iterations - i > 4) {

	}
	else {
	var id = String("lt" + (iterations-i));
	var date = String(new Date((data[i][2].toNumber()) * 1000));
	var finalDate = date.substr(0, 33);
	document.getElementById(id).innerHTML = "<b>Title: </b>" + data[i][0] + ", <b>Description: </b>" + data[i][1] + 
	 ", <b>Date: </b>" + finalDate + " &nbsp;&nbsp;<a href=/users/docs><u>SEE MORE</u></a>";
	}
	}
	iterations = 0;
	current = 0;
	data = [];
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }