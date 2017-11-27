
var xymp_img = {
    UplodImgInit: function (dataC) {
        //$.extend  后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。
        var data = $.extend({}, {
            browse_button: "imageId",// 需要添加上次点击事件的id
            url: "../../FilesUpload/UpLoadProcess",//图片上传服务器地址
            max_file_size: "300k",//图片上传大小
            mime_types: "gif,png,bmp,jpeg,JPG,.JPG,GIF,PNG,BMP,.jpg,jpg,JPEG,255216",  //上传类型过滤器  Image图片类型  
            resize_width: 0,//压缩图片宽度 可为空
            resize_height: 0,//压缩图片高度 可为空
            resize_crop: false,//是否裁剪图片 可为空
            resize_quality: 100,//压缩图片质量  只对jpg有效 可为空
            preserve_headers: true,//是否保留原始压缩图片 可为空
            img_id: "imgid",//需要赋值的img id
            error_msg: "上传图片大小或格式错误",//上传错误提示语
            imghost: "" //后台服务器地址
        }, dataC);

        var uploader = data.browse_button;
        uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: data.browse_button,
            url: data.url,
            filters: {
                max_file_size: data.max_file_size,
                mime_types: [
                    { title: "Image", extensions: data.mime_types }
                ]
            },
            resize: {
                width: data.resize_width,
                height: data.resize_height,
                crop: data.resize_crop,
                quality: data.resize_quality,
                preserve_headers: data.preserve_headers
            },
            init: {
                FilesAdded: function (up, files) {
                    plupload.each(files, function (file) {
                        uploader.start();
                    });
                },
                UploadProgress: function (up, file) {
                },
                FileUploaded: function (up, file, response) {
                    var imglist = JSON.parse(response.response).Data[0];
                    imglist = data.imghost + imglist;
                    $("#" + data.img_id).attr("src", imglist);
                    uploader.stop();
                },
                Error: function (up, err) {
                    //$("#message").val("上传图片格式错误:" + err.message + ",上传图片大小不能超过5M");
                    layer.open({
                        content: data.error_msg,
                        skin: 'msg',
                        time: 2
                    });
                    return false;
                }
            }
        });
        uploader.init();
    }
}
