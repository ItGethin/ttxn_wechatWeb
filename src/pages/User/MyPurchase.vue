<template>
  <div class="mypurchase">
      <top-head :title="title" :isNav="isNav"></top-head>
      <ul class="course-list">
          <router-link tag="li" v-for="(item, index) in purchaseList" :key="index" :to="`/course/${item.id}`">
              <div class="courseImg">
                <img :src="item.app_l_img" alt="">
            </div>
            <div class="courseInfo">
                <div class="title" v-text="item.l_title"></div>
                <div class="info">
                    <span class="taecher">{{item.buyTime|getBuyTime}}</span>
                    <span class="progress">￥<em v-text="item.buy_price"></em></span>
                </div>
            </div>
          </router-link>
      </ul>
      <no-record :title="title" v-show="!purchaseList.length"></no-record>
  </div>
</template>

<script>
import TopHead from "components/Header";
import NoRecord from "components/NoRecord";
import Time from "config/time";
export default {
  data() {
    return {
      title: "购买记录",
      isNav: true,
      purchaseList: []
    };
  },
  components: {
    TopHead,
    NoRecord
  },
  mounted() {
    this.getPurchase();
  },
  filters: {
    getBuyTime(value) {
      return Time.buyTime(value);
    }
  },
  methods: {
    getPurchase() {
      this.$get("buy/getBuyRecordList", {
        token: window.localStorage.getItem("token"),
        pageNum: 1,
        pageSize: 10
      })
        .then(res => {
          console.log(res);
          if (res.resultCode === 0) {
            this.purchaseList = res.data.list.list;
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
.mypurchase {
  padding-top: 1.173333rem;
  .course-list {
    padding: 0.333333rem 0.346667rem 0;
    li {
      display: flex;
      padding: 0.333333rem 0;
      border-bottom: 1px solid #e5e5e5;
      .courseImg {
        width: 3.333333rem;
        height: 1.866667rem;
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 16px;
          color: #272727;
        }
        .info {
          font-size: 12px;
          color: #bfbfbf;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .progress {
            font-size: 14px;
            color: #ff6011;
            em {
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>


