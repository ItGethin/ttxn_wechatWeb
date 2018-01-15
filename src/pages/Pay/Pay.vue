<template>
  <div class="pay">
      <top-head :title="title" :isNav="isNav"></top-head>
        <!-- 支付课程详情 -->
      <div class="pay-info">
          <div class="course-img">
              <img :src="payInfo.img" alt="">
          </div>
          <div class="course-details">
              <div class="course-title" v-text="payInfo.title"></div>
              <div class="course-pricce">
                <span class="price">￥<em v-text="payInfo.price"></em></span>
                <span class="count">x1</span>
              </div>
          </div>
      </div>

      <div class="payment">
        <div class="pay-title">支付方式</div>
        <div class="pay-method">
          <div class="pay-left">
            <i class="iconfont icon--zhifu weixin-icon"></i>
            <span>微信支付</span>
          </div>
          <i class="iconfont icon-youwutishi-zhengque"></i>
        </div>
      </div>
    <!-- 电话号码 -->
      <div class="phone">
          <span class="phone-title">手机号</span>
          <span class="tel-phone">{{phoneDel}}</span>
      </div>
    <!-- 支付按钮 -->
      <div class="pay-button">
          <span class="pay-text" @click="purchase">确认支付 ￥<em v-text="payInfo.price"></em></span>
      </div>

      <!-- 售后服务 -->
      <div class="server">
          <span class="server-tip">支付有任何问题，请联系客服</span>
        <span class="server-phone">
            <i class="iconfont icon--kecheng-zhifu-lianxiwomen"></i>
            <a :href="`tel:${payInfo.appTel}`">联系客服</a>
        </span>
      </div>
  </div>
</template>
<script>
import TopHead from "components/Header";
export default {
  data() {
    return {
      title: "支付订单",
      isNav: true,
      payInfo: {}
    };
  },
  components: {
    TopHead
  },
  computed: {
    phoneDel() {
      return this.payInfo.userTel?this.payInfo.userTel.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"):'';
    }
  },
  mounted() {
    this.$get(`/login/getSignature`, {
      url: window.location.href.split("#")[0]
    })
      .then(res => {
        console.log(res);
        if (res.resultCode === 0) {
          wx.config({
            debug: false, // 开启调试模式,
            appId: res.data.appid, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: "ttxn", // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名，见附录1
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo",
              "onMenuShareQZone",
              "chooseImage",
              "previewImage",
              "uploadImage",
              "downloadImage",
              "chooseWXPay"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.getPayInfo(this.$route.query.courseId);
  },
  methods: {
    getPayInfo(courseId) {
      this.$get("subject/getSubDetails", {
        token: window.localStorage.getItem("token"),
        id: courseId
      })
        .then(res => {
          console.log(res);
          if (res.resultCode === 0) {
            this.payInfo = {
              img: res.data.audioSubject.app_l_img,
              title: res.data.audioSubject.l_title,
              price: res.data.audioSubject.current_price,
              userTel: res.data.userTel,
              appTel: res.data.appTel.tel
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    purchase() {
      let _that = this;
      this.$post("buy/pay", {
        token: window.localStorage.getItem("token"),
        subjectId: this.$route.query.courseId,
        total_fee: this.payInfo.price
      }).then(res => {
        if (res.resultCode === 0) {
          // console.log("进入调起支付页面");
          // 调起微信支付
          wx.ready(function() {
            wx.chooseWXPay({
              timestamp: res.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: res.data.noncestr, // 支付签名随机串，不长于 32 位
              package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: res.data.paySign, // 支付签名
              success: (res)=> {
                // 支付成功后的回调函数
                // alert('支付成功');
                // alert(JSON.stringify(res));
                // alert(`/course/${_that.$route.query.courseId}`);
                // 无法跳转 this指向问题
                _that.$router.replace(`/course/${_that.$route.query.courseId}`);
              },
              fail: function(err) {
                // alert(JSON.stringify(err));
                console.log(err);
              }
            });
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pay {
  // 支付课程详情
  .pay-info {
    padding: 1.573333rem 0.346667rem 0.4rem;
    display: flex;
    border-bottom: 1px solid #e8e8e8;
    // padding-top: 1.173333rem;
    .course-img {
      width: 3.466667rem;
      height: 2rem;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .course-details {
      margin-left: 0.533333rem;
      padding-top: 0.24rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // align-items:
      .course-title {
        font-size: 16px;
        color: #272727;
      }
      .course-pricce {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: #ff500b;
        .count {
          font-size: 12px;
          color: #7d7d7d;
        }
      }
    }
  }
  // 支付方式
  .payment {
    padding: 0 0.346667rem;
    // margin-bottom: .266667rem;
    border: 1px solid #e8e8e8;
    .pay-title {
      font-size: 14px;
      color: #7d7d7d;
      line-height: 2.5;
    }
    .pay-method {
      padding: 0.266667rem 0.266667rem 0.266667rem 0;
      // padding-right: .266667rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .pay-left {
        display: flex;
        align-items: center;
        i.weixin-icon {
          padding: 0.133333rem;
        }
        span {
          margin-left: 0.56rem;
          font-size: 16px;
        }
      }
      i {
        font-size: 20px;
        color: rgba(0, 191, 0, 1);
      }
    }
  }
  //  手机显示
  .phone {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0.346667rem;
    border-bottom: 1px solid #e8e8e8;
    .phone-title {
      color: #777;
    }
    .tel-phone {
      color: #272727;
    }
  }
  //   支付按钮
  .pay-button {
    margin-top: 1.066667rem;
    padding: 0 0.346667rem;
    .pay-text {
      display: block;
      background: #ff6a11;
      font-size: 16px;
      color: #fff;
      padding: 0.373333rem 0;
      text-align: center;
      border-radius: 1.066667rem;
      cursor: pointer;
    }
  }
  //   售后服务
  .server {
    position: absolute;
    left: 0;
    bottom: 1.6rem;
    width: 100%;
    text-align: center;
    .server-tip {
      display: block;
      font-size: 14px;
      color: #7d7d7d;
      margin-bottom: 0.373333rem;
    }
    .server-phone {
      font-size: 16px;
      color: #ff500b;
      a {
        color: #ff500b;
      }
    }
  }
}
</style>


