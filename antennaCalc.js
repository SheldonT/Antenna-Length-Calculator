//classic "Hello World!"
console.log("Hello World!");

function isChecked(ant){   //callback function for finding the selected antenna (radio button)
    return ant.checked === true;  
}

function printSelectedAntenna(target, str, rbutton){ 

    const antennas = Array.from(document.getElementsByName(rbutton));  //converting antenna radio button to Array() object
    const selectedAntenna = str.concat(" ", antennas.find(isChecked).value);  //using find() and callback function isChecked to find the checked radio button.

    document.getElementById(target).innerHTML = selectedAntenna;  //write selectedAntenna string to target html element

    drawAntennaDiag();  //draw the antenna diagram in the canvas
}

function drawAntennaDiag(){
    var canvas = document.getElementById("antennaDiagram");  //create canvas
     
   if(canvas.getContext){
        var ctx = canvas.getContext("2d");  //define canvase context

        ctx.clearRect(0, 0, canvas.width, canvas.height);  //clear anything previously drawn

        ctx.beginPath();  //start a path
        ctx.strokeStyle = "#FF2D00";   //draw a red line (always shows purple?)
        ctx.moveTo(10, 100);
        ctx.lineTo(290, 100);
        ctx.stroke();
        ctx.closePath();
        
         
        ctx.beginPath();
        ctx.strokeStyle = "#3B3D98";  //draw a blue line
        ctx.moveTo(310, 100);
        ctx.lineTo(590, 100);
        ctx.stroke();
        ctx.closePath();
    }
}

function freqOptions(ant){

    switch (ant){
        case 1:{
            document.getElementById("singleFreq").style.display = "block";
            document.getElementById("doubleFreq").style.display = "none";
            document.getElementById("tripleFreq").style.display = "none";
            break;
        }

         case 2:{
            document.getElementById("singleFreq").style.display = "none";
            document.getElementById("doubleFreq").style.display = "block";
            document.getElementById("tripleFreq").style.display = "none";
            break;
        }
         
         case 3:{
            document.getElementById("singleFreq").style.display = "none";
            document.getElementById("doubleFreq").style.display = "none";
            document.getElementById("tripleFreq").style.display = "block";
            break;
        }
         default:{
            document.getElementById("singleFreq").style.display = "block";
            document.getElementById("doubleFreq").style.display = "none";
            document.getElementById("tripleFreq").style.display = "none";
        }
    }
}
