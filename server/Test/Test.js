/**
 * Created by ZhangQiang on 2017-6-26.
 */
'use strict'

// let coupon = '慢19元减45元';
//
// let site = 0;
//
//
// for(let i=coupon.length-2; i>=0; i--){
//     if(isNaN(coupon[i])){
//         site = i;
//         break;
//     }
// }
// let num = coupon.substring(site + 1, coupon.length-1);
//
//
// let a = '65.06';
// let b = parseFloat(a);
// let m = parseFloat(num)
// let c = m + b;
//
// console.log(c);

// let schedule = require('node-schedule');
// let rule = new schedule.RecurrenceRule();
// rule.second = 2;
// schedule.scheduleJob(rule, function () {
//     console.log('=====');
// })
// let m = module.exports = {
//     am : []
// }
//
// m.Add = function (key) {
//     m.am.unshift(key);
// }
//
//
// m.Add('ttt');
//
// console.log(m.am);

for(let i=0; i<60; i++){
    if(i%4 == 0)
        console.log(i);
}