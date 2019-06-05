const express = require('express');
const request = require('request');
var convert = require('xml-js');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

const app = express();

var trackData = "";
var xml ;

// console.log(result1, '\n', result2);

 setInterval(function () { 
  
   request('http://trackleaders.com/spot/transam19/fullfeed.xml', { json: true }, (err, res, body) => {
    
  if (err) { return console.log(err); }

    xml = body;
    // result = body;
  //  result = convert.xml2json(xml, {compact: true, spaces: 4});
  //  result = convert.xml2json(xml, {compact: false, spaces: 4});

    parser.parseString(xml, function (err, result) {
    
      // console.log(result);
      trackData = result;
  });

  });


}, 60000); 

app.get('/api/trackleads', (req, res) => {

  console.log(trackData);

   res.json(trackData);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);