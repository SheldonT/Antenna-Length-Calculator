//classic "Hello World!"
console.log("Hello World!");


const graphicArea = document.getElementById("antennaDiagram");
let graphicAreaCTX = graphicArea.getContext("2d");

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


function onlyNumbers(textField){
    const input = document.getElementById(textField).value.replace(/[^\d.]/g, ""); //remove any characters that are not numbers or "." from the input text

    document.getElementById(textField).value = input; //assign freq to input field to keep out unwanted characters

    return input;
}

function unitSelect(input){
    let length;

    if (document.getElementById("meters").checked){
        length = (71.5 / input).toFixed(3);
    } else {
        length = (234 / input).toFixed(2);
    }

    return length;
}

function unitName(){ //return the suffix for the selected unit of measurement
    let unit;

    if (document.getElementById("meters").checked){
        unit = " m";
    } else {
        unit = " ft";
    }

    return unit;
}

function antennaLengthCalc(){

    const ant = Array.from(document.getElementsByName("antennaType"));  //converting antenna radio button to Array() object
     const antenna = ant.find((ant) => ant.checked).value;  //using find() to find the checked radio button.
                                                            //annonymous function (arg) => return value. Gives value of checked radio button

    graphicAreaCTX.lineCap = "round";  //make the antenna tips round
    graphicAreaCTX.lineWidth = "5";  //make the antenna elements 5 px thick.

    graphicAreaCTX.font = "16px Roboto"; //default font to use for canvas

    freqOptions();

    switch(antenna){

        case "Dipole": {

            const freq = onlyNumbers("mono"); //only allow numbers and "." in the frequency text field

            drawAntenna(antenna, dipoleRed, dipoleBlue); //draw initial diagram of the antenna

            if (freq.length !== 0) {  //calculate antenna length and draw the antenna graphic in canvas
                                         //if the input field is not empty
                console.log( antenna + " for " + freq + " Mhz");

                const length = unitSelect(freq);

                drawAntenna(antenna + " for " + freq + " MHz", dipoleRed, dipoleBlue); //redraw the diagram with measurements in meters and title including frequency

                graphicAreaCTX.textBaseLine = "bottom";  //position measurement text
                graphicAreaCTX.textAlign="center";
                graphicAreaCTX.fillText(length + unitName(), (graphicArea.width / 4) + 10, 115);  //write measurement on canvas for each antenna leg
                graphicAreaCTX.textAlign="center";
                graphicAreaCTX.fillText(length + unitName(), (graphicArea.width * (3/4)) - 10, 115);

                drawScaleObj(71.5 / freq);
            }
                
            break;
        }

        case "Fan Dipole": {

            const freq1 = onlyNumbers("fan1"); //get three frequencies from input fields

            const freq2 = onlyNumbers("fan2");

            const freq3 = onlyNumbers("fan3");

            let length = [0, 0, 0];

            //calculate the length of each antenna leg and assign them to the length array
            length = [unitSelect(freq1), unitSelect(freq2), unitSelect(freq3)];

            if((freq1.length !== 0) && (freq2.length !== 0) && (freq3.length !== 0)) {
                    
                //sort the antenna lengths from longest to shortest
                length.sort(function(a, b) {return b - a});

                //update diagram title with frequencies when all three are entered.
                drawAntenna(antenna + " for " + freq1 + " MHz, " + freq2 + "MHz, and " + freq3 + " MHz", fanDipoleRed, fanDipoleBlue);

            }else{
                drawAntenna(antenna, fanDipoleRed, fanDipoleBlue);
            }

                if (freq1.length !== 0) { //update the diagram with each measurement as they're entered

                    console.log( antenna + " leg 1 for " + freq1 + " Mhz");

                    graphicAreaCTX.textBaseLine = "bottom";
                    graphicAreaCTX.textAlign="left";
                    graphicAreaCTX.fillText(length[0] + unitName(), 20, 210);

                    graphicAreaCTX.textBaseLine = "bottom";
                    graphicAreaCTX.textAlign="right";
                    graphicAreaCTX.fillText(length[0] + unitName(), 780, 210);
                }

                if (freq2.length !== 0) {

                    console.log( antenna + " leg 2 for " + freq2 + " Mhz");

                    graphicAreaCTX.textBaseLine = "middle";
                    graphicAreaCTX.textAlign="right";
                    graphicAreaCTX.fillText(length[1] + unitName(), 110, 125);

                    graphicAreaCTX.textBaseLine = "middle";
                    graphicAreaCTX.textAlign="left";
                    graphicAreaCTX.fillText(length[1] + unitName(), 690, 125);
                }

                if (freq3.length !== 0) {

                    console.log( antenna + " leg 3 for " + freq3 + " Mhz");

                    graphicAreaCTX.textBaseLine = "middle";
                    graphicAreaCTX.textAlign="right";
                    graphicAreaCTX.fillText(length[2] + unitName(), 230, 40);

                    graphicAreaCTX.textBaseLine = "middle";
                    graphicAreaCTX.textAlign="left";
                    graphicAreaCTX.fillText(length[2] + unitName(), 570, 40);

                }
                    
                //draw the scale object according to the length of the longest leg
                if ((freq1.length !== 0) && (freq2.length !== 0) && (freq3.length !== 0)) {

                    let freq = [freq1, freq2, freq3];

                    freq.sort(function(a, b) {return a - b});
                    drawScaleObj(71.5 / freq[2]);
                }

            break;
        }

        case "Inverted Vee": {

            const freq = onlyNumbers("mono");  //get the desired frequency from the text field

            drawAntenna(antenna, invertedVeeRed, invertedVeeBlue);

            if (freq.length != 0) {  //calculate antenna length and draw the antenna graphic in canvas
                                     //if the input field is not empty

                console.log( antenna + " for " + freq + " Mhz");
                const length = unitSelect(freq);

                drawAntenna(antenna + " for " + freq + " MHz", invertedVeeRed, invertedVeeBlue);

                graphicAreaCTX.textBaseLine = "bottom";
                graphicAreaCTX.textAlign="right";
                graphicAreaCTX.fillText(length + unitName(), (graphicArea.width / 4) + 10, (graphicArea.height / 2) - 10);
                graphicAreaCTX.textAlign="left";
                graphicAreaCTX.fillText(length + unitName(), (graphicArea.width * (3/4)) - 10, (graphicArea.height / 2) - 10);

                drawScaleObj(71.5 / freq);
            }

            break;
        }

        case "Off Center Fed Dipole": {

            const band = document.getElementById("ocfBands").value;
                
            drawAntenna(antenna + " for " + band + " MHz", ocfRed, ocfBlue);

            if (band === "40m"){
                console.log( antenna + " for " + band + " and below");
                length1 = 2 * unitSelect(7.1) * 0.64;
                length2 = 2 * unitSelect(7.1) * 0.36;
            }

            if (band === "80m"){
                console.log( antenna + " for " + band + " and below");
                length1 = 2 * unitSelect(3.6) * 0.64;
                length2 = 2 * unitSelect(3.6) * 0.36;
            }

            graphicAreaCTX.textBaseLine = "bottom";
            graphicAreaCTX.textAlign="center";
            graphicAreaCTX.fillText(length1.toFixed(3) + unitName(), 300, (graphicArea.height / 2) - 10);
            graphicAreaCTX.textAlign="center";
            graphicAreaCTX.fillText(length2.toFixed(3) + unitName(), 700, (graphicArea.height / 2) - 10);

            if(band === "40m") drawScaleObj(143 / 7.1 * 0.64); //use larger leg to draw scale image
            if(band === "80m") drawScaleObj(143 / 3.6 * 0.64);

            break;
        }
            
        case "Vertical": {

            const freq = onlyNumbers("mono");  //get the desired frequency from the text field

            drawAntenna(antenna, verticalRed, groundBlue);

            if (freq.length !== 0) {  //calculate antenna length and draw the antenna graphic in canvas
                                     //if the input field is not empty

                console.log( antenna + " for " + freq + " Mhz");
                const length = unitSelect(freq);
                    
                drawAntenna(antenna + " for " + freq + " MHz", verticalRed, groundBlue);
                    
                graphicAreaCTX.textBaseLine = "bottom";
                graphicAreaCTX.textAlign="left";
                graphicAreaCTX.fillText(length + unitName(), 410, (graphicArea.height / 2) - 10);
                graphicAreaCTX.textAlign="right";
                graphicAreaCTX.fillText(length + unitName(), 280, 200);

                drawScaleObj(71.5 / freq);

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

    const bus = new Image();
    const car = new Image();
    const hand = new Image();
    const armSpan = new Image();
    const chair = new Image();
    const coin = new Image();

    bus.src = "./assets/schoolBus.svg";
    car.src = "./assets/car.svg";
    hand.src = "./assets/hand.svg";
    armSpan.src = "./assets/armSpan.svg";
    chair.src = "./assets/chair.svg";
    coin.src = "./assets/coin.svg";

    //average real world width of each scale object in meters and image scale factor (w/h or h/w)

    const busWidth = 35; const busScale = 0.5;
    const carWidth = 4.8; const carScale = 0.5;
    const armSpanWidth = 1.7; const armSpanScale = 0.97;
    const handWidth = 0.1; const handScale = 1.35;
    const chairWidth = 0.5; const chairScale = 1.68;
    const coinDiam = 0.024;

    scale = 380 / antennaLength;  //pixels per meter determined by the given calculated antenna length

    graphicAreaCTX.globalAlpha = 0.3; //make the scale object opaque

    if (antennaLength >= 25) {

        width = scale * busWidth;
        bus.addEventListener('load', (e) => {graphicAreaCTX.drawImage(bus, 400 - (width / 2), graphicArea.height - (width * busScale) - 25, width, width * busScale)} );

    }

    if ((antennaLength >= 5) && (antennaLength < 25)){  //use a car as a scale object if the antenna is more than 5m long

        width = scale * carWidth;  //determine how many pixels the car length will be
        car.addEventListener('load', (e) => {graphicAreaCTX.drawImage(car, 400 - (width / 2), graphicArea.height - (width * carScale) - 25, width, width * carScale)} );
    }

    if ((antennaLength >= 2.9) &&  (antennaLength < 5)){ //use a person as the scale object if antenna is between 5 and 2.9m

        width = scale * armSpanWidth;
        armSpan.addEventListener('load', (e) => {graphicAreaCTX.drawImage(armSpan, 400 - (width / 2), graphicArea.height - (width * armSpanScale) - 25, width, width * armSpanScale)} );
    }

    if ((antennaLength >= 1.4) &&  (antennaLength < 2.9)){ //use a chair as a scale object if antenna length is 1.4 and 2.9m

        width = scale * chairWidth;
        chair.addEventListener('load', (e) => {graphicAreaCTX.drawImage(chair, 400 - (width / 2), graphicArea.height - (width * chairScale) - 25, width, width * chairScale)} );
    }

    if ((antennaLength >= 0.27) && (antennaLength < 1.4)){  //use a hand as a scale object if the antenna is 1.4 to 0.45m

        width = scale * handWidth;

        hand.addEventListener('load', (e) => {graphicAreaCTX.drawImage(hand, 400 - (width / 2), graphicArea.height - (width * handScale) - 25, width, width * handScale)} );
        
    }

    if (antennaLength < 0.27) {  //use an american quarter as a scale object if antenna is less than 0.45m

        width = scale * 0.024;
        coin.addEventListener('load', (e) => {graphicAreaCTX.drawImage(coin, 400 - (width / 2), (graphicArea.height / 2) - width / 2, width, width)} );
        
    }
}

function freqOptions(){  //disabled/enable input fields based on the type of antenna selected.

    const ant = Array.from(document.getElementsByName("antennaType"));  //converting antenna radio button to Array() object

    const antType = ant.find((ant) => ant.checked).value;  //find which radio button is checked

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
