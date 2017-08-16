/**
 * Created by ZhangQiang on 2017-6-25.
 * 程序总出口
 */
'use strict'

let warehouse = require('./tdt/WarehouseHelper')
let mongodb = require('./db/MongodbMgr');

let tdt = module.exports = {
    keywords : [],
    sliders : [], //[{img, url}]
    shops : [],
}

tdt.Install = function (cb) {
    warehouse.Install((err) => {
        if(err){
            cb(err);
        }
        else{
            tdt.LoadKeywords((err) => {
                if(err){
                    cb(err);
                }
                else{
                    cb();
                }
            })
        }
    });

}

tdt.Uninstall = function (cb) {

}

tdt.SaveKeywords = function (cb) {
    mongodb.GetShellCollection().remove({key : 'keywords'}, function () {
        let item = {key : 'keywords', data : {data : tdt.keywords}};
        mongodb.GetShellCollection().create(item, cb);
    })
}

tdt.LoadKeywords = function (cb) {
    mongodb.GetShellCollection().findOne({key : 'keywords'}, (err, item) =>{
       if(err){
            cb(err);
       }
       else{
           if(item)
            tdt.keywords = item.data.data;
           cb();
       }
    });
}

tdt.AddSearchKeyword = function (keyword) {
    for(let i=0; i<tdt.keywords.length; i++){
        if(tdt.keywords[i] == keyword){
            return;
        }
    }
    tdt.keywords.unshift(keyword);
    if(tdt.keywords.length > 30){
        tdt.keywords = tdt.keywords.splice(0, 30);
    }
}

tdt.GetHotCommoditiesInCache = function () {
    return warehouse.hotcommodities;
}

tdt.GetRedCommoditiesInCache = function () {
    return warehouse.redcommodities;
}

tdt.GetCategories = function () {
    return warehouse.categories;
}

tdt.FindCommoditiesByCat = function (category, page, page_size, cb) {
    warehouse.FindCommoditiesByCategory_wh(category, page, page_size, cb);
}

tdt.FindCommoditiesByTitle = function (keyword, page, page_size, cb) {
    warehouse.FindCommoditiesByTitle_wh(keyword, page, page_size, cb);
}
