var white = [255, 255, 255];
var green = [0, 255, 0];

var framesPerAction = 120;

class DataPoint {
  constructor(val) {
    this.value = val;
  }
  
  color = white;
  value = 0;
}

function generateUnsortedData(length) {
  var data = [];

  for (var i = 0; i < length; i++) {
    data.push(new DataPoint(Math.floor((Math.random() * length) + 1)));
  }

  return data;
}

function drawDataSet(p5, data) {
  var width = p5.width;
  var height = p5.height;
  var margin = 5;
  
  var widthPer = (width - 2 * margin) / data.length;
  var unitHeight = (height - 2 * margin) / data.length;
  
  for (var i = 0; i < data.length; i++) {
    p5.fill(data[i].color[0], data[i].color[1], data[i].color[2]);
    p5.rect(i * widthPer + margin, // X
            (height - margin) - (data[i].value * unitHeight), // Y
            widthPer, // width
            data[i].value * unitHeight // height
           );
  }
}

function resetDataColours(data) {
  for (var i = 0; i < data.length; i++) {
    data[i].color = white;
  }
}

function canvasSetup(p5) {
  p5.createCanvas(400, 200);
  p5.frameRate(60);
}

var length = 25;
var timeBetweenActions = 20;
var bubbleSort = function(p5) {
  var data = generateUnsortedData(length);

  function swap(array, index1, index2) {
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }
  
  p5.setup = async function() {
    canvasSetup(p5);
    p5.background(0);
    drawDataSet(p5, data);

    for (var i = 0; i < data.length - 1; i++) {
      for (var j = 0; j < data.length - i - 1; j++) {
        data[j].color = green;
        if (data[j].value > data[j + 1].value) {
          swap(data, j, j + 1);
          p5.background(0);
          drawDataSet(p5, data);

          await new Promise(r => setTimeout(r, timeBetweenActions));
        }
        data[j].color = white;
        data[j + 1].color = white;
      }
    }

    for (var g = 0; g < data.length; g++) {
      data[g].color = white;
    }
    p5.background(0);
    drawDataSet(p5, data);
  };
}

var myp5 = new p5(bubbleSort, 'bubbleSort');
