var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var app = express();
var jsonParser = bodyParser.json();
app.use(jsonParser);

/* TODO: a favicon might be nice */
// app.use(favicon(path.join(__dirname,'images','favicon.ico')));

/**
 * Configuration
 */
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'app')));
app.get('*', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

app.post('/data/users', jsonParser, function(request, response) {
  var body = JSON.stringify(request.body);
  var filepath = __dirname + '/app/data/users.json';
  fs.truncate(filepath, 0, function() {
    fs.writeFile(filepath, body, function(err) {
      response.end();
      if(err) {
        console.log('Error saving users: ' + err);
      }
    });
  });
});

var server = app.listen(app.get('port'), function() {
    console.log("Frontend-Demo application running on port " + this.address().port + "!");
});
