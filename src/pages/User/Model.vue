<template>
  <div class="model">
      <top-head :title="title" :isNav="isNav"></top-head>
      <div class="modelInfo">
          <div class="modelArea">
              <input type="text" ref="model" class="modelInput" v-model="name" @input="changeValue" @blur="checkOut">
              <i class="iconfont icon--nicheng nickname" @click="clearText"></i>
              <em class="tips" v-text="tip"></em> 
          </div>
          <input type="button" value="完成" class="modelSuccess" :disabled="!isAbled" :class="{'active': isAbled}" @click="changeInfo">
          
      </div>
  </div>
</template>

<script>
import TopHead from "components/Header";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      isNav: true,
      title: "修改昵称",
      name: "",
      isAbled: false,
      tip: ""
    };
  },
  components: {
    TopHead
  },
  computed: {
    // title() {
    //   switch (this.$route.query.title) {
    //     case "name":
    //       return "修改昵称";
    //       break;
    //     case "carrer":
    //       return "修改职称";
    //       break;
    //   }
    // }
  },
  mounted() {
    this.name = this.$route.query.value;
  },
  methods: {
    changeValue() {
      this.isAbled = this.name.trim().length > 0 ? true : false;
    },
    changeInfo() {
      let data = {
        token: window.localStorage.getItem("token"),
        "model.name": this.name.trim()
      };
      // switch (this.$route.query.title) {
      //   case "name":
      //     data = {
      //       token: window.localStorage.getItem("token"),
      //       "model.name": this.name.trim()
      //     };
      //     break;
      //   case "carrer":
      //     data = {
      //       token: window.localStorage.getItem("token"),
      //       "model.carrer": this.name.trim()
      //     };
      //     break;
      // }

      if (this.$refs.model.value.length > 12) {
        return false;
      }
      this.$post("user/updUser", data).then(res => {
        if (res.resultCode === 0) {
          Toast({
            message: "修改成功",
            position: "middle",
            duration: 1000
          });
          setTimeout(() => {
            this.$router.replace("/user/userInfo");
          }, 1000);
        } else if (res.resultCode === 1) {
          Toast({
            message: "昵称已存在",
            position: "middle",
            duration: 1000
          });
        }
      });
    },
    checkOut(e) {
      // console.log(e.target.value);
      let value = e.target.value.trim();
      if (value.length > 12) {
        // console.log('长度大于12');
        this.tip = "昵称不能超过12个字";
      } else if (value.length === 0) {
        // console.log('名字不能为空');
        this.tip = "昵称不能为空";
      } else {
        this.tip = "";
      }
    },
    clearText() {
      this.name = "";
      this.isAbled = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.model {
  padding-top: 1.173333rem;
  background: #f6f6f6;
  height: 100%;

  input {
    outline: none;
    border: none;
  }
  .modelInfo {
    margin-top: 0.506667rem;
    font-size: 16px;
    .modelArea {
      position: relative;
      .modelInput {
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        font-size: 16px;
        color: #272727;
        // line-height: 3;
        padding: 0.373333rem 0.426667rem;
      }
      i.nickname {
        position: absolute;
        top: 50%;
        right: 0.266667rem;
        transform: translate(0, -50%);
        font-size: 20px;
        color: rgba(191, 191, 191, 1);
      }
      em.tips {
        position: absolute;
        bottom: -0.48rem;
        left: 0.4rem;
        font-size: 12px;
        color: #ff6011;
      }
    }

    .modelSuccess {
      margin: 0.613333rem auto 0;
      display: block;
      width: 90%;
      color: #cecece;
      padding: 0.32rem 0 0.346667rem;
      background-color: #eee;
      border-radius: 0.533333rem;
    }
    .modelSuccess.active {
      color: #fff;
      background-color: #ff6011;
    }
  }
}
</style>


