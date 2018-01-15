<template>
  <div class="header">
      <i class="iconfont icon--jiantou1 back" @click="back" v-if="isBack"></i>
      <span class="head-title">{{title}}</span>
      <div class="head-icon">
          <div class="collection" v-if="isCollection">
            <i class="iconfont icon--shoucang"></i>
            <em class="head-text">收藏</em>
          </div>
          <router-link to="/lesson/all" class="course" tag="div" v-if="isCourse">
            <i class="iconfont icon--X1"></i>
            <em class="head-text">课程</em>
          </router-link>
          <div class="nav" v-if="isNav" @click="isNavShow=!isNavShow">
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
          <!-- <li class="borderBottom">
            <i class="iconfont icon-daohang-1"></i>
            <span>课程</span>
          </li>
          <li>
            <i class="iconfont icon-daohang-2"></i>
            <span>我的</span>
          </li> -->
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "我是头部",
      isNavShow: false
    };
  },
  props: {
    title: {
      type: String,
      default: "天天学农"
    },
    isBack: {
      type: Boolean,
      default: true
    },
    isCollection: {
      type: Boolean,
      default: false
    },
    isCourse: {
      type: Boolean,
      default: false
    },
    isNav: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
$theneColor: #ff6a11;
$textColor: #777;
.header {
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 0 0.173333rem;
  width: 100%;
  height: 1.173333rem;
  background: #f9f9f9;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  .iconNav {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(0, 100%);
    background: #fff;
    z-index: 999;
    ul {
      list-style: none;
      box-shadow: -1px 2px 4px rgba(0,0,0,.1);
      li.borderBottom {
        border-bottom: 1px solid #eee;
      }
      li {
        // padding: .32rem .64rem .32rem .26rem;
        width: 3.2rem;
        height: 1.28rem;
        padding-left: .64rem;
        display: flex;
        align-items: center;
        font-size: 16px;

        i {
          margin-right: 0.16rem;
        }
        span {
          color: #272727;
        }
      }
    }
  }
  .back {
    font-size: 20px;
    color: #767676;
  }
  .head-title {
    font-size: 16px;
    color: #272727;
    font-weight: 900;
    transform: translate(4px, 0);
  }
  .head-icon {
    display: flex;
    .collection,
    .course,
    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 0.2rem;
      i {
        font-size: 18px;
        color: #777;
      }
      .head-text {
        margin-top: 0.133333rem;
        font-size: 12px;
        line-height: 1;
        color: $textColor;
      }
    }
  }
}
</style>


