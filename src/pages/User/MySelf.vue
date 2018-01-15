<template>
  <div class="wrap">
      <div class="mySelf" v-if="Object.keys(this.userInfo).length!=0">
        <top-head :title="title" :isCourse="isCourse"></top-head>
        <div class="banner" :style="{backgroundImage: `url(${userbackground})`, backgroundSize: '100% 100%'}">
          <div class="user-info">
            <router-link to="/user/userInfo" class="head-img" tag="div">
              <img :src="userInfo.img" alt="">
            </router-link>
            <span class="name" v-text="userInfo.name"></span>
          </div>
        </div>
        <!-- 学习时长 -->
        <div class="learning">
            <div class="learn-info learnint-time">
                <span class="times"><em class="time">{{userInfo.sumDuration|playedLength}}</em>{{userInfo.sumDuration|playedTime}}</span>
                <em class="text">今日学习</em>
            </div>
            <div class="learn-info total-time">
                <span class="times"><em class="time">{{userInfo.learn_duration|playedLength}}</em>{{userInfo.learn_duration|playedTime}}</span>
                <em class="text">累计学习时长</em>
            </div>
            <router-link to="/user/myLearned" class="learn-info learn-course" tab="div">
                <span class="times"><em class="time" v-text="userInfo.sumCount"></em>节</span>
                <em class="text">已学课程</em>
            </router-link>
        </div>
        <!-- 个人资料 -->
        <div class="infos">
            <ul class="list-info">
                <router-link to="/user/userInfo" class="info" tag="li">
                  <span class="info-icon">
                       <!-- <i class="iconfont icon-daohang-2"></i>-->
                        <img src="../../assets/images/myself_userinfo.png" alt="" />
                        <em class="info-text">个人资料</em>
                    </span>
                    <i class="iconfont icon--jiantouhui"></i>
                </router-link>
                <router-link to="/user/myPurchase" class="info" tag="li">
                  <span class="info-icon">
                       <!-- <i class="iconfont icon--wode3"></i>-->
                        <img src="../../assets/images/购买记录.png" alt="" />
                        <em class="info-text">购买记录</em>
                    </span>
                    <i class="iconfont icon--jiantouhui"></i>
                </router-link>
                <router-link to="/user/myPlayed" class="info" tag="li">
                    <span class="info-icon">
                        <!--<i class="iconfont icon--wode2"></i>-->
                         <img src="../../assets/images/播放记录.png" alt="" />
                        <em class="info-text">播放记录</em>
                    </span>
                    <i class="iconfont icon--jiantouhui"></i>
                </router-link>
                <router-link to="/user/myCollection" class="info" tag="li">
                  <span class="info-icon">
                        <img src="../../assets/images/我的收藏.png" alt="" />
                        <em class="info-text">我的收藏</em>
                    </span>
                    <i class="iconfont icon--jiantouhui"></i>
                </router-link>
            </ul>
        </div>

        <div class="infos about">
            <ul class="list-info">
              <router-link class="info" to="/user/about" tag="li">
                <span class="info-icon">
                       <!-- <i class="iconfont icon--wode-guanyuwomen"></i>-->
                        <img src="../../assets/images/意见反馈.png" alt="" />
                        <em class="info-text">关于我们</em>
                    </span>
                    <i class="iconfont icon--jiantouhui"></i>
              </router-link>
            </ul>
        </div>
      </div>  

      <div class="loading" v-else-if="Object.keys(this.userInfo).length===0">
        <loading></loading>
      </div>
    </div>
</template>

<script>
import TopHead from "components/Header";
import Loading from "components/Loading";

import userBg from "../../assets/images/userBackground.jpg";
export default {
  data() {
    return {
      title: "我的",
      isCourse: true,
      userInfo: {},
      userbackground: userBg
    };
  },
  components: {
    TopHead,
    Loading
  },
  filters: {
    playedLength(duration) {
      if (duration < 60) {
        return duration === 0 ? 0 : 1;
      } else if (duration < 3600) {
        return Math.ceil(duration / 60);
      } else {
        return Math.ceil(duration / 3600);
      }
    },
    playedTime(duration) {
      if (duration < 3600) {
        return "分钟";
      } else {
        return "小时";
      }
    }
  },
  mounted() {
    
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      // console.log(window.localStorage.getItem("token"));
      this.$get("user/getUserInfo", {
        token: window.localStorage.getItem("token")
      })
        .then(res => {
          if (res.resultCode === 0) {
            this.userInfo = {
              img: res.data.userInfo.userInfo.head_img,
              name: res.data.userInfo.userInfo.name,
              sumDuration: res.data.userInfo.sumDuration,
              learn_duration: res.data.userInfo.userInfo.learn_duration,
              sumCount: res.data.userInfo.sumCount
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>

.mySelf {
  padding-top: 1.173333rem;
  background-color: #eee;
  .banner {
    height: 5.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .head-img {
        width: 2.533333rem;
        height: 2.533333rem;
        margin-bottom: 0.266667rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 1.3333rem;
        }
      }
      .name {
        font-size: 16px;
        color: #fff;
      }
    }
  }
  .learning {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    padding: 0.493333rem 0 0.36rem;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 0.133333rem;
    .learn-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      .times {
        font-size: 12px;
        color: #bbb;
        .time {
          font-size: 24px;
          color: #272727;
          margin-right: 0.266667rem;
        }
      }
      .text {
        margin-top: 0.213333rem;
        font-size: 12px;
        color: #777;
      }
    }
  }
  .infos {
    background-color: #fff;
    .list-info {
      padding: 0 0.466667rem;
      .info {
        padding: 0.333333rem 0 0.266667rem;
        color: #777;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e8e8e8;
        .info-icon {
          display: flex;
          align-items: center;
         img{
         	display: inline-block;
         	width:.64rem;
         	height:.64rem;
         }
          .info-text {
            margin-left: 0.533333rem;
            font-size: 14px;
            line-height: 1;
          }
        }
        i {
          font-size: 12px;
        }
      }
    }
  }
  .about {
    margin-top: 0.133333rem;
  }
}
</style>


