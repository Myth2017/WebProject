<template>
  <div v-html="newInfo.Content"></div>
</template>
<script>
	export default {
		data() {
			return {
				newInfo: {
					 Title:"",
					 Content:""
				}
			}
		},
		created() {
			//页面初始化进入时执行
			var vm = this;
			//vm.getNewDetail();
		},
		mounted(){
			//，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated
		},
		activated(){
			//页面初始化进入时执行(组件keep-alive缓存后再次进入组件只执行该方法，避免dom重复渲染，仅数据变化时渲染)
			var vm = this;
			vm.getNewDetail();
		},
		deactivated(){
			//页面后退是执行该方法
		},
		methods: {
			getNewDetail() {
				var vm = this;
				var id= this.$route.params.id;
				var optionUrl = "News/GetNewDetail?id="+id;
				vm.$http.get(optionUrl, null, function(res) {
					if(res.StatusCode == 200) {
						vm.newInfo = res.Data[0];
					}
				})
			}
		}
	}
</script>

<style>

</style>