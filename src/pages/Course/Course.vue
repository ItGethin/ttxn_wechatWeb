<template>
  <div class="wrapper">
    <div id="course">
        <!-- <top-head class="header" ref="topHead" :title="title" :isCollection="isCollection" :isNav="isNav"></top-head> -->
        <!-- 课程的头部 -->
        <div class="course-header" ref="topHead">
          <i class="iconfont icon--jiantou1 back" @click="back"></i>
          <span class="head-title" :style="{transform: 'translate(20px, 0)'}" v-show="!goTop">{{title}}</span>
          <span class="head-title" :style="{transform: 'translate(20px, 0)'}" v-show="goTop">
            <i class="iconfont icon--bofang2" @click="audioList.length?goList(playRecord.audioId,playRecord.index):openBuy()"></i>
            <span class="top-head-title">{{inputTitle}}</span>
          </span>
          <div class="head-icon">
              <div class="collection">
                <i class="iconfont icon--shoucanghuang activeIcon" @click="setCollection" v-if="isCollect" ></i>
                <i class="iconfont icon--shoucangbai" @click="setCollection" v-else-if="!isCollect"></i>
                <!-- <i class="iconfont icon--shoucang" :class="{'activeIcon': isCollect}" @click="setCollection"></i> -->
                <em class="head-text">收藏</em>
              </div>
              <div class="nav" @click="isNavShow=!isNavShow">
                <i class="iconfont icon-daohang"></i>
                <em class="head-text">导航</em>
              </div>
          </div>

          <div class="iconNav" v-show="isNavShow">
            <ul>
              <router-link to="/lesson/all" class="borderBottom" tag="li">
                <i class="iconfont icon-daohang-1"></i>
                <span>课程</span>
              </router-link>
              <router-link to="/user/mySelf" tag="li">
                <i class="iconfont icon-daohang-2"></i>
                <span>我的</span>
              </router-link>
            </ul>
          </div>
        </div>
  	<!-- banner 展示学习状态 -->
  	  <div class="banner" ref="banner" :style="styleObject">
		<!-- 遮罩层 -->
        <div class="bgColor"></div>
        <div class="learn-state">
          <h3 class="learn-text" v-if="audioList.length && !playRecord.hasPlayRecord">您还未学习本课程</h3>
          <h3 class="learn-text" v-else-if="audioList.length && playRecord.hasPlayRecord">上次学到:{{playRecord.title}}</h3>
          <input class="learn-input" type="button" :value="inputTitle" @click="audioList.length?goList(playRecord.audioId,playRecord.index):openBuy()">
        </div>
  	  </div>
  	<!-- tab 切换 -->
  	<ul class="tabs" ref="tabs" :class="{'tabsfixed': tabsInfo}">
  		<li v-for="(item, index) in tabLists" :key="index" @click.stop="changeTabIndex(index)">
  			<em :class="{'tabActive': tabIndex===index}" :data-number="commentInfo.totalRow">{{item.title}}</em>
  			<span v-show="tabIndex===index"></span>
  		</li>
  	</ul>

    <div class="paddingTabs" v-show="tabsInfo" :style="{width: '100%', height: '1.066667rem'}"></div>
<!-- 课程介绍 -->
	<div class="course-infos" ref="courseInfo">
		<h3 class="course-title">{{courseInfo.title}}</h3>
		<div class="course-info">
			<span class="time">
				<i class="iconfont icon--X1"></i>
				<em>{{courseInfo.subjects}}节课/{{courseInfo.duration}}分钟</em>
			</span>
			<span class="learn">
				<i class="iconfont icon--X"></i>
				<em>{{courseInfo.times}}人学习</em>
			</span>
		</div>
        <div class="price" v-if="courseInfo.price!=0 && !courseInfo.isBuy">
            <span class="current-price">￥{{courseInfo.price}}</span>
            <span class="old-price">￥{{courseInfo.original_price}}</span>
        </div>
        <div class="price" v-else-if="courseInfo.price!=0 && courseInfo.isBuy">
          <span class="isBuy">已购买</span>
        </div>  
	</div>
<!-- 讲师介绍 -->
	<div class="teacher-infos" @click="teacherDetails(teacherInfo.teacherId)">
        <div class="teacher-img">
            <img :src="teacherInfo.teacherImg" alt="">
        </div>
		<div class="teacher-info">
			<div class="name">
				<h3>{{teacherInfo.teacherName}}</h3>
				<em>{{teacherInfo.desc}}</em>
			</div>
			<i class="iconfont icon--jiantouhui"></i>
		</div>
    </div>

	<!-- 简介 -->
    <div class="introduction">
        <h3>简介</h3>
        <div class="introduction-text" v-html="introduction"></div>
    </div>
  <div class="bgColorStyle" style="height: .26667rem; backgroundColor: #eee"></div>
	<!-- 目录 -->
	<div class="lists" ref="lists">
		<h3 class="lists-title">目录</h3>
		<ul class="list">
            <li v-for="(item, index) in list" :key="index" @click="!courseInfo.price || (item.audio_status==='1') || courseInfo.isBuy? goList(item.id, index):openBuy()">
                <div class="list-info"> 
                    <h3>{{item.title}}</h3>
                    <span>
                        <em>{{item.up_time|updateTime}}</em>
                        <em>{{item.duration|getTime}}</em>
                        <em>{{item.duration|setProgress(item.playDuration)}}</em>
                    </span>
                </div>
                <div class="download" v-if="(courseInfo.price && !courseInfo.isBuy && (item.audio_status==='1'))">  <!-- 下载 -->
                            <!-- <i class="iconfont icon--xiazai" v-if="result.current_price===0 || isBuy===1"></i> -->
                    <div class="listen">
                      <i class="iconfont icon--shiting"></i>
                      <span class="listen-text">试听</span>
                    </div>
                </div>
            </li>
        </ul>
	</div>
<div class="bgColorStyle" style="height: .26667rem; backgroundColor: #eee"></div>
	<!-- 推荐 -->
	<div class="recommend" v-if="recommendList.length">
    	<h3 class="recomment-title">推荐</h3>
    	<ul class="recommend_list">
          <router-link :to="`/course/${item.id}`" v-for="(item, index) in recommendList" :key="index" tag="li">
            <div class="list_info">
                	<h3>{{item.l_title}}</h3>
                	<div class="list_details">
                    	<span>{{item.create_time|updateTime}}</span>
                    	<span>{{item.times}}人学习</span>
                	</div>
            	</div>
            	<div class="list_img">
                	<img :src="item.app_l_img" alt="">
            	</div>
          </router-link>
    	</ul>
	</div>
  <div class="bgColorStyle" v-if="recommendList.length" style="height: .26667rem; backgroundColor: #eee"></div>
  <!-- 评论 -->
  <div class="comment" ref="comment">
    <div class="comment-top">
      <span>评论</span>
     <em v-if="commentInfo.totalRow!=0">{{commentInfo.totalRow}}</em>
     <!-- <em v-if="commentInfo.totalRow!=0">{{constnum}}</em>-->
    </div>
    <div class="paddingComment" :style="{width: '100%', height: '1rem'}" v-show="commentfixed"></div>
    <div class="comment-input" :class="{'commentfixed': commentfixed}" ref="commentInput">
      <div class="commentInput" @click="openBottomSheet">我来说两句</div> 
    </div>
<!-- 评论发表框 -->
    <mu-bottom-sheet :open="commentShow" sheetClass="comment-wrap" @close="closeBottomSheet" @show="commentAreaFocus">
        <mu-list class="comment-area" @itemClick="closeBottomSheet">
          <mu-sub-header class="comment-header">
            <h3>发表评论</h3>
            <i class="iconfont icon--jiantou" @click="closeBottomSheet"></i>
          </mu-sub-header>
          <div class="commentArea">
            <textarea name="commment" maxlength="150" ref="commentTextArea" id="" cols="30" rows="4" class="comment-text" style="resize: none;" @input="isSubmit"></textarea>
            <div class="maxText">{{textareaLength}}/150</div>
          </div>
          <button :class="{'submitAbled': isTextArea}" @click="sendComment">发表</button>
        </mu-list>
      </mu-bottom-sheet>

    <div class="comment-list" ref="commentList" :class="imgDownClass">
      <ul v-if="commentInfo.totalRow!=0">
        <li v-for="(item, index) in commentInfo.commentList" :key="index">
          <div class="commentUser-info">
            <div class="commentUser-img">
              <img :src="item.head_img?item.head_img:userImg" alt="">
            </div>
            <div class="commentUser-name">
              <span class="username">{{item.name}}</span>
              <span class="time">{{item.create_time|commentTime}}</span>
            </div>
          </div>
          <div class="comment-content">
            {{item.content}}
          </div>
        </li>
      </ul>
      <div class="noComment" v-else>
          <div class="commentContent">
            <div class="commentImg">
              <img src="../../assets/images/comment.png" alt="">
            </div>
            <span class="commentText">暂无评论</span>
          </div>
      </div>
    </div>
  </div>
  <!-- 购买按钮 -->
  <router-link :to="`/pay?courseId=${$route.params.id}`" class="purchase" v-if="courseInfo.price && !courseInfo.isBuy" tag="div">
      <div class="buy">购买课程:￥ <em v-text="courseInfo.price"></em></div>
  </router-link>
  <div class="paddingButtom" style="height: 1.6rem; width: 100%;display: none;" v-show="courseInfo.price && !courseInfo.isBuy"></div>

  <!-- 回到顶部 -->
  <div class="goTop" v-show="goTop" @click="topScroll">
    <i class="iconfont icon-fanhuidingbu"></i>
  </div>


  <!-- 音频失效弹窗 -->
  <dialog-component :flag="dialog" @close="close">
    <p>该音频已失效</p>
  </dialog-component>

  <!-- 付费后才可以评论  暂时还未修改-->
  <dialog-component :flag="dialogPayComment" sureText="立即购买" cancleText="以后再说" @close="closePayComment">
    <p>本课程为付费课程</p>
    <p>需要购买后才能评论该课程</p>
  </dialog-component>

  <!-- 跳转下载APP页面 -->
  <dialog-component :flag="dialogBuy" sureText="立即购买" cancleText="以后再说" @close="closeBuy">
    <p>是否去购买该课程</p>
  </dialog-component>
</div>
		<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" :loadingText="loadingText" v-show="shower"  class="load" />
		
	   <div class="loading" v-show="!list.length">
	        <loading></loading>
	    </div>	
   
  </div>
  
</template>

<script>
import Data from "config/url";
import Time from "config/time";
import { share, config } from "config/share";
import { mapGetters } from "vuex";
import Loading from "components/Loading";
import DialogComponent from "components/Dialog";
import userImg from "../../assets/images/userImg.png";

export default {
  data() {
    return {
      title: "课程详情",
      isNavShow: false,
      isCollect: 0,
      styleObject: {},
      userImg: userImg, // 评论的用户默认头像
      courseInfo: {},
      tabsInfo: false,
      commentfixed: false,
      commentShow: false,
      isTextArea: false,
      textareaLength: 0,
      teacherInfo: {},
      playRecord: {},
      introduction: "",
      list: [],
      recommendList: [],
      commentInfo: {},
      tabLists: [{ title: "介绍" }, { title: "目录" }, { title: "评论" }],
      tabIndex: 0,
      goTop: false,
      dialog: false, // 音频失效
      dialogBuy: false, // 购买
      dialogPayComment: false, // 购买后方可评论
      loadingText: "加载中...",
      timer: false, //定时器
      loading: false,
      scroller: null,
      pageNum: 1,
      shower: true,
      imgDownClass: "",
      constnum:'',
      
    };
  },
  computed: {
    ...mapGetters(["audioIndex", "audioList", "audioId"]),
    inputTitle(){
      if (this.audioList.length) {
        if (
          this.courseInfo.price &&
          !this.courseInfo.isBuy &&
          this.playRecord.hasPlayRecord
        ) {
          return "继续试听";
        } else if (
          this.courseInfo.price &&
          !this.courseInfo.isBuy &&
          !this.playRecord.hasPlayRecord
        ) {
          return "免费试听";
        } else if (
          (!this.courseInfo.price || this.courseInfo.isBuy) &&
          !this.playRecord.hasPlayRecord
        ) {
          return "开始学习";
        } else if (
          (!this.courseInfo.price || this.courseInfo.isBuy) &&
          this.playRecord.hasPlayRecord
        ) {
          return "继续学习";
        }
      } else {
        return "购买课程";
      }
    }
  },
  components: {
    Loading,
    DialogComponent
  },
  filters: {
    getTime(value) {
      return Time.sConversionTime(value);
    },
    updateTime(value) {
      return Time.getShelfTime(value);
    },
    commentTime(value) {
      return Time.getShelfTime(value);
    },
    setProgress(value, state1) {
      if (state1 === 0 || state1 === undefined) {
        return "未播放";
      } else if (value === state1) {
        return "已播完";
      } else {
        return "播放至" + Math.ceil(state1 / value * 100) + "%";
      }
    }
  },
  watch: {
    "$route.params.id"(val) {
      this.getSubjectDetials(val);
    }
  },
  mounted() {
    this.scroller = this.$el;
    this.getSubjectDetials(this.$route.params.id);
    this.getComment(this.$route.params.id);

    // console.log(localStorage.getItem("playRecord"));
    // 滚动监听


    

    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 课程收藏接口
    setCollection() {
      this.$post("collect/saveSubjectCollect", {
        token: window.localStorage.getItem("token"),
        id: this.$route.params.id
      }).then(res => {
        if (res.resultCode === 0) {
          this.isCollect = res.data.status;
        } else {
          console.log("接口请求失败");
        }
      });
    },
    // tab 切换效果
    changeTabIndex(index) {
      this.tabIndex = index;
      switch (index) {
        case 0:
          // console.log(this.$refs.courseInfo.offsetTop - this.$refs.topHead.$el.clientHeight - this.$refs.tabs.clientHeight);
          document.documentElement.scrollTop =
            this.$refs.courseInfo.offsetTop -
            this.$refs.topHead.clientHeight -
            this.$refs.tabs.clientHeight;
          //   // window.pageYOffset = 164;
          document.body.scrollTop =
            this.$refs.courseInfo.offsetTop -
            this.$refs.topHead.clientHeight -
            this.$refs.tabs.clientHeight;
          break;
        case 1:
          document.documentElement.scrollTop = this.$refs.lists.offsetTop - 80;
          // window.pageYOffset = 164;
          document.body.scrollTop = this.$refs.lists.offsetTop - 80;
          break;
          case 2:
          document.documentElement.scrollTop =
            this.$refs.comment.offsetTop - 80;
          // window.pageYOffset = 164;
          document.body.scrollTop = this.$refs.comment.offsetTop - 80;
          break;
      }
    },
    // 请求课程详情资源
    getSubjectDetials(courseId) {
      this.$get(
        `subject/subjectDetails?id=${courseId}&token=${window.localStorage.getItem(
          "token"
        )}`
      )
        .then(res => {
          // banner 背景图
          this.styleObject = {
            backgroundImage: "url(" + res.data.subDetails.l_img + ")",
            backgroundSize: "100% 100%"
          };
          // 课程相关信息
          this.courseInfo = {
            title: res.data.subDetails.l_title,
            describe: res.data.subDetails.s_title,
            img: res.data.subDetails.l_img,
            subjects: res.data.subDetails.subjects,
            duration: Time.minuteReturn(res.data.subDetails.duration),
            price: res.data.subDetails.current_price,
            original_price: res.data.subDetails.original_price,
            times: res.data.subDetails.times,
            isBuy: res.data.subDetails.isBuy
          };
          this.isCollect = res.data.subDetails.isCollect;
          // 教师相关信息
          this.teacherInfo = {
            teacherImg: res.data.subDetails.img,
            teacherName: res.data.subDetails.name,
            desc: res.data.subDetails.desc,
            teacherId: res.data.subDetails.teacher_id
          };

          this.recommendList = res.data.recomList;

          // this.introduction = res.data.subDetails.content;

          var data=res.data.subDetails.content;
					var reg = /<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig;  //正则匹取消标签
					while (reg.test(data)) {
					    data = data.replace(reg,"");
					}		
					this.introduction=data;
          // 目录列表
          this.list = res.data.audioList;
          this.$store.commit("AudioList", this.handleList(res.data.audioList));

          // 调试无法识别id
          // console.log(this.audioList);
          // console.log(this.audioIndex);
          // console.log(this.audioList[this.audioIndex].id);
          // console.log(this.audioId);
          // 判断是否有最有一次播放记录
          // console.log(res.data.audioId);
          if (res.data.audioId.audio_id != null) {
            let playRecord = {
              title: res.data.audioId.audio_title,
              audioId: res.data.audioId.audio_id,
              duration: res.data.audioId.play_duration,
              linkid: courseId
            };
            // 如果有最后一次的播放记录,  进行本地存储
            window.localStorage.setItem(
              "playRecord",
              JSON.stringify(playRecord)
            );
          }

          //  读取存储记录
          if (localStorage.getItem("playRecord")) {
            // 有记录
            // 判断本地存储是否是为同一课程
            this.audioList.forEach((item, index, arr) => {
              if (
                item.id.indexOf(
                  JSON.parse(localStorage.getItem("playRecord")).audioId
                ) != -1
              ) {
                this.$store.commit("AudioIndex", index);
                this.playRecord = {
                  hasPlayRecord: true,
                  title: JSON.parse(localStorage.getItem("playRecord")).title,
                  audioId: JSON.parse(localStorage.getItem("playRecord"))
                    .audioId,
                  index: index
                };
              }
            });
          } else {
            // 没有记录  也没有最后一次播放记录
            this.playRecord.hasPlayRecord = false;
          }
          //  分享的配置信息
          let share_config = {
            title: this.courseInfo.title, // 分享标题
            desc: this.courseInfo.describe, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this.courseInfo.img, // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            success: () => {
              // 用户确认分享后执行的回调函数
              console.log("分享成功");
            },
            cancel: function() {
              console.log("分享失败");
              // 用户取消分享后执行的回调函数
            }
          };
          // 分享方法
          share(share_config);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getComment(courseId) {
      var url = `comment/subjectCommentList?id=${courseId}&pageSize=10&pageNum=${this
        .pageNum}`;
      this.$get(url, {
        token: window.localStorage.getItem("token")
      })
        .then(res => {
          this.commentInfo = {
            totalRow: res.data.userComment.totalRow,
            commentList: res.data.userComment.list,
          };
         
        })
        .catch(err => {
          console.log(err);
        });
    },
    getNewComment(courseId){
      this.$get(`comment/subjectCommentList?id=${courseId}&pageSize=10&pageNum=${this.pageNum}`,{
        token: window.localStorage.getItem("token")
      })
        .then(res =>{
        		this.commentInfo.totalRow = res.data.userComment.totalRow;
            this.commentInfo.commentList = this.commentInfo.commentList.concat(res.data.userComment.list.pop());
//          this.constnum =this.commentInfo.commentList.length;
           
        })
    },
    loadMore:function() {
      if (this.commentInfo.commentList.length < 10) {
        this.loading = false;
        this.shower = false;
        this.imgDownClass = "btn";
        this.imgDownClass = "btn";
      } else {
        this.loading = true;
        this.pageNum += 1;
        this.time = setTimeout(() => {
          var url = `comment/subjectCommentList?id=${this.$route.params
            .id}&pageSize=10&pageNum=${this.pageNum}`;
          this.$get(url, {
            token: window.localStorage.getItem("token")
          })
            .then(res => {
              this.commentInfo.commentList = this.commentInfo.commentList.concat(
                res.data.userComment.list
              );
              //           console.log(this.commentInfo.commentList.length);
              var number = Math.ceil(
                (res.data.userComment.list.length + 1) / 10
              );
              if (this.pageNum > number + 1 || number <= 1) {
                this.shower = false;
                this.imgDownClass = "btn";
                clearTimeout(this.timer);
                return;
              }
              this.loading = false;
            })
            .catch(err => {
              console.log(err);
            });
        }, 2000);
      }
    },
    isSubmit(e) {
      this.textareaLength = e.target.value.length;
      // console.log(e.target.value);
      if (e.target.value.length) {
        this.isTextArea = true;
      } else {
        this.isTextArea = false;
      }
    },
    // 文本框聚焦
    commentAreaFocus() {
      this.$refs.commentTextArea.focus();
    },
    // 打开评论
    openBottomSheet() {
      this.$get("user/getTelIsExist",{
        token: window.localStorage.getItem('token')
      }).then(res => {
        if (res.resultCode === 0) {
          if (!this.courseInfo.price || this.courseInfo.isBuy) {
            this.commentShow = true;
          } else {
            this.openPayComment();
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },
    closeBottomSheet() {
      this.textareaLength = 0;
      this.commentShow = false;
    },
    // 提交评论
    sendComment() {
      let content = this.$refs.commentTextArea.value;
      // console.log(content);
      this.$post("comment/saveUserComment", {
        token: window.localStorage.getItem("token"),
        id: this.$route.params.id,
        content
      }).then(res =>{
        if (res.resultCode === 0) {
          this.getNewComment(this.$route.params.id);
        }
      });
      this.closeBottomSheet();
    },
    teacherDetails(id) {
      this.$router.push({ path: `/teacher/${id}` });
    },
    topScroll() {
      this.$fun.returnTop();
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      // console.log(scrollTop);

      // 回到顶部的显示隐藏
      if (scrollTop != 0) {
        this.goTop = true;
      } else {
        this.goTop = false;
      }

      //   tabs 的吸顶
      if (
        scrollTop >
        this.$refs.courseInfo.offsetTop -
          this.$refs.topHead.clientHeight -
          this.$refs.tabs.clientHeight
      ) {
        this.tabsInfo = true;
      } else {
        this.tabsInfo = false;
      }
      // 评论吸顶
      if (
        scrollTop >
        this.$refs.commentList.offsetTop -
          this.$refs.topHead.clientHeight -
          this.$refs.tabs.clientHeight -
          this.$refs.commentInput.clientHeight
      ) {
        this.commentfixed = true;
      } else {
        this.commentfixed = false;
      }

      //  滚动 切换tab样式
      if (
        scrollTop > this.$refs.courseInfo.offsetTop &&
        scrollTop < this.$refs.lists.offsetTop - 80
      ) {
        this.tabIndex = 0;
      } else if (
        scrollTop > this.$refs.lists.offsetTop - 80 &&
        scrollTop < this.$refs.comment.offsetTop - 168
      ) {
        this.tabIndex = 1;
      } else if (scrollTop > this.$refs.comment.offsetTop - 168) {
        this.tabIndex = 2;
      }
    },
    // 处理播放列表
    handleList(list) {
      let newList = [];
      list.forEach(element => {
        if (!this.courseInfo.price || this.courseInfo.isBuy) {
          //免费的课程 或者 已购买的  全部提交
          newList.push(element);
        } else if (
          this.courseInfo.price &&
          !this.courseInfo.isBuy &&
          (element.audio_status)==='1'
        ) {
          // 提交试听列表  付费的并且没有购买，而且还要有试听状态的
          newList.push(element);
        }
      });
      return newList;
    },
    goCourse(courseId) {
      this.$router.push(`/course/${courseId}`);
    },
    goList(audioId = this.audioId, index = this.audioIndex) {
      this.$store.commit("AudioIndex", index);
      this.$get(`audio/getUrlisExist`, {
        id: audioId,
        subjectId: this.$route.params.id
      }).then(res => {
          // console.log(res);
          if (res.data.audioInfo.state === 1) {
            let url = `/audiolist?courseId=${this.$route.params
              .id}&audioId=${audioId}`;
            this.$router.push(url);
          } else {
            this.dialog = true;
          }
        }).catch(err => {
          console.log(err);
        });
    },
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    // 关闭购买弹窗
    closeBuy(value) {
      this.dialogBuy = false;
      if (value) {
        // 去购买页面
        this.$router.push(`/pay?courseId=${this.$route.params.id}`);
      }
    },
    openBuy() {
      this.dialogBuy = true;
    },
    // 购买后方可评论
    openPayComment() {
      this.dialogPayComment = true;
    },
    closePayComment(value) {
      this.dialogPayComment = false;
      if (value) {
        // 去购买页面
        this.$router.push(`/pay?courseId=${this.$route.params.id}`);
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
@import "../../assets/css/course.scss";

// 评论
.comment-wrap {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 2;
  background: #fff;
  box-shadow: 0 2px 5px #ccc;
  .comment-area {
    box-sizing: border-box;
    padding: 0.333333rem 0.346667rem 0;
    display: flex;
    flex-direction: column;
    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.333333rem;
      h3 {
        font-size: 16px;
      }
      i {
        font-size: 12px;
        color: #808080;
      }
    }
    .commentArea {
      box-sizing: border-box;
      background: #f5f7f9;
      border-radius: 16px;
      line-height: 1;
      .comment-text {
        box-sizing: border-box;
        border: none;
        outline: none;
        width: 100%;
        background: #f5f7f9;
        border-radius: 16px;
        font-size: 14px;
        padding: 10px 10px 0;
      }
      .maxText {
        font-size: 12px;
        text-align: right;
        padding-right: 10px;
        padding-bottom: 5px;
      }
    }
    button {
      margin-top: 0.266667rem;
      width: 2.666667rem;
      font-size: 20px;
      color: #fff;
      line-height: 1.8;
      align-self: flex-end;
      background: #d3d3d3;
      outline: none;
      border: none;
      border-radius: 6px; // padding-bottom: .2rem;
    }
    button.submitAbled {
      background: #ff6a11;
    }
  }
}

/*// 购买弹窗*/
.mu-dialog.dialogBuy {
  .mu-dialog-body {
    min-height: 2.4rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mu-dialog-actions {
    display: flex;
    justify-content: space-between;
    button {
      flex: 1;
    }
    button.blackcolor {
      .mu-flat-button-wrapper {
        .mu-flat-button-label {
          color: #666 !important;
        }
      }
    }
  }
}

.introduction-text {
  line-height: 1.4 !important;
}
// .introduction-text p {
//   text-indent: .32rem;
// }

.introduction-text p img {
  margin: 0.2rem 0 !important;
}
.introduction-text p span {
  width: 100% !important;
  margin: 0.5rem 0rem !important;
  background-size: 5%;
  background-position-y: 0.2rem !important;
  padding-left: 0.3rem !important;
  padding-top: 0 !important;
}
.introduction-text p > span > span {
  width: auto !important;
  text-align: center;
  margin-top: 0.5rem !important;
  // padding: 0rem 1rem !important;
  background-position-y: 0rem !important;
}
.introduction-text p span a {
  font-size: 16px !important;
}
.introduction-text p span strong span {
  padding: 0 !important;
}
.introduction-text table tbody tr td {
  display: inline-block;
  width: 100%;
}
.purchase {
  z-index: 9999;
}
.paddingButtom {
  display: none;
}
.btn {
  margin-bottom: 1.7rem;
}
</style>