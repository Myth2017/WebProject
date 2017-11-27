//封装模块
(function (window, $) {
    var Myth = window.Myth = function () { };
    Myth.fn = Myth.prototype;
    var common = Myth.common = Myth.fn.common = {}
    //微信分享:http://res.wx.qq.com/open/js/jweixin-1.0.0.js
    var wxShare = common.wxShare = {
        WxShare: function (appId, timestamp, nonceStr, signature, title, link, desc, imgUrl) {
            //通过config接口注入权限验证配置
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名，见附录1
                jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            //通过ready接口处理成功验证
            wx.ready(function () {
                //判断当前客户端版本是否支持指定JS接口
                //wx.checkJsApi({
                //    jsApiList: ['onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                //    success: function (res) {
                //        // 以键值对的形式返回，可用的api值true，不可用为false
                //        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                //        if (res) {
                //            alert(JSON.stringify(res));
                //        }
                //    }
                //});
                var data = {
                    title: title, // 分享标题
                    link: link, // 分享链接
                    desc: desc, // 分享描述
                    imgUrl: imgUrl, // 分享图标
                    success: function (res) {
                        // 用户确认分享后执行的回调函数
                        shareSuccess(res);
                    },
                    cancel: function (res) {
                        // 用户取消分享后执行的回调函数
                    },
                    fail: function (res) {
                        //shareFail();
                    }
                };
                var data2 = {
                    title: desc, // 分享标题
                    link: link, // 分享链接
                    desc: desc, // 分享描述
                    imgUrl: imgUrl, // 分享图标
                    success: function (res) {
                        // 用户确认分享后执行的回调函数
                        shareSuccess(res);
                    },
                    cancel: function (res) {
                        // 用户取消分享后执行的回调函数
                    },
                    fail: function (res) {
                        //shareFail();
                    }
                };


                //分享到朋友圈
                wx.onMenuShareTimeline(data2);

                //分享给朋友
                wx.onMenuShareAppMessage(data);

                //分享到QQ
                wx.onMenuShareQQ(data);

                //分享到腾讯微博
                wx.onMenuShareWeibo(data);

                //分享到QQ空间
                wx.onMenuShareQZone(data);
            });

            //通过error接口处理失败验证
            wx.error(function (res) {
                //alert(JSON.stringify(res));
            });

            function shareSuccess(res) {
                //TODO:分享成功后记录用户分享信息
                ShareLog();
            }

            function shareFail(res) {
                alert("分享失败：" + JSON.stringify(res));
            }
        }
    };
    var shareLog = common.ShareLog = {
        WxChatShareLog: function (data) {
            var shareData = {
                Type: 0,
                ShareLink: data.ShareLink,
                Theme: data.Theme || 0,
                ThemeId: data.ThemeId || 0
            };
            var option = {
                url: MythC.common.RootPath + 'CarsSource/InsertShareRecord' + window.location.search,
                data: shareData,
                dataType: 'json',
                type: 'post',
                success: function (rt) {
                    if (rt.IsSuccess) {
                        var rt = rt;
                    }
                },
                error: function (er) {

                }
            }
            $.ajax(option);
        }
    }
    var shareConfig = common.shareConfig = {
        //默认公共分享配置
        Global: {
            Link: "{0}",//分享链接
            ImgUrl: "http://static.qichedaquan.com/Content/Images/wxchat/wxshare_xymp.png",//分享图片地址
            Title: "留下您的信任,带走您的满意!",//标题
            Desc: "留下您的信任,带走您的满意!",//简介
        }
    }
    //获取浏览器内核
    var browser = common.browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {         //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部
                IsWxChat: u.toLowerCase().match(/MicroMessenger/i) == "micromessenger"?true:false //是否为微信内置浏览器
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    //是否允许匿名访问（非微信浏览器则为匿名访问）
    var isAnonymous = common.IsAnonymous = function (bType) {
        //1为非微信内置浏览器
        if (bType != 1) {
            if (!common.browser.versions.IsWxChat) {
                window.location.href = window.document.location.href.replace("bType=", "") + "&bType=1";
            }
        }
    }
})(window, jQuery);