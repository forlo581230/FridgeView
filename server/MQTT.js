var config = require('./config')
var mqtt = require('mqtt');
var mongoose = require('mongoose');
var db = require('./db/mongodb');
var fridgeSchema = require('./model/fridge');
var moment = require('moment');

// var interval = 5;
// var timer = null
// var carNum = [];
// var carObject = [];

var Random = Math.floor(Math.random() * 1024) + 1

var options = {
    port: config.LOCAL_MQTT_PORT,
    host: config.LOCAL_MQTT_SERVER,
    clientId: 'guest_' + Random,
    username: 'guest_' + Random,
    password: 'guest_' + Random,
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

var client = mqtt.connect(options);
client.subscribe('rfid');


client.on('connect', function () {
    console.info('MQTT is connnecting!');
    db.init(config.LOCAL_DATABASE, (result) => {
        if (result) {

        }
    });
})

client.on('message', function (topic, message) {
    // message is Buffer
    client.publish(config.LOCAL_MQTT_TOPIC, message.toString() + ' OK!');
    
    try {
        var Fridge = mongoose.model('check', fridgeSchema);
        var fridge = new Fridge(JSON.parse(message.toString())[0]);

        if (fridge.check() == -1) {
            
            // console.log(Fridge.modelName);
            let Fridge = mongoose.model('data_'+new moment().format('YYYYMMDD')+'_'+fridge.reader_mac, fridgeSchema);
            let newfridge = new Fridge(JSON.parse(message.toString())[0]);
            newfridge.save(function (err) {
                if (err) {
                    throw '\x1b[31m Error: mongodb ' + err + '\x1b[37m';
                } else {
                    console.log('\x1b[32m System: readerMac ->' + newfridge.reader_mac + ' inserted database ! \x1b[37m')
                }
            });
        } else {
            throw '\x1b[31m Error: Parsing Error ' + '\x1b[37m';
        }
    }
    catch (err) {
        console.log(err);
    }




})

