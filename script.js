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
  p5.createCanvas(800, 200);
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

var combSort = function(p5) {
  var data = generateUnsortedData(length);
  
  function getNextGap(gap) {
    gap = parseInt((gap * 10)/13, 10);

    if (gap < 1) {
      gap = 1;
    }

    return gap;
  }

  p5.setup = async function() {
    canvasSetup(p5);
    p5.background(0);
    drawDataSet(p5, data);

    var gap = data.length;
    var elementsSwapped = true;

    while (gap != 1 || elementsSwapped == true) {
      gap = getNextGap(gap);

      elementsSwapped = false;

      for (var i = 0; i < data.length - gap; i++) {
        data[i].color = green;
        data[i + gap].color = red;
        if (data[i].value > data[i + gap].value) {
          swap(data, i, i + gap);
          elementsSwapped = true;
        }

        p5.background(0);
        drawDataSet(p5, data);

        await new Promise(r => setTimeout(r, timeBetweenActions));

        data[i].color = white;
        data[i + gap].color = white;
      }
    }

    for (var g = 0; g < data.length; g++) {
      data[g].color = white;
    }
    p5.background(0);
    drawDataSet(p5, data);
  };
}

var insertionSort = function(p5) {
  var data = generateUnsortedData(length);
  
  p5.setup = async function() {
    canvasSetup(p5);
    p5.background(0);
    drawDataSet(p5, data);

    var key, j;

    for (var i = 1; i < data.length; i++) {
      key = data[i].value;
      data[i].color = green;
      j = i - 1;
      p5.background(0);
      drawDataSet(p5, data);
      await new Promise(r => setTimeout(r, timeBetweenActions));

      while (j >= 0 && data[j].value > key) {
        data[j + 1].value = data[j].value;
        j--;

        data[j + 1].color = red;

        p5.background(0);
        drawDataSet(p5, data);
        await new Promise(r => setTimeout(r, timeBetweenActions));
        for (var g = 0; g < data.length; g++) {
          data[g].color = white;
        }
      }
      data[j + 1].value = key;

      for (var g = 0; g < data.length; g++) {
        data[g].color = white;
      }
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
var combSortP5 = new p5(combSort, 'combSort');
var insertionSortP5 = new p5(insertionSort, 'insertionSort');

function startSort() {
  timeBetweenActions = document.getElementById('sortTime').value;
  length = document.getElementById('sortLength').value;

  bubbleSortP5.remove();
  cocktailSortP5.remove();
  gnomeSortP5.remove();
  selectionSortP5.remove();
  combSortP5.remove();
  insertionSortP5.remove();

  bubbleSortP5 = new p5(bubbleSort, 'bubbleSort');
  cocktailSortP5 = new p5(cocktailSort, 'cocktailSort');
  gnomeSortP5 = new p5(gnomeSort, 'gnomeSort');
  selectionSortP5 = new p5(selectionSort, 'selectionSort');
  combSortP5 = new p5(combSort, 'combSort');
  insertionSortP5 = new p5(insertionSort, 'insertionSort');
}

var searchTimeBetweenActions = 500;
var searchDataLength = 20;
var searchValue = 0;
var linearSearch = function(p5) {
  var data = generateUnsortedData(searchDataLength);
  
  p5.setup = async function() {
    canvasSetup(p5);
    p5.background(0);
    drawDataSet(p5, data);

    for (var i = 0; i < data.length; i++) {
      data[i].color = red;

      if (data[i].value == searchValue) {
        data[i].color = green;
        return;
      }

      p5.background(0);
      drawDataSet(p5, data);
      await new Promise(r => setTimeout(r, searchTimeBetweenActions));
      data[i].color = white;
    }
  };

  p5.draw = function() {
    p5.background(0);
    drawDataSet(p5, data);
  }
}

var binarySearch = function(p5) {
  var data = [];
  data.length = searchDataLength;

  for (var i = 0; i < searchDataLength; i++) {
    data[i] = new DataPoint(i);
  }

  p5.setup = async function() {
    canvasSetup(p5);
    p5.background(0);
    drawDataSet(p5, data);
    await new Promise(r => setTimeout(r, searchTimeBetweenActions));

    var x = searchValue;
    var low = 0;
    var high = data.length - 1;
    var mid;
    while (high - low > 1) {
      mid = (low + high) / 2;
      mid = Math.floor(mid);
      if (data[mid].value == x) {
        data[mid].color = green;
        for (var i = 0; i < data.length; i++) {
          if (data[i].color != green) {
            data[i].color = red;
          }
        }
      }
      else if (data[high].value == x) {
        data[high].color = green;
        for (var i = 0; i < data.length; i++) {
          if (data[i].color != green) {
            data[i].color = red;
          }
        }
      }
      else if (data[low].value == x) {
        data[low].color = green;
        for (var i = 0; i < data.length; i++) {
          if (data[i].color != green) {
            data[i].color = red;
          }
        }
      }
      else if (data[mid].value < x) {
        for (var i = 0; i < mid + 1; i++) {
          data[i].color = red;
        }
        low = mid + 1;
      }
      else {
        for (var i = mid - 1; i < high + 1; i++) {
          data[i].color = red;
        }
        high = mid;
      }

      p5.background(0);
      drawDataSet(p5, data);
      await new Promise(r => setTimeout(r, searchTimeBetweenActions));
    }
  };

  p5.draw = function() {
    p5.background(0);
    drawDataSet(p5, data);
  }
}

var linearSearchP5 = new p5(linearSearch, 'linearSearch');
var binarySearchP5 = new p5(binarySearch, 'binarySearch');

function startSearch() {
  searchTimeBetweenActions = document.getElementById('searchTime').value;
  searchDataLength = document.getElementById('searchLength').value;
  searchValue = document.getElementById('searchData').value;

  linearSearchP5.remove();
  binarySearchP5.remove();
  linearSearchP5 = new p5(linearSearch, 'linearSearch');
  binarySearchP5 = new p5(binarySearch, 'binarySearch');
}
