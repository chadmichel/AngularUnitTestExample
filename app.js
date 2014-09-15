var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

// ugly error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Bad things');
});

app.use(express.static(path.join(__dirname, '/'))); 

app.get("/dropboxapikey", function(req, res) {
    // Return dropbox api key from an environment variable.
    // export dropboxApiKey=your_key
    res.send(process.env.dropboxApiKey);
});

app.listen(3000);