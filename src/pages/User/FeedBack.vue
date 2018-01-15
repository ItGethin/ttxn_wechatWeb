<template>
	<div id="feed">
		<top-head :title="title" :isNav="isNav"></top-head>
		<div class="message">
			<textarea class="means" placeholder="请详细描述您的问题" maxlength="150" @input="descInput"
			v-model="desc"></textarea>
			<div class="upload">
					<div class="image"><img src="../../assets/images/userImg.png" alt="" /></div>
					<div class="update"><i class="iconfont">&#xe646;</i></div>
			</div>
			<div class="word">{{remnant}} / 150</div>
			<div class="kuang" v-show="box" @click="close()">{{list}}</div>
		</div>
		<div class="shaw"></div>
		<input class="feednumber"  name="phone" type="number" placeholder="" v-model="phone"/>
		<div class="feedsub" @click="Tijiao()">提交</div>
		
	</div>
</template>

<script>
import TopHead from 'components/Header'
export default {
  name: "feedback",
  data() {
    return {
	  remnant: 0,
	  title: '意见反馈',
	  list:'最少需要输入两个字！',
      isNav: true,
      desc: '',
      box:false,
      phone:13294514365
    };
  },
  components: {
	  TopHead
  },
  created(){
	
  },
  methods: {
    descInput() {
      var txtVal = this.desc.length; //desc 是设置v-model的值
      this.remnant = txtVal;
    },
	Tijiao(){
		var pattern = /^((13[0-9])|(14[5|7])(15([0-3]|[5-9]))|(18[05-9]))\d{8}$/;
		if(this.phone==''){
			alert("请留下你的手机号，方便我们联系您");
		}
		else if(!pattern.test(this.phone) && this.phone!=" "){
			alert("您输入的手机号格式不正确");
		}
	  	if(this.remnant>0 && this.remnant<2){
//	  	this.box=true
//	  	this.list="评论发表不能低于2个字"
			alert("评论发表不能低于2个字");
	  	}
	  	if(this.remnant==0){
//	  	this.box=true
//	  	this.list="请详细描述您的问题"	  		
		alert("请详细描述您的问题");
	  	}
	},
	close(){
		this.box=false
	},
  },
	
};
</script>

<style scoped>
#feed {
	padding-top: 1.173333rem;
	width: 100%;
	height: 100%;
	background:#eeeeee;
}
#feed .message {
  width: 100%;
  height: 6.64rem;
  overflow: hidden;
  position: relative;
}
#feed .message .means {
  width: 100%;
  height: 100%;
  padding-left: .413333rem;
  padding-right:.413333rem;
  padding-top: .493333rem;
  outline: none;
  border: none;
  resize: none;
  font-size: 12px;
}
#feed .message .upload {
  width: 100%;
  height: 1.333333rem;
  padding-left: .413333rem;
  position: absolute;
  left: 0;
  bottom: .666667rem;
}
#feed .message .upload .image {
  width: 1.333333rem;
  height: 1.333333rem;
  border: 0;
  margin-right: .266667rem;
  border-radius: .266667rem;
  background: black;
  float: left;
}
#feed .message .upload .image img {
  width: 100%;
  height: 100%;
  border-radius: .266667rem;
}
#feed .message .upload .update {
  float: left;
  width: 1.333333rem;
  height: 1.333333rem;
  border: 1px dashed #bfbfbf;
  border-radius: .266667rem;
}
#feed .message .upload .update i {
  display: block;
  text-align: center;
  line-height: 1.333333rem;
}
#feed .shaw {
  width: 100%;
  height: .266667rem;
  background: #eeeeee;
}
#feed .feednumber {
  width: 100%;
  height: 1.333333rem;
  background: white;
  padding-left: .413333rem;
  line-height: 1.333333rem;
  font-size: 16px;
  color: #313131;
  font-weight: 600;
  border: 0;
  
}
#feed .feednumber:focus{
	outline:none;	
}
#feed .feedsub {
  width: 90.7%;
  height: 1.066667rem;
  margin: 1.013333rem auto 0;
  text-align: center;
  border-radius: .133333rem;
  background-color: #ff6a11;
  box-shadow: 0px 10px 38px 0 rgba(246, 53, 0, 0.4);
  line-height: 1.066667rem;
  color: white;
  font-size: 16px;
  letter-spacing: .133333rem;
}
#feed .message .word{
	position: absolute;
	bottom:2rem;
	right: .5rem;
	font-size: 14px;
	color: #a5a5a5;
}

#feed .message .kuang{
	width:60%;
	height:2rem;
	background: white;
	position: absolute;
	top:1rem;
	left: 50%;
	transform: translateX(-50%);
	border: .01rem solid orangered;
	text-align: center;
	line-height: 2rem;
	font-size:.2rem;
}
</style>