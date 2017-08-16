/**
 * Created by ZhangQiang on 2017-6-26.
 * 仓库管理接口
 */
'use strict'

let cm = {
    coupon_val : 200,
    coupon_url : 'http://www.taobao.com',
    title : 'This is a title with the item, you can input a lot of msg in it, test test test',
    disprice : 500,
    img : 'http://imgsrc.baidu.com/image/c0%3Dshijue%2C0%2C0%2C245%2C40/sign=9f058521ab8b87d6444fa35c6f61424d/54fbb2fb43166d22635322844c2309f79052d2fd.jpg',
    coupon_num : 900,
    coupon_max : 600,
    pla : 0,
    price : 600
}

let cm_1 = {
    coupon_val : 300,
    coupon_url : 'http://www.taobao.com',
    title : '测试啊-1',
    disprice : 505,
    img : 'http://img.sj33.cn/uploads/allimg/201302/1-130201105055.jpg',
    coupon_num : 90,
    coupon_max : 1600,
    pla : 1,
    price : 6300
}

// let mongodb = require('../db/MongodbMgr');
let tb = require('../tbk/TbkAPI');

let warehouse = module.exports = {
    hotcommodities : [],
    redcommodities : [],//缓存12条数据
    categories : [//类别 0女装 1男装 2鞋包配饰 3化妆品 4居家日用 5数码家电 6运动户外 7母婴用品 8汽车用品 9美食
        {id : 0, title : '全部', category : ''},
        {id : 1, title : '女装', category : '16'},
        {id : 2, title : '男装', category : '30'},
        {id : 2, title : '童装', category : '50008165'},
        {id : 3, title : '鞋包配饰', category : '1625'},
        {id : 4, title : '化妆品', category : '1801'},
        {id : 5, title : '居家日用', category : '21,27'},
        {id : 6, title : '数码家电', category : '11,14,20'},
        {id : 7, title : '运动户外', category : '50011699'},
        {id : 8, title : '母婴用品', category : '35'},
        {id : 9, title : '汽车用品', category : '26'},
        {id : 10, title : '美食', category : '50002766'},
        {id : 10, title : '宠物', category : '29'},
        {id : 11, title : '计生用品', category : '2813'}]
}

warehouse.Install = function (cb) {
    warehouse.LoadHotCommodities((err) =>{
        if(err){
            cb(err);
        }
        else{
            warehouse.LoadRedCommodities((err) =>{
                if(err){
                    cb(err);
                }
                else {
                    cb();
                }
            })
        }
    });
}

warehouse.PackCoupon = function (origin) {
    let coupon = {};

    coupon.coupon_url = origin.coupon_click_url;
    coupon.title = origin.title;
    coupon.price = origin.zk_final_price;
    coupon.img = origin.pict_url;
    coupon.coupon_num = origin.coupon_remain_count;
    coupon.coupon_max = origin.coupon_total_count;
    coupon.pla = origin.user_type;

    let site = 0;
    for(let i=origin.coupon_info.length-2; i>=0; i--){
        if(isNaN(origin.coupon_info[i])){
            site = i;
            break;
        }
    }
    let num = origin.coupon_info.substring(site + 1, origin.coupon_info.length-1);
    coupon.coupon_val = num;

    coupon.disprice = parseFloat(coupon.price) - parseFloat(num);
    coupon.disprice = coupon.disprice.toFixed(2);

    return coupon;
}


warehouse.FindCommoditiesByTitle_wh = function(keyword, page, page_size, cb){
    tb.FindCouponsByTile(keyword, page, page_size, (err, data) => {
        if(err){
            cb(err);
        }
        else{
            let res_data = [];
            let size = data.length;
            for(let i=0; i<size; i++){
                res_data.push(warehouse.PackCoupon(data[i]));
            }
            cb(null, res_data);
        }
    })
}

warehouse.FindCommoditiesByCategory_wh = function (category, page, page_size, cb) {
    if(category == 0 || category >= warehouse.categories.length){//0搜索全部
        if(page == 0){
            cb(null, warehouse.redcommodities);
            return;
        }
        tb.FindCouponsByFilter({'page_size' : page_size,
            'page_no' : page,
            'end_tk_rate' : '1000'}, (err, data) => {
            if(err){
                cb(err);
            }
            else{
                let res_data = [];
                let size = data.length;
                for(let i=0; i<size; i++){
                    res_data.push(warehouse.PackCoupon(data[i]));
                }
                cb(null, res_data);
            }
        });
        return;
    }
    tb.FindCouponsByCategory(warehouse.categories[category].category, page, page_size, (err, data) => {
        if(err){
            cb(err);
        }
        else{
            let res_data = [];
            let size = data.length;
            for(let i=0; i<size; i++){
                res_data.push(warehouse.PackCoupon(data[i]));
            }
            cb(null, res_data);
        }
    });
}

//加载12个热门商品 佣金比率20%以上的
warehouse.LoadHotCommodities = function (cb) {
    tb.FindCouponsByFilter({'page_size':'12',
        'page_no':'5',
        }, (err, data) => {
        if(err){
            cb(err);
        }
        else{
            let res_data = [];
            let size = data.length;
            for(let i=0; i<size; i++){
                res_data.push(warehouse.PackCoupon(data[i]));
            }
            warehouse.hotcommodities = res_data;
            cb();
        }
    });
}

//预加载 16个首页商品
warehouse.LoadRedCommodities = function (cb) {
    tb.FindCouponsByFilter({'page_size':'16',
        'page_no':'0',
        }, (err, data) => {
        if(err){
            cb(err);
        }
        else{
            let res_data = [];
            let size = data.length;
            for(let i=0; i<size; i++){
                res_data.push(warehouse.PackCoupon(data[i]));
            }
            warehouse.redcommodities = res_data;
            cb();
        }
    });
}

//定时任务每天11点更新热门商品
let schedule = require('node-schedule');
let rule = new schedule.RecurrenceRule();
rule.hour = 11;
schedule.scheduleJob(rule, ()=>{
    warehouse.LoadHotCommodities(()=>{});
    warehouse.LoadRedCommodities(()=>{});
});