<template>
	<div>
		<div>{{title}}</div>
		<ul>
			<li v-for="n in newList">
				<router-link :to="'./content/'+n.ID">
					{{n.Title}}
				</router-link>
			</li>

		</ul>

		<div style="width: 100%;height: 50px;">
			<form>
				<input type="file" id="avatar" name="avatar">
				<button type="button" v-on:click="subfile()">保存</button>
			</form>
		</div>

		<div class="width100 pic f5f5f5-bg margin-b10" id="uploaderImg">
			<div class="e5e5e5-bg addpic" id="clickImg">
				<p class="icon iconfont fu-fontC text-c margin-b10 margin-t10">&#xe658</p>
				<p class="text-c fu-fontC fontsize13">点击添加图片</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pageInfo: {
					PageSize: 10,
					PageIndex: 1,
					SortName: "Id",
					SortOrder: "ASC"
				},
				newList: [],
				title: '我的新闻列表'
			}
		},
		created() {
			var vm = this;
			//vm.getNewsList();

			

		},
		methods: {
			getNewsList() {
				var vm = this;
				var optionUrl = "News/GetNewListByCategory?typeId=1"
				vm.$http.post(optionUrl, vm.pageInfo, function(res) {
					if(res.StatusCode == 200) {
						vm.newList = res.Data;
					}
				})
			},
			subfile() {
			var vm = this
//				var files = $('#avatar').prop('files');
//				var fm = new FormData();
//				fm.append('avatar', files[0]);
//				var url = "http://xy.reallycare.cn/FilesUpload/UpLoadProcess";
//				vm.xhrupload(fm, url);
//				return false; //阻止表单提交
vm.uploadInit();

			},
			xhrupload(fd, url) {
				var xhr = new XMLHttpRequest();
				xhr.open("post", url, true);
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4) {
						if(200 == xhr.status) {
							alert(xhr.responseText);
						} else alert('发生错误\nstatus:' + xhr.status + '\n返回内容:' + xhr.responseText);
					}
				}
				xhr.send(fd);
			},
			uploadInit() {
				var a="";
				var uploader = new plupload.Uploader({
					runtimes: 'html5,flash,silverlight,html4',
					browse_button: 'uploaderImg', // you can pass in id...
					//container: document.getElementById('uploader'), // ... or DOM Element itself
					url: '../../FilesUpload/UpLoadProcess',
					filters: {
						max_file_size: '3mb',
						mime_types: [{
							title: "Image files",
							extensions: "gif,png,bmp,jpeg,JPG,.JPG,GIF,PNG,BMP,.jpg,jpg,JPEG,255216"
						}]
					},
					resize: {
						crop: true,
						quality: 40,
						preserve_headers: false
					},
					init: {
						FilesAdded: function(up, files) {
							plupload.each(files, function(file) {
								uploader.start();
							});
						},
						UploadProgress: function(up, file) {
							//$("label." + file.id).html(file.percent + '%');
						},
						FileUploaded: function(up, file, response) {
							var imglist = JSON.parse(response.response).Data;
							var imghtml = '';
							var length = imglist.length >= 4 ? 3 : imglist.length;
							for(var i = 0; i < length; i++) {
								if(imgUrlList < 4) {
									imghtml += '<div style="z-index:100"><img src="' + imghost + imglist[i] + '" alt="" class="height100" /><div class="delate" onclick="Delate(this)"><span>×</span></div></div>';
									imgUrlList = imgUrlList + 1;
								}
							}
							if(imgUrlList >= 4) {
								
								$("#uploaderImg").unbind("click");
							}
							$("#clickImg").before(imghtml);
							uploader.stop();
						},
						Error: function(up, err) {
							//$("#message").val("上传图片格式错误:" + err.message + ",上传图片大小不能超过5M");
							layer.open({
								content: "上传图片格式错误:" + err.message + ",上传图片大小不能超过5M",
								skin: 'msg',
								time: 2 //2秒后自动关闭
							});
							//alert("上传图片格式错误:" + err.message + ",上传图片大小不能超过5M");
							return false;
							//alert('上传失败' + err.message + '，上传图片大小不能超过5M');
						}
					}
				});
				uploader.init();
				
				$("#uploaderImg").next().find("input[type=file]").attr("accept", "video/*").attr("capture", "camcorder");
			}
		}
	}
</script>

<style>

</style>