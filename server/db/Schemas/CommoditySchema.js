/**
 * Created by ZhangQiang on 2017-6-25.
 */
'use strict'

let mongoose = require('mongoose');

let commoditySchema = new mongoose.Schema({
    title : String,
    img : String,
    price : Number,
    disprice : Number,
    coupon_val : Number,
    coupon_url : String,
    coupon_num : Number,
    coupon_max : Number,
    pla : Number, //0淘宝 1天猫 3未知
    category : Number //类别 0女装 1男装 2鞋包配饰 3居家日用 4数码家电 5运动户外 6母婴用品 7汽车用品 8美食
});


commoditySchema.statics.findByTitle = function (title, cb) {
    this.find({title : new RegExp(title, 'i')}, cb);
}

commoditySchema.statics.findByArea = function (site, num, cb) {
    this.find({}, null, {skip: site, limit: num}, cb);
}

commoditySchema.statics.findByCategoryToArea = function (category, site, num, cb) {
    this.find({category : category}, null, {skip : site, limit : num}, cb);
}

module.exports = commoditySchema;