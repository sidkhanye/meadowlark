var express = require('express');
var http = require('http');
var app = express()
var server = http.createServer();

app.set('port', process.env.PORT || 3000)

var theport = app.get('port')



server.listen(theport, function(){
    console.log('Currently listening to port:' + theport);
});