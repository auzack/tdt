/**
 * Created by ZhangQiang on 2017-6-26.
 * 数据类型壳 可以存放一些小型业务数据 没有结构 直接是key data形式
 */
'use strict'

let mongoos = require('mongoose');

let schema = new mongoos.Schema({
    key : String,
    data : {}
});

module.exports = schema;