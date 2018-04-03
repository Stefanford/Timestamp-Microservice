//Required for nodeJS

var expres = require('express');
var bodyParser = require('body-parser');
var cors  = require('cors');


//Create instance of expres for our project and instantiate bodyParser and cors

var project = module.exports = expres();
project.use(bodyParser.json());
project.use(cors());

// GEt callto return the JSON formats of natural and unix date format
project.get('/date/:dateParams', function(req, res, next){
    //Gets the requests data for date
    var dateParams = req.params.dateParams;
    //Options for formatting date in natural date view
    var date = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    if(isNaN(dateParams)){
        var naturalTime = new Date(dateParams);
        naturalTime = naturalTime.toLocaleDateString("en-us", date);
        var unixTime = new Date(dateParams).getTime()/1000;

    }
    else{
        var unixTime = dateParams;
        var naturalTime = new Date(dateParams *1000);
        naturalTime = naturalTime.toLocaleDateString("en-us", date);
    }
    res.json({unix: unixTime, natural: naturalTime});
});

project.listen(8000, function(){
    console.log('Node is working');
})