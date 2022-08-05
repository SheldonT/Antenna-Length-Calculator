//classic "Hello World!"
console.log("Hello World!");


const graphicArea = document.getElementById("antennaDiagram");
var graphicAreaCTX = graphicAreaCtx = graphicArea.getContext("2d");


function isChecked(ant){   //callback function for finding the selected antenna (radio button)
    return ant.checked === true;  
}

function printSelectedAntenna(target, str, rbutton){ 

    const antennas = Array.from(document.getElementsByName(rbutton));  //converting antenna radio button to Array() object
    const selectedAntenna = antennas.find(isChecked).value;  //using find() and callback function isChecked to find the checked radio button.

    document.getElementById(target).innerHTML = str.concat(" ", selectedAntenna);  //write selectedAntenna string to target html element

    antennaLengthCalc(selectedAntenna);

}

function antennaLengthCalc(antenna){

        graphicAreaCtx.clearRect(0, 0, graphicArea.width, graphicArea.height); //clear the canvas before drawing an antenna

        graphicAreaCtx.lineCap = "round";  //make the antenna tips round
        graphicAreaCtx.lineWidth = "5";  //make the antenna elements 5 px thick.

        graphicAreaCTX.font = "16px Roboto";

        switch(antenna){

            case "Dipole": {

                const freq = document.getElementById("mono").value;  //get the desired frequency from the text field

                if (freq.length != 0) {  //calculate antenna length and draw the antenna graphic in canvas
                                         //if the input field is not empty
                    const length = (71.5 / freq).toFixed(3);

                    const dipoleRed = new Path2D('M10 100 L290 100');
                    const dipoleBlue = new Path2D('M310 100 L590 100');

                    graphicAreaCTX.textAlign="center";
                    graphicAreaCTX.textBaseLine = "top";

                    graphicAreaCTX.fillText(antenna + " for " + freq + "MHz", graphicArea.width / 2, 25);

                    graphicAreaCTX.beginPath();
                    graphicAreaCTX.strokeStyle = "#FF2D00";
                    graphicAreaCTX.stroke(dipoleRed);
                    graphicAreaCTX.closePath();

                    graphicAreaCTX.beginPath();
                    graphicAreaCTX.strokeStyle = "#3B3D98";
                    graphicAreaCTX.stroke(dipoleBlue);
                    graphicAreaCTX.closePath();

                    graphicAreaCTX.textBaseLine = "bottom";
                    graphicAreaCTX.textAlign="center";
                    graphicAreaCTX.fillText(length + " m", (graphicArea.width / 4) + 10, (graphicArea.height / 2) - 10);
                    graphicAreaCTX.textAlign="center";
                    graphicAreaCTX.fillText(length + " m", (graphicArea.width * (3/4)) - 10, (graphicArea.height / 2) - 10);

                }
                
                break;
            }

            case "Fan Dipole": {

                const freq1 = document.getElementById("fan1").value;
                const freq2 = document.getElementById("fan2").value;
                const freq3 = document.getElementById("fan3").value;

                if ((freq1.length != 0) && (freq2.length != 0) && (freq3.length != 0)) {

                    const length1 = (71.5 / freq1).toFixed(3);
                    const length2 = (71.5 / freq2).toFixed(3);
                    const length3 = (71.5 / freq3).toFixed(3);

                    graphicAreaCTX.textAlign="center";
                    graphicAreaCTX.textBaseLine = "top";

                    graphicAreaCTX.fillText(antenna + " for " + freq1 + " MHz, " + freq2 + " MHz, and " + freq3 + " MHz", graphicArea.width / 2, 15);

                    const fanDipoleRed = new Path2D('M10 190 L290 100 M90 100 L290 100 M180 40 L290 100');
                    const fanDipoleBlue = new Path2D('M310 100 L590 190 M310 100 L490 100 M310 100 L420 40');

                    graphicAreaCTX.beginPath();
                    graphicAreaCTX.strokeStyle = "#FF2D00";
                    graphicAreaCTX.stroke(fanDipoleRed);
                    graphicAreaCTX.closePath();

                    graphicAreaCTX.beginPath();
                    graphicAreaCTX.strokeStyle = "#3B3D98";
                    graphicAreaCTX.stroke(fanDipoleBlue);
                    graphicAreaCTX.closePath();

                    graphicAreaCTX.textBaseLine = "bottom";
                    graphicAreaCTX.textAlign="left";
                    graphicAreaCTX.fillText(length1 + " m", 65, 190);

                    graphicAreaCTX.textBaseLine = "middle";
                    graphicAreaCTX.textAlign="right";
                    graphicAreaCTX.fillText(length2 + " m", 80, 100);

                    graphicAreaCTX.textBaseLine = "middle";
                    graphicAreaCTX.textAlign="right";
                    graphicAreaCTX.fillText(length3 + " m", 170, 40);

                    graphicAreaCTX.textBaseLine = "bottom";
                    graphicAreaCTX.textAlign="right";
                    graphicAreaCTX.fillText(length1 + " m", 545, 190);

                    graphicAreaCTX.textBaseLine = "middle";
                    graphicAreaCTX.textAlign="left";
                    graphicAreaCTX.fillText(length2 + " m", 500, 100);

                    graphicAreaCTX.textBaseLine = "middle";
                    graphicAreaCTX.textAlign="left";
                    graphicAreaCTX.fillText(length3 + " m", 430, 40);
                
                    //drawFanDipole(length1.toFixed(3), length2.toFixed(3),length3.toFixed(3));
                }

                break;
            }

            case "Inverted Vee": {

                const freq = document.getElementById("mono").value;  //get the desired frequency from the text field

                if (freq.length != 0) {  //calculate antenna length and draw the antenna graphic in canvas
                                         //if the input field is not empty
                    const length = (71.5 / freq).toFixed(3);
                    
                    const invertedVeeRed = new Path2D('M10 190 L290 40');
                    const invertedVeeBlue = new Path2D('M310 40 L590 190');

                    graphicAreaCTX.textAlign="center";
                    graphicAreaCTX.textBaseLine = "top";

                    graphicAreaCTX.fillText(antenna + " for " + freq + "MHz", graphicArea.width / 2, 25);

                    graphicAreaCTX.beginPath();
                    graphicAreaCTX.strokeStyle = "#FF2D00";
                    graphicAreaCTX.stroke(invertedVeeRed);
                    graphicAreaCTX.closePath();

                    graphicAreaCTX.beginPath();
                    graphicAreaCTX.strokeStyle = "#3B3D98";
                    graphicAreaCTX.stroke(invertedVeeBlue);
                    graphicAreaCTX.closePath();

                    graphicAreaCTX.textBaseLine = "bottom";
                    graphicAreaCTX.textAlign="right";
                    graphicAreaCTX.fillText(length + " m", (graphicArea.width / 4) + 10, (graphicArea.height / 2) - 10);
                    graphicAreaCTX.textAlign="left";
                    graphicAreaCTX.fillText(length + " m", (graphicArea.width * (3/4)) - 10, (graphicArea.height / 2) - 10);
                }
                
                break;
            }

            case "Off Center Fed Dipole": {

                const band = document.getElementById("ocfBands").value;
                const ocfRed = new Path2D('M10 100 L390 100');
                const ocfBlue = new Path2D('M410 100 L590 100');

                let length1;
                let length2;

                graphicAreaCTX.textAlign="center";
                graphicAreaCTX.textBaseLine = "top";

                graphicAreaCTX.fillText(antenna + " for " + band, graphicArea.width / 2, 25);

                graphicAreaCTX.beginPath();
                graphicAreaCTX.strokeStyle = "#FF2D00";
                graphicAreaCTX.stroke(ocfRed);
                graphicAreaCTX.closePath();

                graphicAreaCTX.beginPath();
                graphicAreaCTX.strokeStyle = "#3B3D98";
                graphicAreaCTX.stroke(ocfBlue);
                graphicAreaCTX.closePath();

                if (band == "40m"){
                    length1 = ((143/7.1)*0.64).toFixed(3);
                    length2 = ((143/7.1)*0.36).toFixed(3);
                }

                if (band == "80m"){
                    length1 = ((143/3.6)*0.64).toFixed(3);
                    length2 = ((143/3.6)*0.36).toFixed(3);
                }

                graphicAreaCTX.textBaseLine = "bottom";
                graphicAreaCTX.textAlign="center";
                graphicAreaCTX.fillText(length1 + " m", 200, (graphicArea.height / 2) - 10);
                graphicAreaCTX.textAlign="center";
                graphicAreaCTX.fillText(length2 + " m", 500, (graphicArea.height / 2) - 10);

                break;
            }
            
            case "Vertical": {

                const freq = document.getElementById("mono").value;  //get the desired frequency from the text field

                if (freq.length != 0) {  //calculate antenna length and draw the antenna graphic in canvas
                                         //if the input field is not empty

                    const length = (71.5 / freq).toFixed(3);
                    
                    const verticalRed = new Path2D('M300 40 L300 140');
                    const groundBlue = new Path2D('M300 150 L300 190 M300 150 L200 190 M300 150 L400 190');

                    graphicAreaCTX.textAlign="center";
                    graphicAreaCTX.textBaseLine = "top";

                    graphicAreaCTX.fillText(antenna + " for " + freq + " MHz", graphicArea.width / 2, 25);

                    graphicAreaCTX.beginPath();
                    graphicAreaCTX.strokeStyle = "#FF2D00";
                    graphicAreaCTX.stroke(verticalRed);
                    graphicAreaCTX.closePath();

                    graphicAreaCTX.beginPath();
                    graphicAreaCTX.strokeStyle = "#3B3D98";
                    graphicAreaCTX.stroke(groundBlue);
                    graphicAreaCTX.closePath();

                    graphicAreaCTX.textBaseLine = "bottom";
                    graphicAreaCTX.textAlign="left";
                    graphicAreaCTX.fillText(length + " m", 310, (graphicArea.height / 2) - 10);
                    graphicAreaCTX.textAlign="right";
                    graphicAreaCTX.fillText(length + " m", 220, 170);

                }

                break;
            }

            default: {
                console.log("default");
                break;
            }
        }
}

function freqOptions(){

    const ant = Array.from(document.getElementsByName("antennaType"));  //converting antenna radio button to Array() object

    const antType = ant.find(isChecked).value;  //find which radio button is checked

    switch (antType){  //change the frequency input fields depending on which antenna is selected.
       
        case "Fan Dipole":{
            document.getElementById("singleFreq").style.display = "none";
            document.getElementById("singleFreq").setAttribute("disabled", "");

            document.getElementById("doubleFreq").style.display = "none";
            document.getElementById("doubleFreq").setAttribute("disabled", "");

            document.getElementById("tripleFreq").style.display = "block";
            document.getElementById("tripleFreq").removeAttribute("disabled", "");

            break;  //return a value based on the antenna selected
        }
         
         case "Off Center Fed Dipole":{
            document.getElementById("singleFreq").style.display = "none";
            document.getElementById("singleFreq").setAttribute("disabled", "");

            document.getElementById("doubleFreq").style.display = "block";
            document.getElementById("doubleFreq").removeAttribute("disabled", "");

            document.getElementById("tripleFreq").style.display = "none";
            document.getElementById("tripleFreq").setAttribute("disabled", "");

            break;
        }

         default:{
            document.getElementById("singleFreq").style.display = "block";
            document.getElementById("singleFreq").removeAttribute("disabled", "");

            document.getElementById("doubleFreq").style.display = "none";
            document.getElementById("doubleFreq").setAttribute("disabled", "");

            document.getElementById("tripleFreq").style.display = "none";
            document.getElementById("tripleFreq").setAttribute("disabled", "");

            break;
        }
    }
}
