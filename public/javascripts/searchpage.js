/**
 * Created by ZhangQiang on 2017-6-29.
 */
 var page = 0;
 var keyword = '';
 var lockMore = false;

function searchCommodity() {
    var val = $('#search_page_input').val();
    if(val == null || val == ''){
        showDialog('错误提示', '请输入搜索宝贝关键字');
        return;
    }
    if(val == keyword)
        return;
    showLoadModal();
    lockMore = false;
    page = 0;
    searchCommodity_0(val, page);
}

function getMoreCommodities() {
    if(!keyword)
        return;
    if(lockMore)
        showModalDialog('操作提示', '无法搜索到更多的宝贝');
    page++;
    searchCommodity_0(keyword, page);
}

function searchCommodity_0(kw, _page) {
    keyword = kw;
    $.post('/search', {keyword : kw, page : _page, page_size : 16}, function (res) {
        if(res.err){
            showDialog('错误提示', res.err);
        }
        else{
            if(res.data < 16){
                $('#category_more').addClass('hide');
                lockMore = true;
            }
            else
                $('#category_more').removeClass('hide');
            if(res.data.length == 0){
                showDialog('操作提示', '没有搜索到更多的宝贝，请尝试更换关键字搜索');
            }
            else{
                parseCategoryCommodities(res.data);
            }
        }
        hideLoadModal();
    })
}

function parseCategoryCommodities(data) {
    var template = $('#commodity_template').clone();
    var container = $('#commodities_container');
    if(page == 0){
        scrollToTop();
        container.empty();
    }
    var length = data.length;
    var row;
    for(var i=0; i<length; i++){
        if(i%4 == 0){
            row = $('<div class="row"></div>');
            container.append(row);
        }

        var item = template.clone();
        var id = 'commodity_' + (page * 16 + i);
        var item = template.clone();

        item.removeClass('hide');
        item.attr('id', id);
        item.find('#commodity_img_url').attr('href', data[i].coupon_url);
        item.find('#commodity_img').attr('src', data[i].img);
        item.find('#commodity_coupon_num').html(data[i].coupon_num + '/' + data[i].coupon_max);
        item.find('#commodity_pla').removeClass().addClass(data[i].pla == 0 ? 'icon-22 icon-tb' : 'icon-22');
        item.find('#commodity_title').html(data[i].title).attr('href', data[i].coupon_url).attr('title', data[i].title);
        item.find('#commodity_disprice').html(data[i].disprice);
        item.find('#commodity_price').html(data[i].price);
        item.find('#commodity_coupon_btn').html('领券' + data[i].coupon_val + '元').attr('href', data[i].coupon_url);
        item.find('#share_btn').attr('share-target', id);

        row.append(item);
    }
}

$(function () {
    $('#search_page_input').keydown(function (event) {
        if(event.keyCode == 13){
            searchCommodity();
        }
    })
    keyword = $('#search_page_input').val();

    if(keyword != '' && $('#commodities_container').children().length == 0){
        showDialog('操作提示', '没有搜索到更多的宝贝，请尝试更换关键字搜索');
    }

    //share
    var clipboard = new Clipboard('.share-coupon', {
        text : function (target) {
            var item_id = target.getAttribute('share-target');
            var item = $('#'+item_id);
            var title = item.find('#commodity_title');
            var share = title.text();
            share += '\r\n【在售价】';
            share += item.find('#commodity_price').text();
            share += '元\r\n【券后价】';
            share += item.find('#commodity_disprice').text();
            share += '元\r\n【领券地址】';
            share += title.attr('href');
            share += '\r\n更多好券尽在淘殿堂 http://www.tdt.fun'
            return share;
        }
    });

    clipboard.on('success', function(e) {
        showDialog('操作提示', '信息复制成功，快去分享给小伙伴吧');
    });



})