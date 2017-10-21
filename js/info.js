/**
 * Created by sunaw on 2016/6/12.
 */
var URL='http://120.24.87.209/index.php?s=/appapi/user/userinfo';
$.ajax({
    type: 'post',
    async: false,
    url:URL,
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
            loginNameFn(data);//登录账户
            Attention(data);//收藏栏

            var history_num = data.history_num;// 0
            var pay_point = data.pay_point;// "0"
            var rank_name = data.rank_name;// null
            var unused_bonus = data.unused_bonus;// "6"

            var orderNum=data.order_num;
            //console.log(orderNum.finished);
            var awaitPay= orderNum.await_pay;// "1" 没付款
            var awaitShip= orderNum.await_ship;//"0"
            var finished= orderNum.finished;//"13"
            var shipped= orderNum.shipped;// "0"


            //订单管理
            OrderNum='<a href=""><i class="iconfont">&#xe61b;</i>待付款<span class="awaitPay">'+awaitPay+'</span></a>' +
                '<a href=""><i class="iconfont">&#xe602;</i>待发货<span class="awaitShip">'+awaitShip+'</span></a>' +
                '<a href=""><i class="iconfont">&#xe601;</i>待收货<span class="shipped">'+shipped+'</span></a>' +
                '<a href=""><i class="iconfont">&#xe609;</i>历史订单<span class="finished">'+finished+'</span></a>' +
                '<a href="http://www.sunaw.com/service/after-sale-service.html"><i class="iconfont">&#xe60a;</i>售后服务</a>';


//                添加到页面
            appEndHtml($('.managementList'),OrderNum);
            if (awaitPay>0)$('.managementList span.awaitPay').show();
            if (awaitShip>0)$('.managementList span.awaitShip').show();
            if (shipped>0)$('.managementList span.shipped').show();
            if (finished>0)$('.managementList span.finished').show();
            appEndHtml($('.attention'),attention);
            appEndHtml($('.infoNamePwd'),loginName);
        }else{
            mui.toast(data.status.error_desc);
        }
    },
    error: function(xhr, type, errorThrown) {
        //异常处理；
        alert(type);
    }
});
function loginNameFn(data) {
    var name = data.name;//"15626099942"
    var nick_name = data.nick_name;// "成益"
    loginName='<p class="name">登陆账号:'+name+'</p>'+
        '<p class="nick_name">用户名:'+nick_name+'</p>';
}
function Attention(data) {
    var service_num = data.service_num;// "3"
    var collection_num = data.collection_num;//"0"
    var follow_num = data.follow_num;//"1"

    attention='<a href=http://120.24.87.209/server/?url=/order/list>' +
        '<i>' + collection_num + '</i>关注商品</a><a>' +
        '<i>' + service_num + '</i>关注服务</a><a>' +
        '<i>' + follow_num + '</i>关注店铺</a><a>' +
        '<i class="iconfont">&#xe60f;</i>浏览记录</a>';
}

