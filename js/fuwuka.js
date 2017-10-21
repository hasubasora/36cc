window.onload=function () {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }

    })
};

var arr=location.search;
var arr2=arr.lastIndexOf('=');
var arr3=arr.substring(arr2+1);
// console.log(arr2)
// console.log(arr3)
var jsonObj = {
    "store_id": '',
    "goods_id":arr3,
    "session": {
        "uid": 'UIC000000000000000001462',
        "sid": '2bf75bb18d014c21fec5ba12f0752ebc'
    }
};
var filter= new Object();
filter.json=JSON.stringify(jsonObj);
var url='http://120.24.87.209/index.php?s=/swche/goods/detail';
$.ajax({
    type: 'get',
    async: false,
    url:url,
    data: filter,
    dataType: 'jsonp',
    jsonp: "jsoncallback",
    success: function(data) {
        console.log(data);
        //服务器返回响应，根据响应结果，分析是否登录成功；
        var status = data.status;
        goodsImg=[];
        if (status.succeed == 1) {
            data = data.data;
            goodsGallery(data);//商品图片
            MarketPrice(data);//商品价格
            ServeDetails(data);//服务
            console.log(data);
            var goodsId=data.goods_id;//31039"
            var isCollected=data.isCollected;//是不是收藏 true
            var buyUrl='dingdanjiesuan.html?goods_id='+goodsId+'';
            $('.lkBuy').attr('href',buyUrl)
            $(function () {
                var lkBuy=$('.lkBuy');
                btnion(lkBuy,cs1,cs2);
                // 点击改变收藏的颜色
                $('.navBuy .collect').bind('touchstart',function () {
                    if (isCollected==true){
                        $(this).css('color','#00E5EE');
                    }
                });
            });

//                添加到页面
            appEndHtml($('ul.history'),ShopMe);
            appEndHtml($('.swiper-wrapper'),goodsImg.join(''));
            appEndHtml($('ul.server'),serveDetails);
        }else{
            mui.toast(data.status.error_desc);
        }
    },
    error: function(xhr, type, errorThrown) {
        //异常处理；
        alert(type);
    }
});
function goodsGallery(data) {
    var _data=data.goods_gallery;
    for (var i=0;i<_data.length;i++){
        //console.log(_data[i].url);
        goodsImg.push('<div class="swiper-slide">'+
            '<img src="'+_data[i].url+'"/>'+
            '</div>')
    }
}
function MarketPrice(data) {
    var catName=data.cat_name;//"汽车美容"
    var goodsName=data.goods_name;//"洗车10次卡，价值300元的哦！
    var Period= data.period;//"1月"
    var ShopPrice= data.shop_price;// "￥1.00"
    ShopMe= '<li>'+'<a href=""><strong >'+goodsName+'</strong></a>'+'</li>'+
        '<li><span class="floatR">类型：'+catName+'</span>'+ '<span>售价<strong style="color: red">'+ShopPrice+'</strong></span></li>'+
        '<hr/>'+
        '<li>'+'<p >期限：'+Period+'（购买当日起效）</p>'+'</li>';
}
function ServeDetails(data) {
    var isBindCar=data.is_bind_car;
    var items=data.items;//"洗车 10次"
    if (isBindCar==0)isBindCar='否';
    if (isBindCar==1)isBindCar='是';
    serveDetails=
        '<li><i class="iconfont">&#xe620;</i>服务内容详细:</li>'+
        '<li>'+items+'</li>'+
        '<li class="borderTop" >限制一个车牌号<span class="floatR colorQianlan" >'+isBindCar+'</span></li>'
    ;
}