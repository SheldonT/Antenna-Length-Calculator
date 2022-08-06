//classic "Hello World!"
console.log("Hello World!");


const graphicArea = document.getElementById("antennaDiagram");
var graphicAreaCTX = graphicArea.getContext("2d");

//path for graphics drawn in canvas

//dipole
    const dipoleRed = new Path2D('M10 125 L390 125');
    const dipoleBlue = new Path2D('M410 125 L790 125');
//fan dipole
    const fanDipoleRed = new Path2D('M10 240 L390 125 M120 125 L390 125 M240 40 L390 125');
    const fanDipoleBlue = new Path2D('M410 125 L790 240 M410 125 L680 125 M410 125 L560 40');
//inverted vee
    const invertedVeeRed = new Path2D('M10 240 L390 40');
    const invertedVeeBlue = new Path2D('M410 40 L790 240');
//ocf dipole
    const ocfRed = new Path2D('M10 125 L590 125');
    const ocfBlue = new Path2D('M610 125 L790 125');
//vertical
    const verticalRed = new Path2D('M400 40 L400 180');
    const groundBlue = new Path2D('M400 190 L400 240 M400 190 L200 240 M400 190 L600 240');

function isChecked(ant){   //callback function for finding the selected antenna (radio button)
    return ant.checked === true;  
}

function antennaLengthCalc(){

        const ant = Array.from(document.getElementsByName("antennaType"));  //converting antenna radio button to Array() object
        const antenna = ant.find(isChecked).value;  //using find() and callback function isChecked to find the checked radio button.

        graphicAreaCTX.lineCap = "round";  //make the antenna tips round
        graphicAreaCTX.lineWidth = "5";  //make the antenna elements 5 px thick.

        graphicAreaCTX.font = "16px Roboto"; //default font to use for canvas

        freqOptions();

        switch(antenna){

            case "Dipole": {

                const freq = document.getElementById("mono").value;  //get the desired frequency from the text field

                drawAntenna(antenna, dipoleRed, dipoleBlue); //draw initial diagram of the antenna

                if (freq.length != 0) {  //calculate antenna length and draw the antenna graphic in canvas
                                         //if the input field is not empty
                    console.log( antenna + " for " + freq + " Mhz");

                    const length = (71.5 / freq).toFixed(3); //calculate the antenna length using the formula for a 1/2 wave antenna,
                                                             //(1/4 wave per leg). Limit to 3 decimal places

                    drawAntenna(antenna + " for " + freq + " MHz", dipoleRed, dipoleBlue); //redraw the diagram with measurements in meters and title including frequency

                    graphicAreaCTX.textBaseLine = "bottom";  //position measurement text
                    graphicAreaCTX.textAlign="center";
                    graphicAreaCTX.fillText(length + " m", (graphicArea.width / 4) + 10, 115);  //write measurement on canvas for each antenna leg
                    graphicAreaCTX.textAlign="center";
                    graphicAreaCTX.fillText(length + " m", (graphicArea.width * (3/4)) - 10, 115);

                    drawScaleObj(length);
                }
                
                break;
            }

            case "Fan Dipole": {

                const freq1 = document.getElementById("fan1").value; //get three frequencies from input fields
                const freq2 = document.getElementById("fan2").value;
                const freq3 = document.getElementById("fan3").value;

                let length1 = 0;
                let length2 = 0;
                let length3 = 0;

                //drawAntenna(antenna, fanDipoleRed, fanDipoleBlue);

                if((freq1.length != 0) && (freq2.length != 0) && (freq3.length != 0)) {
                    //update diagram title with frequencies when all three are entered.
                    drawAntenna(antenna + " for " + freq1 + " MHz, " + freq2 + "MHz, and " + freq3 + " MHz", fanDipoleRed, fanDipoleBlue);
                }else{
                    drawAntenna(antenna, fanDipoleRed, fanDipoleBlue);
                }

                    if (freq1.length != 0) { //update the diagram with each measurement as they're entered

                        console.log( antenna + " leg 1 for " + freq1 + " Mhz");

                        length1 = (71.5 / freq1).toFixed(3);

                        graphicAreaCTX.textBaseLine = "bottom";
                        graphicAreaCTX.textAlign="left";
                        graphicAreaCTX.fillText(length1 + " m", 20, 210);

                        graphicAreaCTX.textBaseLine = "bottom";
                        graphicAreaCTX.textAlign="right";
                        graphicAreaCTX.fillText(length1 + " m", 780, 210);
                    }

                    if (freq2.length != 0) {

                        console.log( antenna + " leg 2 for " + freq2 + " Mhz");

                        length2 = (71.5 / freq2).toFixed(3);

                        graphicAreaCTX.textBaseLine = "middle";
                        graphicAreaCTX.textAlign="right";
                        graphicAreaCTX.fillText(length2 + " m", 110, 125);

                        graphicAreaCTX.textBaseLine = "middle";
                        graphicAreaCTX.textAlign="left";
                        graphicAreaCTX.fillText(length2 + " m", 690, 125);
                    }

                    if (freq3.length != 0) {

                        console.log( antenna + " leg 3 for " + freq3 + " Mhz");

                        length3 = (71.5 / freq3).toFixed(3);

                        graphicAreaCTX.textBaseLine = "middle";
                        graphicAreaCTX.textAlign="right";
                        graphicAreaCTX.fillText(length3 + " m", 230, 40);

                        graphicAreaCTX.textBaseLine = "middle";
                        graphicAreaCTX.textAlign="left";
                        graphicAreaCTX.fillText(length3 + " m", 570, 40);

                    }
                    
                    if ((freq1.length != 0) && (freq2.length != 0) && (freq3.length != 0)) drawScaleObj(length2);

                break;
            }

            case "Inverted Vee": {

                const freq = document.getElementById("mono").value;  //get the desired frequency from the text field

                drawAntenna(antenna, invertedVeeRed, invertedVeeBlue);

                if (freq.length != 0) {  //calculate antenna length and draw the antenna graphic in canvas
                                         //if the input field is not empty

                    console.log( antenna + " for " + freq + " Mhz");
                    const length = (71.5 / freq).toFixed(3);

                    drawAntenna(antenna + " for " + freq + " MHz", invertedVeeRed, invertedVeeBlue);

                    graphicAreaCTX.textBaseLine = "bottom";
                    graphicAreaCTX.textAlign="right";
                    graphicAreaCTX.fillText(length + " m", (graphicArea.width / 4) + 10, (graphicArea.height / 2) - 10);
                    graphicAreaCTX.textAlign="left";
                    graphicAreaCTX.fillText(length + " m", (graphicArea.width * (3/4)) - 10, (graphicArea.height / 2) - 10);

                    drawScaleObj(length);
                }

                break;
            }

            case "Off Center Fed Dipole": {

                const band = document.getElementById("ocfBands").value;
                
                drawAntenna(antenna + " for " + band + " MHz", ocfRed, ocfBlue);

                if (band == "40m"){
                    console.log( antenna + " for " + band + " and below");
                    length1 = ((143/7.1)*0.64).toFixed(3);
                    length2 = ((143/7.1)*0.36).toFixed(3);
                }

                if (band == "80m"){
                    console.log( antenna + " for " + band + " and below");
                    length1 = ((143/3.6)*0.64).toFixed(3);
                    length2 = ((143/3.6)*0.36).toFixed(3);
                }

                graphicAreaCTX.textBaseLine = "bottom";
                graphicAreaCTX.textAlign="center";
                graphicAreaCTX.fillText(length1 + " m", 300, (graphicArea.height / 2) - 10);
                graphicAreaCTX.textAlign="center";
                graphicAreaCTX.fillText(length2 + " m", 700, (graphicArea.height / 2) - 10);

                drawScaleObj(length1); //use larger leg to draw scale image

                break;
            }
            
            case "Vertical": {

                const freq = document.getElementById("mono").value;  //get the desired frequency from the text field

                drawAntenna(antenna, verticalRed, groundBlue);

                if (freq.length != 0) {  //calculate antenna length and draw the antenna graphic in canvas
                                         //if the input field is not empty

                    console.log( antenna + " for " + freq + " Mhz");
                    const length = (71.5 / freq).toFixed(3);
                    
                    drawAntenna(antenna + " for " + freq + " MHz", verticalRed, groundBlue);
                    
                    graphicAreaCTX.textBaseLine = "bottom";
                    graphicAreaCTX.textAlign="left";
                    graphicAreaCTX.fillText(length + " m", 410, (graphicArea.height / 2) - 10);
                    graphicAreaCTX.textAlign="right";
                    graphicAreaCTX.fillText(length + " m", 280, 200);

                    drawScaleObj(length);

                }

                break;
            }

            default: {
                console.log("default");
                break;
            }
        }
}

function drawAntenna(name, red, blue){ //draw the antenna diagram based on predetermined global Path2D() objects.

    graphicAreaCTX.globalAlpha = 1;

    graphicAreaCTX.clearRect(0, 0, graphicArea.width, graphicArea.height); //clear the canvas before drawing an antenna

    graphicAreaCTX.textAlign="center";  //position and write the name of the selected antenna (name)
    graphicAreaCTX.textBaseLine = "top";

    graphicAreaCTX.fillText(name, graphicArea.width / 2, 15);

    graphicAreaCTX.beginPath();  //draw the red (left) leg of the antenna
    graphicAreaCTX.strokeStyle = "#FF2D00";
    graphicAreaCTX.stroke(red);
    graphicAreaCTX.closePath();

    graphicAreaCTX.beginPath();  //draw the blue (right) leg of the antenna
    graphicAreaCTX.strokeStyle = "#3B3D98";
    graphicAreaCTX.stroke(blue);
    graphicAreaCTX.closePath();
}

function drawScaleObj(antennaLength) {

    const car = new Image();
    const hand = new Image();
    const armsOut = new Image();
    const chair = new Image();
    const coin = new Image();

    car.src = "car.svg";
    hand.src = "hand.svg";
    armsOut.src = "armSpan.svg";
    chair.src = "chair.svg";
    coin.src = "coin.svg";

    scale = 380 / antennaLength;  //pixels per meter determined by the given calculated antenna length

    // car = 4.8m (0.5 w/h)
    // person = 1.7m (0.5 h/w)
    // armsOut = 1.7 (1.002 h/w)
    // hand = 0.2m (1.35 h/w)
    // chair =  0.5m (1.68 h/w)
    // coin = 0.024m

    graphicAreaCTX.globalAlpha = 0.3; //make the scale object opaque

    if (antennaLength >= 5){  //use a car as a scale object if the antenna is more than 5m long

        width = scale * 4.8;  //determine how many pixels the car length will be
        car.addEventListener('load', (e) => {graphicAreaCTX.drawImage(car, 400 - (width / 2), graphicArea.height - (width * 0.5) - 25, width, width * 0.5)} );
    }

    if ((antennaLength >= 2.9) &&  (antennaLength < 5)){ //use a person as the scale object if antenna is between 5 and 2.9m

        width = scale * 1.7;
        armsOut.addEventListener('load', (e) => {graphicAreaCTX.drawImage(armsOut, 400 - (width / 2), graphicArea.height - (width * 1.002) - 25, width, width * 1.002)} );
    }

    if ((antennaLength >= 1.4) &&  (antennaLength < 2.9)){ //use a chair as a scale object if antenna length is 1.4 and 2.9m

        width = scale * 0.5;
        chair.addEventListener('load', (e) => {graphicAreaCTX.drawImage(chair, 400 - (width / 2), graphicArea.height - (width * 1.68) - 25, width, width * 1.68)} );
    }

    if ((antennaLength >= 0.45 ) && (antennaLength < 1.4)){  //use a hand as a scale object if the antenna is 1.4 to 0.45m

        width = scale * 0.2;
        hand.addEventListener('load', (e) => {graphicAreaCTX.drawImage(hand, 400 - (width / 2), graphicArea.height - (width * 1.35) - 25, width, width * 1.35)} );
        
    }

    if (antennaLength < 0.45) {  //use an american quarter as a scale object if antenna is less than 0.45m

        graphicAreaCTX.globalAlpha = 0.4; //coin graphic has less detail and needs to be less opaque

        width = scale * 0.024;
        coin.addEventListener('load', (e) => {graphicAreaCTX.drawImage(coin, 400 - (width / 2), (graphicArea.height / 2) - width / 2, width, width)} );
        
    }

}


function freqOptions(){  //disabled/enable input fields based on the type of antenna selected.

    const ant = Array.from(document.getElementsByName("antennaType"));  //converting antenna radio button to Array() object

    const antType = ant.find(isChecked).value;  //find which radio button is checked

    switch (antType){  //change the frequency input fields depending on which antenna is selected.

        case "Fan Dipole":{
            document.getElementById("singleFreq").style.display = "none";           //change display to none for fields not required to make them invisible
            document.getElementById("singleFreq").setAttribute("disabled", "");     //and set input field attribute to disabled

            document.getElementById("doubleFreq").style.display = "none";
            document.getElementById("doubleFreq").setAttribute("disabled", "");

            document.getElementById("tripleFreq").style.display = "block";          //make three input fields visible if the fan dipole is selected.
            document.getElementById("tripleFreq").removeAttribute("disabled", "");  //remove disabled attribute to allow user input

            break;
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
