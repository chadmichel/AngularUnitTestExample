var express = require('express');
var app = express();
var path = require('path');

// ugly error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Bad things');
});

app.use(express.static(path.join(__dirname, '/'))); 

app.listen(3000);