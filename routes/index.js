'use strict'

var express = require('express');
var router = express.Router();

let tdt = require('../server/TDTMgr');


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: '淘殿堂' , describe : '淘宝优惠券查询系统'});
    res.render('index', { title: '淘殿堂' , describe : '免费领取各种淘宝优惠券 正当时快乐购', keywords : tdt.keywords, hotcommodities : tdt.GetHotCommoditiesInCache(), redcommodities : tdt.GetRedCommoditiesInCache(), sliders : tdt.sliders, categories : tdt.GetCategories()});
});

/**通过类别获取宝贝*/
router.post('/category', function (req, res) {
    tdt.FindCommoditiesByCat(req.body.category, req.body.page, req.body.page_size, function (err, data) {
        if(err){
            console.log(err);
            res.send({err : '没有查找到相关宝贝信息'});
        }
        else{
            res.send({data:data});
        }
    })
})

/**通过关键字搜索*/
router.get('/search', function (req, res, next) {
    if(!req.query.keyword){
        res.render('search', {title : '淘殿堂', describe : '淘宝优惠券查询系统 官方数据', keywords : tdt.keywords, commodities : [], keyword: ''});
    }
    else{
        tdt.FindCommoditiesByTitle(req.query.keyword, req.query.page, req.query.page_size, function (err, data) {
            let _data = [];
            if(err)
                console.log('search error' + err);
            else{
                _data = data;
                tdt.AddSearchKeyword(req.query.keyword);
            }
            res.render('search', {title : '淘殿堂', describe : '淘宝优惠券查询系统', keywords : tdt.keywords, commodities : _data, keyword: req.query.keyword});
        })

    }
})

router.post('/search', function (req, res) {
    if(!req.body.keyword || !req.body.page || !req.body.page_size){
        res.send({err : '已经搜索不到更多的宝贝了'});
    }
    else{
        tdt.FindCommoditiesByTitle(req.body.keyword, req.body.page, req.body.page_size, function (err, data) {
            let res_data = {}
            if(err){
                res_data.err = '已经搜索不到更多的宝贝了';
                console.log('搜索关键字到搜索页面错误' + err);
            }
            else{
                tdt.AddSearchKeyword(req.body.keyword);
            }
            res_data.data = data;
            res.send(res_data);
        })
    }
})

module.exports = router;
