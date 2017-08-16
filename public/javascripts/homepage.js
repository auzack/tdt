var category = 0;
var commoditise_page = 0;
var lockMoreBtn = false;

function changeCategory(id) {
    if(category == id)
        return;
    lockMoreBtn = false;
    getCommodities(id, 0, function () {
        $('#category_tags').children('a').removeClass('active');
        $('#category_tag_' + id).addClass('active');
    });
}

function getMorecommodities() {
    if(lockMoreBtn){
        showDialog('操作提示', '抱歉库中已经没有更多的宝贝了');
        return;
    }
    var page = ++commoditise_page;
    getCommodities(category, page, function () {
        
    });
}

function getCommodities(_category, page, cb) {
    showLoadModal();
    $.post('/category', {category : _category, page : page, page_size : 16}, function (res) {
        hideLoadModal();
        if(res.err){
            showDialog('错误提示', res.err);
        }
        else{
            if(res.data.length == 0){
                lockMoreBtn = true;
                showDialog('操作提示', '抱歉库中已经没有更多的宝贝了')
                return;
            }
            if(res.data.length < 16){
                lockMoreBtn = true;
            }
            category = _category;
            commoditise_page = page;
            parseCategoryCommodities(res.data);
            cb();
        }
    })
}

function parseCategoryCommodities(data) {
    var template = $('#commodity_0').clone();
    var container = $('#commodities_container');
    if(commoditise_page == 0){
        container.empty();
    }
    var length = data.length;
    var row;
    for(var i=0; i<length; i++){
        if(i % 4 == 0){
            row = $('<div class="row"></div>');
            container.append(row);
        }

        var item = template.clone();
        var id = 'commodity_' + (commoditise_page * 16 + i);
        var item = template.clone();

        item.attr('id', id);
        item.find('#commodity_img_url').attr('href', data[i].coupon_url);
        item.find('#commodity_img').attr('src', data[i].img);
        item.find('#commodity_coupon_num').html(data[i].coupon_num + '/' + data[i].coupon_max);
        item.find('#commodity_pla').removeClass().addClass(data[i].pla == 0 ? 'icon-22 icon-tb' : 'icon-22');
        item.find('#commodity_title').html(data[i].title).attr('href', data[i].coupon_url).attr('title', data[i].title);;
        item.find('#commodity_disprice').html(data[i].disprice);
        item.find('#commodity_price').html(data[i].price);
        item.find('#commodity_coupon_btn').html('领券' + data[i].coupon_val + '元').attr('href', data[i].coupon_url);
        item.find('#share_btn').attr('share-target', id);

        row.append(item);
    }
}

function openSearchPage(kw) {
    if(!kw)
        kw = $('#search_input').val();
    if(kw == null || kw == ''){
        showDialog('错误提示', '请输入搜索宝贝关键字');
        return;
    }
    window.open('/search?keyword=' + kw + '&page=0&page_size=16');
}

$(function () {
    var clipboard = new Clipboard('.copyBtn');
    clipboard.on('success', function(e) {
        console.log(e);
    });


    $('#search_input').keydown(function (event) {
        if(event.keyCode == 13){
            openSearchPage();
        }
    })

    //share
    var clipboard = new Clipboard('.share-coupon', {
        text : function (target) {
            var item_id = target.getAttribute('share-target');
            var item = $('#'+item_id);
            var title = item.find('#commodity_title');
            var share = title.text();
            share += '\r\n【在售价】';
            share += item.find('#commodity_disprice').text();
            share += '元\r\n【券后价】';
            share += item.find('#commodity_price').text();
            share += '元\r\n【领券地址】';
            share += title.attr('href');
            share += '\r\n更多好券尽在淘殿堂 http://www.tdt.fun'
            return share;
        }
    });

    clipboard.on('success', function(e) {
        showDialog('操作提示', '信息复制成功，快去分享给小伙伴吧');
    });

    //hot share
    var hotclip = new Clipboard('.share-coupon-hot', {
        text : function (target) {
            var item_id = target.getAttribute('share-target');
            var item = $('#'+item_id);
            var title = item.find('#title');
            var share = title.text();
            share += '\r\n【在售价】';
            share += item.find('#hot_price').text();
            share += '元\r\n【券后价】';
            share += item.find('#hot_disprice').text();
            share += '元\r\n【领券地址】';
            share += title.attr('href');
            share += '\r\n更多好券尽在淘殿堂 http://www.tdt.fun'
            return share;
        }
    });

    hotclip.on('success', function(e) {
        showDialog('操作提示', '信息复制成功，快去分享给小伙伴吧');
    });

})
