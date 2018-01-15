<template>
	<div  class="page-wrapper">
	<div id="boutique" class="page" v-cloak>
		<div class="wrapper" >
			<ul>
			<!--页面数据-->
			<li v-for="(item,index) in listData" :key=index  @click="enter(item,index)">
				<!--页面列表上部图片-->
				<div class="btqtop">
					<img v-lazy="item.s_img" />		
					<span class="hot" v-if="item.isHot>0"><em class="zhot">最热</em></span>
					<span class="new" v-if="item.isNew>0"><em class="znew">最新</em></span>
					<div class="save" v-if="item.current_price>0">精选</div>
				</div>
				<!--列表下部信息-->
				<div class="btqbtn" >
					<div class="btqfirst">{{item.l_title}}</div>
					<div class="btqsecond" v-if="item.is_end<=0"><span class="update" v-if="item.is_end<=0">更新至第{{item.subjects}}节 </span>
						
						<span class="nutrition" v-if="item.is_end<=0"><em class="shu"></em>{{item.audioTitle}}</span>
						<em class="time" v-if="item.is_update!==0">{{item.upTime | Data}}</em></div>
						
					<div class="btqthird"><span class="headpic"><img :src="item.img"/></span>
						
						<span class="author">{{item.name}}</span><i class="iconfont icon--X1" v-if="item.is_end>0"></i>
						<span class="number" v-if="item.is_end>0">共{{item.subjects}}节</span><i class="iconfont icon--X"></i>
						<span class="people">{{item.times}}</span>人已学<span class="price" v-show="item.isBuy!=1">{{item.current_price>0?"￥"+item.current_price:" "}}</span>
						<span class="buy" v-if="item.isBuy==1">已购买</span></div>
				</div>
				<div class="btqgray"></div>
			</li>
		</ul>
		  	<div class="bottom" :class="imgDownClass" v-if="isLoadMore" v-show="pic">
				<img :src="loadmoreImg" />
				<span>{{loadmoreInfo}}...</span>
			</div>
			<!--底部返回按钮-->
			<div class='btqend' v-show="btqlocal"><span class="line"></span>已经到底了哦~<span class="line"></span></div>
		</div>
	    <div class="loading" v-show="!listData.length">
	        <loading></loading>
	    </div>		
	</div>
		<div class="btqyuan" v-show="back"  @click="Back"><i class="iconfont">&#xe66f;</i></div>

	</div>
</template>

<script>
import Time from "assets/js/time";

let homeScroll;
import Loading from "components/Loading";
import ListHead from "components/ListHead";

export default {
  name: "boutique",
  data() {
    return {
      imgUrl: "../static/images/lazyload.png",
      num: 1, //页面
      listData: [], //存放页面数据
      listArr: [],
      scroll: "", //滚动条
      btqyuan: true, //底部返回按钮
      timer: false, //定时器
      btqlocal: false, //没有更多内容了
      btqturn: true,
      btqloading: false,
      scroller: null,
      btqloadingText: "加载中...",
      isLoadMore: false,
      showSearch: false,
      refreshInfo: "下拉可以刷新",
      loadmoreInfo: "上拉加载更多",
      refreshImg: "static/images/arrow.png",
      loadmoreImg: "static/images/arrow.png",
      imgClass: "",
      imgDownClass: "",
      pic: true,
      top: true,
      times: true,
      back: false,
      ind: ""
    };
  },
  components: {
    Loading
  },
  filters: {
    Data(input) {
      return Time.Data(input);
    }
  },
  methods: {
    updateScroll() {
      setTimeout(() => {
        //计算滚动视图当前最大的滚动范围
        var maxScrollY =
          homeScroll.wrapper.offsetHeight - homeScroll.scroller.offsetHeight;
        //所在位置大于了最大滚动范围，回到最底部
        if (maxScrollY > homeScroll.y) {
          homeScroll.scrollTo(0, maxScrollY);
        }
      });
    },
    //请求全部页面的数据
    requireData() {
      var that = this;
      var url =
        "subject/audioSubjectList?state=2&pageSize=8&pageNum=" + this.num;
      this.$get(url, {
        token: window.localStorage.getItem("token"),
        newsCode: "000100010001",
        hotCode: "000100010002"
      }).then(res => {
        that.listData = res.data.list.list;
      });
    },
    enter: function(item, index) {
      this.$router.push({ path: "/course/" + item.id });
    },
    Back() {
      homeScroll.scrollTo(0, 0, 1000);
    }
  },
  created() {
    this.requireData();
  },
  mounted() {

    homeScroll = new IScroll("#boutique", {
      click: true,
//    tap: true,
      probeType: 3,
      bounce: false,
      deceleration: 0.005
    });
    //滚动到头部在最顶部
    homeScroll.scrollTo(0, 0);
    homeScroll.on("scrollStart", () => {
      if (homeScroll.maxScrollY < 0) {
        this.isLoadMore = true;
      }
      homeScroll.refresh();
    });
    homeScroll.on("scroll", () => {
      if (homeScroll.y <= -1850) {
        this.back = true;
      } else {
        this.back = false;
      }

      //判断加载更多的条件
      if (homeScroll.y <= homeScroll.maxScrollY) {
        //      this.back = true;
        this.imgDownClass = "down";
      } else if (homeScroll.y > homeScroll.maxScrollY) {
        this.imgDownClass = "";
      }
    });
    homeScroll.on("scrollEnd", () => {
      //用户上拉，但是没有达到加载更多的条件
      let realY = homeScroll.maxScrollY + 40;
      if (homeScroll.y > homeScroll.maxScrollY && homeScroll.y < realY) {
        homeScroll.scrollTo(0, realY, 200);
        this.btqlocal = false;
        this.pic = false;
        this.back = true;
      }
      //满足加载更多的条件
      if (homeScroll.y <= homeScroll.maxScrollY) {
        this.loadmoreImg = "static/images/ajax-loader.gif";
        this.loadmoreInfo = "正在加载";
        this.num += 1;
        this.timer = setTimeout(() => {
          var url =
            "subject/audioSubjectList?state=2&pageSize=8&pageNum=" + this.num;
          this.$get(url, {
            token: window.localStorage.getItem("token"),
            newsCode: "000100010001",
            hotCode: "000100010002"
          }).then(res => {
            this.listData = this.listData.concat(res.data.list.list);
            this.loadmoreImg = "static/images/arrow.png";
            this.loadmoreInfo = "上拉加载更多";
            var number = Math.ceil((res.data.list.list.length + 1) / 8);
            if (this.num > number + 1) {
              this.isLoadMore = false;
              this.pic = false;
              this.btqlocal = true;
              clearTimeout(this.timer);
            }
          });
        }, 100);
      }
    });
  }
};
</script>

<style scoped>
ul,
ol,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
em {
  font-style: normal;
}
* {
  margin: 0;
  padding: 0;
}
body,
html {
  width: 100%;
  height: 100%;
}
.page-wrapper .page {
  width: 100%;
  position: absolute;
  top: 2.873333rem;
  left: 0;
  bottom: 0;
  z-index: 10;
  overflow: hidden;
}
.changes {
  width: 100%;
  position: absolute;
  top: 0.88rem;
  left: 0;
  bottom: 0;
  z-index: 10;
  overflow: hidden;
}
#boutique {
  width: 100%;
  height: auto;
  overflow: hidden;
  background: white;
}

#boutique ul li {
  background: white;
  z-index: 1;
}

#boutique ul li .btqtop {
  width: 100%;
  height: 4.4rem;
  position: relative;
  overflow: hidden;
}

#boutique ul li .btqtop img {
  width: 100%;
  height: 100%;
}
#boutique ul li .btqtop .znew {
  width: 2rem;
  height: 0.45rem;
  background: #ff6611;
  position: absolute;
  left: -6%;
  top: 4%;
  font-size: 0.3rem;
  text-align: center;
  transform: rotate(315deg);
  line-height: 0.45rem;
  color: white;
}
#boutique ul li .btqtop .zhot {
  width: 2rem;
  height: 0.45rem;
  background: red;
  position: absolute;
  left: -6%;
  top: 4%;
  font-size: 0.3rem;
  text-align: center;
  transform: rotate(315deg);
  line-height: 0.45rem;
  color: white;
}
#boutique ul li .btqtop .save {
  width: 0.953rem;
  height: 0.46rem;
  position: absolute;
  right: 0.266rem;
  top: 0.28rem;
  background: rgba(247, 118, 36, 1);
  border-radius: 0.213rem;
  color: white;
  font-size: 0.305rem;
  font-weight: normal;
  text-align: center;
  line-height: 0.46rem;
}

#boutique ul li .btqbtn {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px 0 rgba(51, 51, 51, 0.05);
}

#boutique ul li .btqbtn .btqfirst {
  width: 92%;
  font-family: SourceHanSansCN;
  font-size: 0.453rem;
  letter-spacing: 0.007rem;
  text-align: left;
  color: #272727;
  padding: 0;
  margin: 0.32rem 0 0.1833rem 0.4rem;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#boutique ul li .btqbtn .btqsecond {
  font-size: 0.373333rem;
  color: #777777;
  margin-bottom: 0.32rem;
  margin-left: 0.4rem;
  letter-spacing: -0.6px;
  position: relative;
  display: flex;
  align-items: center;
}

#boutique ul li .btqbtn .btqsecond .update {
  display: inline-block;
  margin-right: 0.133333rem;
  font-size: 0.373333rem;
  padding-top: 0.133rem;
}

#boutique ul li .btqbtn .btqsecond .nutrition {
  display: inline-block;
  width: 46%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 0.133333rem;
  font-size: 0.373333rem;
  padding-top: 0.133rem;
}

#boutique ul li .btqbtn .btqsecond .nutrition .shu {
  display: inline-block;
  width: 0.026667rem;
  height: 0.28rem;
  font-size: 0.373333rem;
  letter-spacing: -0.4px;
  text-align: justify;
  color: #bbbbbb;
  background: #bbbbbb;
  margin-right: 0.133333rem;
}
#boutique ul li .btqbtn .btqsecond .nutrition .troduce {
  font-size: 14px;
  color: #777777;
  font-weight: normal;
}
#boutique ul li .btqbtn .btqsecond .time {
  padding: 0.08rem 0.12rem 0.08rem 0.133333rem;
  border: 1px solid #e5e5e5;
  margin-left: 0.266667rem;
  font-size: 0.32rem;
  border-radius: 0.053333rem;
  color: #bfbfbf;
  letter-spacing: -0.4px;
  position: absolute;
  right: 0.4rem;
  top: 0.06rem;
}

#boutique ul li .btqbtn .btqthird {
  color: #777777;
  margin-left: 0.4rem;
  padding-bottom: 0.266667rem;
  letter-spacing: -0.5px;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 0.373333rem;
}

#boutique ul li .btqbtn .btqthird i {
  margin-left: 0.4rem;
  font-size: 0.373333rem;
  color: #cccccc;
}

#boutique ul li .btqbtn .btqthird .headpic {
  display: inline-block;
  width: 0.64rem;
  height: 0.626667rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.2rem;
  position: relative;
}

#boutique ul li .btqbtn .btqthird .headpic img {
  width: 100%;
  height: 100%;
}

#boutique ul li .btqbtn.btqthird .author {
  font-size: 0.373333rem;
  color: #272727;
}

#boutique ul li .btqbtn .btqthird .number {
  color: #666666;
  margin-left: 0.266667rem;
}

#boutique ul li .btqbtn .btqthird .people {
  margin-left: 0.24rem;
}

#boutique ul li .btqbtn .btqthird .price {
  position: absolute;
  right: 0.386667rem;
  top: 0.133333rem;
  font-size: 0.426rem;
  color: #ff6011;
  font-weight: 500;
  letter-spacing: -0.7px;
  z-index: 1;
}
#boutique ul li .btqbtn .btqthird .buy {
  position: absolute;
  right: 0.386667rem;
  top: 0.133333rem;
  font-size: 0.426rem;
  color: #ff6011;
  font-weight: 500;
  letter-spacing: -0.7px;
  z-index: 99;
}
#boutique ul li .btqgray {
  width: 100%;
  height: 0.2rem;
  background-color: #e5e5e5;
  opacity: 0.1;
}

.btqyuan {
  width: 0.746667rem;
  height: 0.746667rem;
  border-radius: 50%;
  background: #595959;
  color: black;
  position: fixed;
  line-height: 0.746667rem;
  right: 0.44rem;
  bottom: 1.786667rem;
  z-index: 99;
}

.btqyuan i {
  display: block;
  line-height: 0.746667rem;
  color: white;
  text-align: center;
  font-size: 0.3733rem;
}

.btqend {
  width: 100%;
  height: 0.8rem;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.24rem;
  letter-spacing: -0.5px;
  background: #e5e5e5;
  color: #666666;
}

.btqend .line {
  display: inline-block;
  width: 30%;
  height: 0.026667rem;
  background: white;
  line-height: 0.8rem;
  position: relative;
  top: -0.133333rem;
}

/* skldf */

.btqend .line:nth-of-type(1) {
  margin-right: 0.266667rem;
}

.btqend .line:nth-of-type(2) {
  margin-left: 0.266667rem;
}

.demo-infinite-container {
  width: 256px;
  height: 300px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #d9d9d9;
}

.icon {
  display: block;
  position: fixed;
  left: 35%;
  bottom: 0.2rem;
}

.icon img {
  display: block;
  width: 0.533333rem;
  height: 0.533333rem;
}
#boutique .wrapper .top,
#boutique .wrapper .bottom {
  box-sizing: border-box;
  width: 100%;
  height: 1.066667rem;
  overflow: hidden;
  line-height: 32px;
  text-align: center;
  color: #0085ff;
  font-size: 0.373333rem;
}
#boutique .wrapper .top img,
#boutique .wrapper .bottom img {
  width: 0.426667rem;
  height: 0.426667rem;
  display: inline-block;
  transform: rotate(180deg);
  transition: 300ms transform;
}
#boutique .wrapper .top span {
  display: inline-block;
  font-size: 0.32rem;
  color: #a5a5a5;
}
#boutique .wrapper .bottom span {
  font-size: 0.32rem;
  color: #a5a5a5;
}
#boutique .wrapper .bottom img {
  transform: rotate(0);
}
#boutique .wrapper .bottom .down img {
  transform: rotate(180deg);
}
#boutique .wrapper .top .up img {
  transform: rotate(0deg);
}
.active {
  display: none;
}
.page-wrapper .page .loading {
  position: absolute !important;
  width: 100%;
  height: 100%;
  z-index: 99;
}
</style>