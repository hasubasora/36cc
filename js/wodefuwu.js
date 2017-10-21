/**
 * Created by sunaw on 2016/6/7.
 */
var jsonObj = {
    "store_id": '',
    "session": {
        "uid": 'UIC000000000000000001462',
        "sid": '2bf75bb18d014c21fec5ba12f0752ebc'
    },
    "page_size":"10",
    "page":"1"
};
var filter= new Object();
filter.json=JSON.stringify(jsonObj);
var url='http://120.24.87.209/index.php?s=/swche/serviceCard/serviceCardList';
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
        html=[];
        if (status.succeed == 1) {
            data = data.data;
            console.log(data);
            // 首页头数据//console.log(data.store_info);
            console.log(data[0].card_name);
//        添加到页面Object
            for (var i=0;i<data.length;i++) {
                var _data=data[i]; //全局变量会被覆盖名字不能data
                    var admin_id = _data.admin_id,
                        card_id = _data.card_id,
                        card_name = _data.card_name,
                        card_no = _data.card_no,//"NO.351450350415"
                        consume_desc = _data.consume_desc,//"洗车1次"
                        end_time = _data.end_time,// "1452942415"
                        left_times = _data.left_times,// "10"
                        order_sn = _data.order_sn,// "15121751204134"
                        r_card_id,// "0"
                        service_unit_price,//"0.00"
                        start_time = _data.start_time,//"1450350415"
                        suitable_shop = _data.suitable_shop,//"喜得来高端汽车美容养护中心"
                        total_times = _data.total_times,//"10"
                        type = _data.type,//"3"
                        user_id = _data.user_id,//"1459"
                        user_name = _data.user_name;// "商沃成益"
            html.push('<ol class="card_desc">' +
                '<a href="'+admin_id+'"> '+
                '<li>' +
                '<p>' + '<span class="card_no">NO.' + order_sn + '</span> 店铺:' + suitable_shop + '</p>' +
                '<p>洗车' + total_times + '次</p>' +
                '<p>' + '<span class="start_time">期限' + getLocalTime(start_time) + '至' + getLocalTime(end_time) + '</span>' + '</p>' +
                '</li>' +
                '<li class="backG clearfix">' +
                '<strong class="floatL">用户：' + user_name + '</strong>' + '<span class="floatR">总次数' + total_times + '次，剩余' + left_times + '次</span>' +
                '</li>' + '</a>' + '</ol>');
                }

            appEndHtml($('section.wfk'),html.join(''));

        }else{
            mui.toast(data.status.error_desc);
        }
    },
    error: function(xhr, type, errorThrown) {
        //异常处理；
        alert(type);
    }
});