<template>
	
	<div id="lesson" v-cloak>
			<list-head></list-head>
			<div class="lessonh" id="searchBar">
				<ul>
					<li>
						<router-link to="/lesson/all">全部</router-link>
					</li>
					<li>
						<router-link to="/lesson/open">公开课</router-link>
					</li>
					<li>
						<router-link to="/lesson/boutique">精选课</router-link>
					</li>
				</ul>
				
				<div class="mine">
					<router-link to="/user/myself"><i class="iconfont">&#xe615;</i><span>我的</span>
				</router-link>	
				</div>	
				<div class="line"></div>
			</div>
		<keep-alive>	
			<router-view></router-view>
		</keep-alive>	
	</div>

</template>

<script>
	import ListHead from "components/ListHead";
	import {share} from "config/share";
	export default {
		name: "lessonh",
		data() {
			return {
				
			}
		},
		components:{
			'list-head': ListHead,
		},
		mounted() {
			share();
		},
		methods: {
			
		},
	}
</script>

<style scoped>
	html,body{
		width:100%;
		height:100%;
	}
	* {
		margin: 0;
		padding: 0;
	}
	html{
		font-size: 312.5%;
	}
	ul,
	ol,
	li {
		list-style: none;
	}

	.lessonh {
		width:100%;
		height: 1.173333rem;
		overflow: hidden;
		/*box-shadow: 0px 4px 7px 0 rgba(0, 0, 0, 0.05);
		margin-bottom: .01rem;*/
		z-index:1;
		position:relative;

	}
	.lessonh ul{
		width: 100%;
		height: 1.173333rem;
		position: relative;
		width: 80%;
		display: flex;
		float: left;
		
	}
	.lessonh ul li {
		float: left;
		height: .8rem;
		margin-top: .186667rem;
		z-index: 1;
		flex: 1;
		text-align: center;
	}
	
	.lessonh ul li a{
		display: block;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		font-size: .426rem;
		font-style: normal;
		color: #777777;
		margin-left: 25%;
		
	}
	.lessonh ul li:nth-of-type(1) a{
		margin-left: 50%;
	}
	.lessonh ul li:nth-of-type(2) a{
		margin-left: 38%;
	}			
	.lessonh .router-link-active {
		color:#ff500b;
		border-bottom: .04rem solid #ff6a11;
	}
	
	.lessonh .mine{
		width: 15%;
		height: 1.026667rem;
		float: right;
		overflow: hidden;
		text-align: center;
		margin-top: .146667rem;
		padding-left: .266667rem;
	}
	.lessonh .mine a{
		display: block;
		width: 100%;
		height: 1.026667rem;
		overflow: hidden;
		float: left;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.lessonh .mine a i{
		width: .48rem;
		height: .573333rem;	
		color: #777777;
		text-align: center;
		font-size: .48rem;
		line-height: .573333rem;
	}
	.lessonh .mine a span{
		display: inline-block;
		width: 100%;
		height: .453333rem;
		line-height: .453333rem;
		font-size: .266rem;
	 	color: #777777;
	 	text-align: center;
	}
	.lessonh .line{
		  width: .026667rem;
		  height: .746667rem;
		  background:#e5e5e5;
		  position: absolute;	
		  top: .226667rem;
		  left:86%;  
		  z-index:1;
	}

</style>