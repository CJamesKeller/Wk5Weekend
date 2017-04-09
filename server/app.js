var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var db = require('./modules/db.js');

var index = require('./routes/index.js');
var movies = require('./routes/movies.js');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/', index);
app.use('/movies', movies);

app.listen(app.get('port'), function(){
    console.log('Listening on port: ', app.get('port'));
});

module.exports = app;
