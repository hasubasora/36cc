/**
 * Created by sunaw on 2016/6/13.
 */
var objName=$('input.lkBuy');
btnion(objName,cs1,cs2);

var arr=location.search;
var arr2=arr.lastIndexOf('=');
var arr3=arr.substring(arr2+1);
console.log(arr2);
console.log(arr3);
// var jsonObj={"spec":[],"session":{"uid":"UIC000000000000000001462","sid":"2bf75bb18d014c21fec5ba12f0752ebc"},"number":1,"goods_id":31045}
var jsonObj = {
    "spec":[],
    "session": {
        "uid": 'UIC000000000000000001462',
        "sid": '2bf75bb18d014c21fec5ba12f0752ebc'
    },
    "number":1,
    "store_id": '',
    "goods_id":arr3
};
var filter= new Object();
filter.json=JSON.stringify(jsonObj);
var url='http://120.24.87.209/index.php?s=/appapi/flow/buynow';
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
        indentOk=[];
        total=[];
        patPay=[];
        carInfo=[];

        //如果有car_info
        if (status.succeed == 1) {
            data = data.data;
            goodsListPay(data);//商品
            dataPay(data);//支付
            hasCar(data);//车牌
            console.log(data.car_info);

            prepEndHtml($('.buyGoods'),indentOk.join(''));
            appEndHtml($('#patPay'),patPay);
            prepEndHtml($('.navBuy'),total);
            appEndHtml($('.buyGoods'),carInfo);

        }else{
            mui.toast(data.status.error_desc);
        }
    },
    error: function(xhr, type, errorThrown) {
        //异常处理；
        alert(type);
    }
});

function goodsListPay(data) {
    _data=data.admin_list;
    for (var i=0; i<_data.length;i++) {
        console.log(_data[i].goods_list);
        var goodsData = _data[i].goods_list;
        for (var j = 0; j < goodsData.length; j++) {
            var goodsName = goodsData[j].goods_name;
            var goodsNumber = goodsData[j].goods_number;
            var goodsPrice = goodsData[j].goods_price;
            var Subtotal = goodsData[j].subtotal;//合计
            var goodsImg = goodsData[j].goods_thumb;

            indentOk.push(
                '<li class="cqGoodsList dingDan clearfix backG cur">' +
                '<div class="floatL paddingR" style="max-width: 30%">' +
                '<img src="' + goodsImg + '" width="60" height="60">' +
                '</div>' +
                '<div class="floatL" style="max-width: 70%">' +
                '<p>' + goodsName + '</p>' +
                '<p>购买数量：' + goodsNumber + '</p><p>' + goodsPrice + '</p>' +
                '</div>' +
                '</li>'
            );
            total=' <span class="floatL colorWrith" style="padding:0;">总价：￥'+Subtotal+'</span>'

        }
    }
}
function dataPay(data) {
    _dataPay=data.payment_list;
    for (var i=0;i<_dataPay.length;i++){
        var payName=_dataPay[i].pay_name;//"在线支付",
        patPay='<span>支付方式&nbsp;<strong class="bi">必填</strong></span>' +
            '<span class="floatR paddingR">'+payName+'</span>'
    }
}
function hasCar(data) {
    if (data.car_info!=""){
        var CarData=data.car_info;
        var CarNo=CarData.car_no;
        carInfo='<li class="picShowI backG cur" id="carInfo"><span>绑定车牌号</span>' +
            '<span class="floatR paddingR">车牌号:'+CarNo+'</span></li>'

    }
}