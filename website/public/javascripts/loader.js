
var run = true;
    function bar() {
	    var elem = document.getElementById("myBar"); 
	    var width = 1;
	    var id = setInterval(frame, 30);
	    function frame() {
            if (width >= 100 && run && document.getElementById('lt1').innerText == 'No more documents to display') {
                clearInterval(id);
		    width = 1;
		    bar();
        } else if (run && document.getElementById('lt1').innerText == 'No more documents to display') {
		    width++; 
		    elem.style.width = width + '%'; 
	      }
	      else if (run == false || document.getElementById('lt1').innerText != 'No more documents to display') {
		    elem.style.width = 100 + '%'; 
	      }
	    }
      }



    setTimeout(function(){ 
          run = false;
          ////document.getElementById('myProgress').style.visibility = 'hidden';
          //document.getElementById('myBar').style.visibility = 'hidden';
          document.getElementById('event').style.visibility = 'hidden';
     }, 7000);

     bar();
