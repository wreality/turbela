var stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});

stdin.on('end', function () {
  var inputJSON = inputChunks.join()
  const parsedData = JSON.parse(inputJSON)
  var fs = require('fs')
  var fabric = require('fabric').fabric

  var canvas = new fabric.Canvas()
  canvas.setWidth(parsedData.backgroundImage.width)
  canvas.setHeight(parsedData.backgroundImage.height)

  canvas.loadFromJSON(parsedData, (c) => {
    canvas.renderAll();
    var stream = canvas.createPNGStream();
    stream.on('data', function (chunk) {
      stdout.write(chunk);
    });
  });


});

