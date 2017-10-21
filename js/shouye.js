/**
 * Created by sunaw on 2016/6/7.
 */
//ajax生产工厂
//首页-订单管理的钥匙


var jsonObj = {
    "store_id": '24620',
    "session": {
        "uid": 'UIC000000000000000001462',
        "sid": '2bf75bb18d014c21fec5ba12f0752ebc'
    }
};
var filter= new Object();
filter.json=JSON.stringify(jsonObj);
// 切换店铺
var dmjs='切换店铺.html';

//点击购买的链接
var buyGoods='http://120.24.87.209/index.php?s=/swche/goods/detail';
// 店铺切换的链接
var urlStoreList='http://120.24.87.209/index.php?s=/swche/store/storeList';
// 首页地址
var url= 'http://120.24.87.209/index.php?s=/swche';
$.ajax({
    type: 'post',
    async: false,
    url:url,
    data: filter,
    dataType: 'jsonp',
    jsonp: "jsoncallback",
    success: function(data) {
        console.log(data);
        //服务器返回响应，根据响应结果，分析是否登录成功；
        var status = data.status;
        html=[];
        if (status.succeed == 1) {
            data = data.data;
            //console.log(data);
            createGoods(data);//商品生产
            data=data.store_info;
            apptxt($('h1'),data.name)
            $('.topImg').attr('src',data.logo);
            $('.imgA').attr('href',data.logo_url);
            $('.cqShop').attr('href',dmjs);
            appEndHtml($('.cqGoods_screen'),html.join(''));
        }else{
            mui.toast(data.status.error_desc);
        }
    },
    error: function(xhr, type, errorThrown) {
        //异常处理；
        alert(type);
    }
});
//商品创建封装
function createGoods(data) {
//         商品数据console.log(data.goods_list);console.log(data.goods_list[1]);
    dataList = data.goods_list;
//                console.log(dataList[1]);document.write( dataList[i].goods_id)
    for (var i = 0; i < dataList.length; i++) {
        var obj = dataList[i];
        var goods_id = obj.goods_id; //id
        var sale_unit = obj.sale_unit;//单位
        var is_real = obj.is_real;//0
        var goods_name = obj.goods_name; //名字
        var web_title = obj.web_title;
        var goods_thumb = obj.goods_thumb; //图片
        var shop_price = obj.shop_price; //价格
        html.push('<li>' +
            '<a href="'+buyGoods+'&'+goods_id+is_real+'">' +
            ' <dl data-action='+goods_id+' class="cqGoods clearfix">' +
            ' <dt class="cqGoodsImg floatL">' + '<img class="logo" src="' + goods_thumb + '">' + '</dt>' +
            ' <dd class="cqGoodsTitle floatR">' + '<p>' + goods_name + '</p>' + '<p>' + web_title + '</p>' +
            ' <span class="cqGoodsMoney">' + shop_price + '</span>' +
            ' <a id="cqBuy" href="fuwuka.html?goods_id='+goods_id+'" class="cqBuy floatR clearfix">点击购买</a>' +
            '</dd>' +
            '</dl>' +
            '</a>' +
            '</li>');
    }
}


