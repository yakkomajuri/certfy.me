
     var r = true;
     function barMove() {
         var elem = document.getElementById("myB"); 
         var width = 1;
         var id = setInterval(frame, 30);
         function frame() {
           if (width >= 100 && r) {
             clearInterval(id);
             width = 1;
             barMove();
           } else if (r) {
             width++; 
             elem.style.width = width + '%'; 
           }
           else if (run == false) {
             elem.style.width = 100 + '%'; 
           }
         }
       }
 
 
 
     setTimeout(function(){ 
           r = false;
           document.getElementById('myProg').style.visibility = 'hidden';
           document.getElementById('myB').style.visibility = 'hidden';
           document.getElementById('event').style.visibility = 'hidden';
      }, 7000);
 
      barMove();