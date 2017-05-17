var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');

var app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/* TODO: a favicon might be nice */
// app.use(favicon(path.join(__dirname,'images','favicon.ico')));

/**
 * Configuration
 */
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'app')));


var server = app.listen(app.get('port'), function() {
    console.log("Frontend-Demo application running on port " + this.address().port + "!");
});
