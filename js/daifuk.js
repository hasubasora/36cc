/**
 * Created by sunaw on 2016/6/7.
 */
var url='http://120.24.87.209/server/?url=/order/list';
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
                    card_name = _data.card_name;

                html.push();
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