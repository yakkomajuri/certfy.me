 async function submitForm(id) {
    var num = id;
    console.log(id);
    console.log(10000+num);
    var element = await document.getElementById(1000+num);
    console.log(element);
    await  element.setAttribute('name', 'signee');
    document.friendsForm.submit();
}

var element;

function subForm(id) {
    var requestId;
    if(id[2] && id[3]) {
        requestId = id[1] + id[2] + id[3];
    }
    else if(id[2]) {
        requestId = id[1] + id[2];
    }
    else if (id[1]) {
        requestId = id[1];
    }
    console.log(requestId);
    element = document.getElementById(requestId).value;
    document.getElementById('modal1').value = element;
}

function prepareRemoval(id) {
    var requestId;
    if(id[2] && id[3]) {
        requestId = id[1] + id[2] + id[3];
    }
    else if(id[2]) {
        requestId = id[1] + id[2];
    }
    else if (id[1]) {
        requestId = id[1];
    }
    console.log(requestId);
    element = document.getElementById(requestId).value;
    document.getElementById('modal2').value = element;
}




var userToRemove;

async function prepareRemoval(id) {

}
