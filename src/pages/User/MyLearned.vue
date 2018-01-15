<template>
  <div class="mylearned">
      <top-head :title="title" :isNav="isNav"></top-head>
      <ul class="course-list">
          <router-link v-for="(item, index) in learnedList" :key="index" :to="`/course/${item.id}`" tag="li">
            <div class="courseImg">
                <img :src="item.s_img" alt="">
            </div>
            <div class="courseInfo">
                <div class="title" v-text="item.l_title"></div>
                <div class="info">
                    <span class="taecher" v-text="item.name"></span>
                    <span class="progress">{{item.learnCount|progress(item.sumCount)}}</span>
                </div>
            </div>
          </router-link>
      </ul>
      <no-record v-if="!learnedList.length" :title="title"></no-record>
  </div>
</template>
<script>
import TopHead from "components/Header";
import NoRecord from "components/NoRecord";
export default {
  data() {
    return {
      title: "已学课程",
      isNav: true,
      learnedList: []
    };
  },
  components: {
    TopHead,
    NoRecord
  },
  filters: {
    progress(value, total) {
      if(value === total) {
        return '已学完';
      } else {
        return Math.ceil(value / total * 100) + "%";
      }
    }
  },
  mounted() {
    this.getLearned();
  },
  methods: {
    getLearned() {
      this.$get("play/userLearnList", {
        token: window.localStorage.getItem("token"),
        pageNum: 1,
        pageSize: 10
      })
        .then(res => {
          if (res.resultCode === 0) {
            this.learnedList = res.data.list.list;
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
.mylearned {
  padding-top: 1.173333rem;
  .course-list {
    padding: 0.333333rem 0.346667rem 0;
    li {
      display: flex;
      // justify-content: space-between;
      padding: 0.333333rem 0;
      border-bottom: 1px solid #e5e5e5;
      .courseImg {
        width: 3.813333rem;
        height: 2.133333rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border: none;
        }
      }
      .courseInfo {
        flex: 1;
        margin-left: .266667rem;
        // max-width: 5.333333rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 16px;
          color: #272727;
        }
        .info {
          font-size: 12px;
          color: #777;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>


