//import required modules
var express = require('express'),
    data = require('./routes/data');
var logger = require('morgan');
var bodyParser = require('body-parser');
// start server
var app = express();


           /******** Configuration ***********/
app.use(logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());


            /* Retrieve data based on date or Time */
app.get('/data/date/:date', data.findByDate);
app.get('/data/roomdate/:idRoom/:date', data.findByRoomDate);
app.get('/data/roomdatetime/:idRoom/:date/:time', data.findByDateTime);

           /*Retrieve sensors' date based in a date*/
app.get('/data/temperature',data.findbyTemp);
app.get('/data/gaz/:idRomm/:date',data.findbyRoomGaz);
app.get('/data/light/:idRoom/:date', data.findbyRoomLight);

           /* Retrieve sensors' data based on Time*/
//app.get('/data/temperature/:idRomm/:date/:time',data.findbyRoomTempTime);
app.get('/data/gaz/:idRomm/:date/:time',data.findbyRoomGazTime);
app.get('/data/light/:idRoom/:date/:time', data.findbyRoomLightTime);

app.post('/data/temperature/error',function(req, res) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    var alert = req.body;
    console.log('Adding alerts: ' + JSON.stringify(alert));
    db.collection('alerts', function(err, collection) {
        collection.insert(alert, {safe :true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
});

app.listen(3000);
console.log('Listening on port 3000...');
