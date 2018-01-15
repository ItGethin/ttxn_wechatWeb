<template>
	<div id="listhead" @click="Load()">
	
		<img src="../assets/images/header.png" alt="" />

	</div>
</template>

<script>
export default {
  name:'listhead',
  data(){
    return {
    	alex:true,
    }
  },
	methods:{
		Load(){
				var ua = navigator.userAgent.toLowerCase();
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				var isWeixin = ua.indexOf('micromessenger') != -1;		//微信端	
				if(isAndroid){
					window.location.href="http://app.qq.com/?isappinstalled=1#id=detail&appid=1106548180"; // 应用宝页面  　	
				}
				if(isiOS){
				   window.location.href="http://mp.weixin.qq.com/mp/homepage?__biz=MzUyMjM0NDgzMQ==&hid=1&sn=f99ab03872134fadc93b55578c87d004&scene=18#wechat_redirect"; //分享页面
				}		
	},
	},
	}
</script>

<style>
	#listhead{
		width: 100%;
		height: 1.70rem;
		background-color: #e5e5e5;
	}
	#listhead img{
		display: block;
		height: 100%;
		width: 100%;
	}
</style>