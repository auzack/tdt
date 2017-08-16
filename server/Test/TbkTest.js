/**
 * Created by ZhangQiang on 2017-6-29.
 */
'use strict'
var TopClient = require('../../lib/api/topClient').TopClient;
var client = new TopClient({
    'appkey': 'your app key',
    'appsecret': 'your appsecret',
    'REST_URL': 'http://gw.api.tbsandbox.com/router/rest'
});



// function PackCoupon (origin) {
//     let coupon = {};
//
//     coupon.coupon_url = origin.coupon_click_url;
//     coupon.title = origin.title;
//     coupon.disprice = origin.zk_final_price;
//     coupon.img = origin.pict_url;
//     coupon.coupon_num = origin.coupon_remain_count;
//     coupon.coupon_max = origin.coupon_total_count;
//     coupon.pla = origin.user_type;
//     coupon.price = 6300;
//
//     let site = 0;
//     console.log(origin.coupon_info);
//     for(let i=origin.coupon_info.length-2; i>=0; i--){
//         if(isNaN(origin.coupon_info[i])){
//             site = i;
//             break;
//         }
//     }
//     let num = origin.coupon_info.substring(site + 1, origin.coupon_info.length-1);
//     coupon.coupon_val = num;
//
//     coupon.price = parseFloat(num) + parseFloat(coupon.disprice);
//
//     return coupon;
// }
//
// client.execute('taobao.tbk.dg.item.coupon.get', {
//     'adzone_id':'115750792',
//     'page_size':'1',
//     'page_no':'1',
//     // 'q' : '佑游男士平角泳裤'
//     'cat' : '80'
// }, function(error, response) {
//     console.log(response);
//     if (!error){
//         console.log(response.results.tbk_coupon);
//     } //console.log(response.results.tbk_coupon);
//     else console.log(error);
// })

// let TopClient = require('../../lib/api/topClient').TopClient;
// var client = new TopClient({
//     'appkey': '24526975',
//     'appsecret': '35cf0b7225edeee0d834ca29004703c7',
//     'REST_URL': 'http://gw.api.tbsandbox.com/router/rest'
// });
//
// client.execute('taobao.itemcats.get', {
//     'cids':'18957,19562',
//     'datetime':'2000-01-01 00:00:00',
//     'fields':'cid,parent_cid,name,is_parent',
//     'parent_cid':'50011999'
// }, function(error, response) {
//     if (!error) console.log(response);
//     else console.log(error);
// })

// var client2 = new TopClient({
//     'appkey': '24526975',
//     'appsecret': '35cf0b7225edeee0d834ca29004703c7',
//     'REST_URL': 'http://gw.api.tbsandbox.com/router/rest'
// })

client.execute('taobao.tbk.spread.get', {
    'requests': '{url:\'http://uland.taobao.com/coupon/edetail?e=2sWuDSc%2F3IA8Clx5mXPEKv4D%2BIE0Por9QDMfEVoX3EtX2mbi0rysL6vfg00%2FvH9QRfV8u5bMiHS%2BsyqorBJypBW9PFCijha4QBDOcCOBLyyEePHEwH4m3KS9381o%2FjIbiFCZFtSjRoHm1l%2FzG1ayVX%2Ftp4YtWGnIQTCdJ3vkvaXbLIov%2B7JMAg%3D%3D\'}',
    // 'url' : ['http://temai.taobao.com']
}, function(error, response) {
    if (!error) console.log(response.results.tbk_spread[0].content);
    else console.log(error);
})