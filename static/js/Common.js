/**封装公共js**/
(function(window, $) {
    var MythC = window.MythC = function() {};
    MythC.fn = MythC.prototype;
    var common = MythC.common = MythC.fn.common = {};

    //获取页面url中的传递参数
    common.GetQueryString = function(queryStringName) {
        var result = location.search.match(new RegExp("[\?\&]" + queryStringName + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    };
    //获取页面的绝对路径
    common.RootPath = (function () {
        var strFullPath = window.document.location.href;
        var strPath = window.document.location.pathname;
        var pos = strFullPath.indexOf(strPath);
        var prePath = strFullPath.substring(0, pos) + "/";
        return prePath;
    })();

   

})(window, jQuery);

//JS格式化字符串
// ReSharper disable once NativeTypePrototypeExtending
String.prototype.format = function () {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};