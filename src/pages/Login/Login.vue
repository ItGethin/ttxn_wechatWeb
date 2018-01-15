<template>
  <div class="login">
      <top-header :title="msg"></top-header>
      <form class="login-form" action="">
          <div class="inputs tel">
              <i class="iconfont icon-shoujihs"></i>
              <input type="tel" v-model="phone" placeholder="请输入手机号码" @focus="warnWord=false" @blur="isWarn" @keyup="isAbled" maxlength="11">
              <span class="warn" v-show="warnWord">请输入正确的手机号码</span>
          </div>
          <div class="inputs verification">
              <i class="iconfont icon-icon-"></i>
              <input type="tel" ref="yzm" v-model="vCode" placeholder="请输入验证码" maxlength="4" @keyup="getVerification">
              <input class="getVerification" :disabled="!abled" :class="{'abled': abled}" type="button" value="获取验证码" @click="sendVerification">
          </div>

          <input class="submit" :class="{'abled': abled1}" :disabled="!abled1" type="button" value="提交" @click="login">
      </form>
  </div>
</template>

<script>
import TopHeader from "components/Header";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      msg: "登录学农",
      warnWord: false,
      abled: false,
      abled1: false,
      phone: "",
      vCode: ""
    };
  },
  components: {
    TopHeader
  },
  computed: {},
  mounted() {},
  methods: {
    // 验证手机号码
    checkMobile(phone) {
      var reg = /^1[3|4|5|7|8]\d{9}$/;
      let flag = reg.test(phone);
      if (!flag) {
        return false;
      }
      return true;
    },
    isWarn() {
      // console.log(this.phone);
      this.warnWord = !this.checkMobile(this.phone);
    },
    isAbled() {
      // 判断验证码
      this.abled = this.checkMobile(this.phone);
      this.getVerification(); // 提交是否禁用
    },
    // 获取验证码
    sendVerification(e) {
      // console.log(e.target.value);
      let nums = 90,
        clock;
      clock = setInterval(() => {
        nums--;
        if (nums > 0) {
          this.abled = false;
          e.target.value = `${nums}s重新获取`;
        } else {
          clearInterval(clock); //清除js定时器
          this.abled = true;
          e.target.value = `获取验证码`;
          nums = 90;
        }
      }, 1000);
      this.$post(`login/sendLoginVcode`, { tel: this.phone })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getVerification() {
      let flag = this.checkMobile(this.phone);
      // console.log(flag);
      if (this.$refs.yzm.value.length === 4 && flag) {
        this.abled1 = true;
      } else {
        this.abled1 = false;
      }
    },
    login() {
      // console.log('登录');
      this.$post("login/bindTel", {
        tel: this.phone,
        vcode: this.vCode,
        token: window.localStorage.getItem("token")
      }).then(res => {
        // console.log(res);
        if (res.resultCode === 0) {
          // 成功
          Toast({
            message: "绑定成功",
            position: "middle",
            duration: 1000
          });
          setTimeout(() => {
            this.$router.replace(decodeURIComponent(this.$route.fullPath.split('?')[1]));
          }, 1000);
        } else if (res.resultCode === 1) {
          // console.log("验证码输入错误");
          Toast({
            message: "绑定失败",
            position: "middle",
            duration: 1000
          });
        } else if (res.resultCode === 4) {
          // 手机号已被注册
          Toast({
            message: "该手机已被绑定",
            position: "middle",
            duration: 1000
          });
        } else if(res.resultCode === 8) {
          Toast({
            message: "验证码错误",
            position: "middle",
            duration: 1000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  padding: 0 0.4rem;
  .login-form {
    .abled {
      color: #fff !important;
      background-color: #ff6a11 !important;
    }
    padding-top: 1.173333rem;
    .inputs {
      position: relative;
      padding: 0.466667rem 0 0.2rem;
      border-bottom: 1px solid #eee;

      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        margin-right: 0.2rem;
      }
      input {
        width: 4.266667rem;
        height: 0.64rem;
        border: none;
        outline: none;
        font-size: 16px;
      }
      ::-webkit-input-placeholder {
        font-size: 16px;
        color: #bdbdbd;
      }
      ::-moz-placeholder {
        font-size: 16px;
        color: #bdbdbd;
      } /* firefox 19+ */
      :-ms-input-placeholder {
        font-size: 16px;
        color: #bdbdbd;
      } /* ie */
      input:-moz-placeholder {
        font-size: 16px;
        color: #bdbdbd;
      }
    }
    .tel {
      .warn {
        position: absolute;
        right: 0;
        font-size: 12px;
        color: red;
      }
    }
    .verification {
      padding-bottom: 0.266667rem;
      .getVerification {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        width: auto;
        height: 0.853333rem;
        border-radius: 0.533333rem;
        font-size: 14px;
        padding: 0 0.64rem;
        color: #bdbdbd;
        background: #eee;
      }
    }

    .submit {
      margin-top: 0.64rem;
      width: 100%;
      height: 1.173333rem;
      font-size: 20px;
      color: #cecece;
      outline: none;
      border: none;
      background: #eee;
      border-radius: 0.6rem;
    }
  }
}
</style>


