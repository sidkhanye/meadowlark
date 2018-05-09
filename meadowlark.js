var fortune = require('./lib/fortune.js');

var express = require('express');
var app = express();
app.disable('x-powered-by');
//setting up handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); 

var handlebars = require('express3-handlebars')
.create({defaultLayout: 'main',
helpers: {
    section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    }
}});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var port = app.set('port', process.env.PORT || 8800);
 
//static middleware, to be added before any routes are declared.
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
});

// start of routes
app.get('/', function(req, res){
    res.render('home');
});

//route redeigned to generate random quote on page reload
app.get('/about', function(req, res, next){
    res.render('about', {fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'} );
});

app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});

app.get('/request-group-rate', function(req, res){
    res.render('/tours/request-group-rate');
});


//Error 404 Handler (middleware)
 app.use(function(req, res, next){
    res.status(404);
    res.render('404');
 });

//500 Error Handler (middleware)
 app.use(function(err, req, res, next){
     console.error(err.stack);
     res.status(500);
     res.render('500');
 });

app.get('/headers', function(req, res){
    res.set('Content-Type', 'text-plain');

    var s = '';

    for(var name in req.headers)
    s += name + ':' + req.headers[name] + '\n';
    res.send(s);
});

app.listen(app.get('port'), function(){
    console.log('Currently listening to port','[',app.get('port'),']', 'press Ctrl-C to terminate');
});

function getWeatherData(){
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F  (12.3 C)',
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F  (12.8 C)',
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F  (12.8 C)',
            }
        ],
    };
}

app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials = getWeatherData();
    next();
});

app.get('/nursery-rhyme', function(req, res){
    res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function(req, res){
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck',
    });
});











//rendering a view called foo.hbs

// app.get('/foo', function(res, req){
//     res.render('foo');
// });
