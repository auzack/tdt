/**
 * Created by ZhangQiang on 2017-6-18.
 */

'use strict'


let commoditySchema = require('./Schemas/CommoditySchema');
let shellSchema = require('./Schemas/ShellSchema');

let mongoose = require('mongoose');

let db = mongoose.createConnection('tdt:justasecret.**@127.0.0.1', 'tdt');

db.on('error', console.error.bind(console,'连接错误:'));

// db.once('open', function () {
//     console.log('open-----');
// })

let commodityModel = db.model('commodity', commoditySchema);
let shellModel = db.model('shell', shellSchema);
// let serverCfgModel = db.model('servercfg', serverCfgSchema);


// commodityModel.findByArea(0, 1, function (err, data) {
//     console.log(data);
// })

// let data = {key : "test1", data : {data : 10}};
// shellModel.create(data, function () {
//     console.log('0000');
// });


// serverCfgModel.remove({}, function (err, product) {
//
// })
// let data = new serverCfgModel({keyName : "test1", data : 10});
//
// data.save(function () {
//     console.log('----');
// })

// serverCfgModel.findOne({keyName : 'test2'}, function (err, cfg) {
//     console.log(cfg);
// })

// serverCfgModel.update({keyName : 'test5'}, {data : {key : 65}},function (err, d) {
//     console.log(d);
// })


// let comEntity = new commodityModel({title : '测试123数据'});

// comEntity.save(function () {
//     console.log("dddd");
// });

// commodityModel.find(function (err, data) {
//    console.log(data);
// });


// commodityModel.findByTitle('男士', function (err, data) {
//     console.log(data);
// });

// commodityModel.find({title: new RegExp('s1', 'i')}, function (err, data) {
//     console.log(data);
// })


module.exports.GetCommodityCollection = function () {
    return commodityModel;
}

module.exports.GetShellCollection = function () {
    return shellModel;
}