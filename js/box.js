// 按钮的过度js/**
var cs1={background:'#77C5FF',transition:'all 0.5s'};
var cs2={background:'#0089EE',transition:'all 0.5s'};

function btnion(obj,cs1,cs2) {
    obj.bind('touchstart',function () {
        $(this).css(cs1)
    });
    obj.bind('touchend',function () {
        $(this).css(cs2)
    });
}

// var jsonObj={"pagination":{"count":10,"page":1},"type":"await_pay","session":{"uid":"UIC000000000000000001462","sid":"2bf75bb18d014c21fec5ba12f0752ebc"}}
//个人中心 只要uidsid
// var jsonObj={"store_id":"24620","session":{"uid":"UIC000000000000000001462","sid":"91546ebc4ed846006dea109eeb137c1a"}}
//提交订单钥匙-订单结算-切换店铺
// var jsonObj={"spec":[],"session":{"uid":"UIC000000000000000001462","sid":"91546ebc4ed846006dea109eeb137c1a"},"number":1,"goods_id":31045}
//首页-订单管理的钥匙
// var jsonObj={"store_id":"24620","session":{"uid":"UIC000000000000000001462","sid":"2bf75bb18d014c21fec5ba12f0752ebc"},"goods_id":"31048"}

// var filter= new Object();
// filter.json=JSON.stringify(jsonObj);


//添加到页面封装
function appEndHtml(obj,list) {
    obj.append(list);
}
function prepEndHtml(obj,list) {
    obj.prepend(list);
}
function apptxt(obj,val) {
    obj.text(val);
}
// 日期转化
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月|日/,"-");
}
