/**
 * Created by ZhangQiang on 2017-6-29.
 */
'use strict'

var TopClient = require('../../lib/api/topClient').TopClient;
var client = new TopClient({
    'appkey': 'you appkey',
    'appsecret': 'your secret',
    // 'REST_URL' : 'http://gw.api.taobao.com/router/rest',
    'REST_URL': 'http://gw.api.tbsandbox.com/router/rest'
});

let api = module.exports = {
    adzone_id: '115750792',

};

api.FindCouponsByTile = function (title, page, page_size, cb) {
    client.execute('taobao.tbk.dg.item.coupon.get', {
        'adzone_id': this.adzone_id,
        'q' : title,
        'page_size': page_size,
        'page_no': page
    }, function (error, response) {
        if(response.results && response.results.tbk_coupon){
            cb(null, response.results.tbk_coupon);
        }
        else{
            console.log('FindCouponsByTile error ' + title + ' ' + page)
            cb('err');
        }
    })
}

api.FindCoupons = function (page, page_size, cb) {
    client.execute('taobao.tbk.dg.item.coupon.get', {
        'adzone_id': this.adzone_id,
        'page_size': page_size,
        'page_no': page,
        'end_tk_rate' : '2000'
    }, function (error, response) {
        if(response.results && response.results.tbk_coupon){
            cb(null, response.results.tbk_coupon);
        }
        else{
            console.log('FindCoupons error ' + page)
            cb('err');
        }
    })
}

api.FindCouponsByCategory = function (category, page, page_size, cb) {
    client.execute('taobao.tbk.dg.item.coupon.get', {
        'adzone_id': this.adzone_id,
        'page_size': page_size,
        'page_no': page,
        'cat' : category
    }, function (error, response) {
        if(response.results && response.results.tbk_coupon){
            cb(null, response.results.tbk_coupon);
        }
        else{
            console.log('FindCouponsByCategory error ' + category)
            cb('err');
        }
    })
}

api.FindCouponsByFilter = function (filter, cb) {
    filter.adzone_id = this.adzone_id;
    client.execute('taobao.tbk.dg.item.coupon.get', filter, function (error, response) {
        if(response.results && response.results.tbk_coupon){
            cb(null, response.results.tbk_coupon);
        }
        else{
            console.log('FindCouponsByFilter error ' + filter)
            cb('err');
        }
    })
}