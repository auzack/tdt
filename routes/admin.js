/**
 * Created by ZhangQiang on 2017-7-1.
 */
'use strict'
var express = require('express');
var router = express.Router();

let tdt = require('../server/TDTMgr');
let warehouse = require('../server/tdt/WarehouseHelper')

router.get('/woxiangcungeshujua', function (req, res) {
    tdt.SaveKeywords((err) => {
       if(err)
           res.send(err);
       else
           res.send('ok');
    });
})

router.get('/woxiangyaogengxina', function (req, res) {
    warehouse.LoadHotCommodities(()=>{});
    warehouse.LoadRedCommodities(()=>{res.send('ok')});
})

module.exports = router;