var white = [255, 255, 255];
var green = [0, 255, 0];
var red = [255, 0, 0];

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

function canvasSetup(p5) {
  p5.createCanvas(400, 200);
  p5.frameRate(60);
}

function swap(array, index1, index2) {
  var temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

var length = 25;
var timeBetweenActions = 20;

var bubbleSort = function(p5) {
  var data = generateUnsortedData(length);
  
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

var cocktailSort = function(p5) {
  var data = generateUnsortedData(length);
  
  p5.setup = async function() {
    canvasSetup(p5);
    p5.background(0);
    drawDataSet(p5, data);

    var elementsSwapped = true;
    var start = 0;
    var end = data.length;

    // if elements are being swapped the list is not yet sorted
    while (elementsSwapped == true) {
      // Stage 1
      elementsSwapped = false;

      for (var i = 0; i < data.length - 1; i++) {
        data[i].color = green;
        if (data[i].value > data[i + 1].value) {
          swap(data, i, i + 1);
          elementsSwapped = true;
          p5.background(0);
          drawDataSet(p5, data);

          await new Promise(r => setTimeout(r, timeBetweenActions));
        }
        data[i].color = white;
        data[i + 1].color = white;
      }
      
      if (elementsSwapped == false) {
        break;
      }

      // Stage 2
      elementsSwapped = false;
      end--;

      for (var i = end - 1; i >= start; i--) {
        data[i].color = red;
        if (data[i].value > data[i + 1].value) {
          swap(data, i, i + 1);
          elementsSwapped = true;
          p5.background(0);
          drawDataSet(p5, data);

          await new Promise(r => setTimeout(r, timeBetweenActions));
        }
        data[i].color = white;
        data[i + 1].color = white;
      }

      start++;
    }

    for (var g = 0; g < data.length; g++) {
      data[g].color = white;
    }
    p5.background(0);
    drawDataSet(p5, data);
  };
}

var gnomeSort = function(p5) {
  var data = generateUnsortedData(length);

  p5.setup = async function() {
    canvasSetup(p5);
    p5.background(0);
    drawDataSet(p5, data);

    var i = 0;

    while (i < data.length) {
      data[i].color = green;
      if (i != 0) {
        data[i - 1].color = red;
      }

      if (i == 0) {
        i++;
      }
      if (data[i].value >= data[i - 1].value) {
        i++;
      }
      else {
        swap(data, i, i - 1);
        i--;
      }

      p5.background(0);
      drawDataSet(p5, data);

      for (var g = 0; g < data.length; g++) {
        data[g].color = white;
      }

      await new Promise(r => setTimeout(r, timeBetweenActions));
    }

    for (var g = 0; g < data.length; g++) {
      data[g].color = white;
    }
    p5.background(0);
    drawDataSet(p5, data);
  };
}

var selectionSort = function(p5) {
  var data = generateUnsortedData(length);
  
  p5.setup = async function() {
    canvasSetup(p5);
    p5.background(0);
    drawDataSet(p5, data);

    for (var i = 0; i < data.length - 1; i++) {
      var minUnsortedIndex = i;
      data[i].color = green;
      for (var j = i + 1; j < data.length; j++) {
        data[j].color = red;

        p5.background(0);
        drawDataSet(p5, data);
        await new Promise(r => setTimeout(r, timeBetweenActions));

        if (data[j].value < data[minUnsortedIndex].value) {
          minUnsortedIndex = j;
        }
        
        data[j].color = white;
      }
      swap(data, i, minUnsortedIndex);

      for (var g = 0; g < data.length; g++) {
        data[g].color = white;
      }

      p5.background(0);
      drawDataSet(p5, data);
      await new Promise(r => setTimeout(r, timeBetweenActions));
    }

    for (var g = 0; g < data.length; g++) {
      data[g].color = white;
    }
    p5.background(0);
    drawDataSet(p5, data);
  };
}

var bubbleSortP5 = new p5(bubbleSort, 'bubbleSort');
var cocktailSortP5 = new p5(cocktailSort, 'cocktailSort');
var gnomeSortP5 = new p5(gnomeSort, 'gnomeSort');
var selectionSortP5 = new p5(selectionSort, 'selectionSort');