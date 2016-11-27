var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('iotdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'iotdb' database"); 
    }
});

exports.findByDate = function(req, res) {
    var date = req.params.date;
    console.log('Retrieving data from the : ' + date);
    db.collection('data', function(err, collection) {
        collection.find({ date: date }).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.findByDateTime = function(req, res) {
//res.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"});
    console.log('Retrieving data from the : ' + date +' at '+ time);
    db.collection('data', function(err, collection) {
        collection.find({date: date,time: time}).toArray(function(err, item) {
            res.send(item)
        });
    });
};

exports.findByRoomDate = function(req, res) {
    var room = req.param("idRoom");
    var date = req.param("date");
    console.log('Retrieving data from the : ' + date   + ' of room '+ room);
    db.collection('data', function(err, collection) {
        collection.find({room: room, date: date}).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.findByRoomDateTime = function(req, res) {
    var date = req.param("date");
    var time = req.params("time");
    var room = req.params("idRoom");
    console.log('Retrieving data from the : ' + date +' at '+ time + ' of room '+ room);
    db.collection('data', function(err, collection) {
        collection.find({room: room, date: date, time : time}).toArray(function(err, item) {
            res.send(item);
        });
    });
};


/*------------------------------------------------------------------------------------------*/

exports.findbyTemp = function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    console.log('Retrieving temperature data');
    db.collection('data', function(err, collection) {
        collection.find({type: "temperature"}).toArray(function(err, item) {
            res.send(item);
        });
    });
};


exports.findbyRoomGaz = function(req, res) {
    var date = req.param("date");
    var room = req.params("idRoom");
    console.log('Retrieving data from the : ' + date +' at '+ time + ' of room '+ room);
    db.collection('data', function(err, collection) {
        collection.find({type: gaz, room: room, date: date}).toArray(function(err, item) {
            res.send(item);
        });
    });
};


exports.findbyRoomMotion = function(req, res) {
    var date = req.param("date");
    var room = req.params("idRoom");
    console.log('Retrieving data from the : ' + date +' at '+ time + ' of room '+ room);
    db.collection('data', function(err, collection) {
        collection.find({type: motion, room: room, date: date}).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.findbyRoomLight = function(req, res) {
    var date = req.param("date");
    var room = req.params("idRoom");
    console.log('Retrieving data from the : ' + date +' at '+ time + ' of room '+ room);
    db.collection('data', function(err, collection) {
        collection.find({type: light, room: room, date: date}).toArray(function(err, item) {
            res.send(item);
        });
    });
};


/*------------------------------------------------------------------------------------------*/

exports.findbyRoomTempTime = function(req, res) {
    var date = req.param("date");
    var time = req.params("time");
    var room = req.params("idRoom");
    console.log('Retrieving data from the : ' + date +' at '+ time + ' of room '+ room);
    db.collection('data', function(err, collection) {
        collection.find({type: temperature, room: room, date: date, time : time}).toArray(function(err, item) {
            res.send(item);
        });
    });
};


exports.findbyRoomGazTime = function(req, res) {
    var date = req.param("date");
    var time = req.params("time");
    var room = req.params("idRoom");
    console.log('Retrieving data from the : ' + date +' at '+ time + ' of room '+ room);
    db.collection('data', function(err, collection) {
        collection.find({type: gaz, room: room, date: date, time : time}).toArray(function(err, item) {
            res.send(item);
        });
    });
};


exports.findbyRoomMotionTime = function(req, res) {
    var date = req.param("date");
    var time = req.params("time");
    var room = req.params("idRoom");
    console.log('Retrieving data from the : ' + date +' at '+ time + ' of room '+ room);
    db.collection('data', function(err, collection) {
        collection.find({type: motion, room: room, date: date, time : time}).toArray(function(err, item) {
            res.send(item);
        });
    });
};


exports.findbyRoomLightTime = function(req, res) {
    var date = req.param("date");
    var time = req.params("time");
    var room = req.params("idRoom");
    console.log('Retrieving data from the : ' + date +' at '+ time + ' of room '+ room);
    db.collection('data', function(err, collection) {
        collection.find({type: light, room: room, date: date, time : time}).toArray(function(err, item) {
            res.send(item);
        });
    });
};

exports.addError = function(req, res) {
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
}
