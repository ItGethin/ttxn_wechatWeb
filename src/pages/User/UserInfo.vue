<template>
  <div class="userInfo">
      <top-head :title="title" :isNav="isNav"></top-head>
      <ul class="info-list">
          <li>
              <em class="info-title">头像</em>
              <span class="info-details">
                  <em class="user-img" @click="changeImg">
                      <img :src="userInfo.img" alt="用户头像">
                  </em>
                  <i class="iconfont icon--jiantouhui"></i>
              </span>
          </li>
          <li>
            <em class="info-title">手机</em>
            <span class="info-details"><em>{{phoneDel}}</em></span>
          </li>
          <li>
            <em class="info-title">昵称</em>
              <router-link :to="`/user/model?title=name&value=${userInfo.name}`" class="info-details" tag="span">
                <em class="user-name" v-text="userInfo.name"></em>
                  <i class="iconfont icon--jiantouhui"></i>
              </router-link>
          </li>
      </ul>
  </div>
</template>
<script>
import TopHead from "components/Header";
import { config } from "config/share";
export default {
  data() {
    return {
      title: "个人资料",
      isNav: true,
      userInfo: {}
    };
  },
  components: {
    TopHead
  },
  computed: {
    phoneDel() {
      return this.userInfo.tel ? this.userInfo.tel.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : '';
    },
    carrer() {
      return this.userInfo.carrer === null ? "请设置" : this.userInfo.carrer;
    }
  },
  mounted() {
    this.getUserInfo();
    // jssdk的配置信息  头像上传接口
    config();
  },
  methods: {
    getUserInfo() {
      this.$get("user/getUserInfo", {
        token: window.localStorage.getItem("token")
      })
        .then(res => {
          this.userInfo = {
            img: res.data.userInfo.userInfo.head_img,
            name: res.data.userInfo.userInfo.name,
            carrer: res.data.userInfo.userInfo.carrer,
            tel: res.data.userInfo.userInfo.tel
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeImg() {

      let _that = this;
      //拍照或从手机相册中选图接口
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          var localIds = res.localIds.toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

          this.userInfo.img = localIds; //绑定页面的img标签的src属性，就可以展示自己选择的图片
          //上传图片接口
          wx.uploadImage({
            localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              var serverId = res.serverId; // 返回图片的服务器端ID

              _that.$post('user/updUser', {
                media_id: serverId,
                token: window.localStorage.getItem("token")
              }).then(res => {
                console.log(res);
              })
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.userInfo {
  .info-list {
    // padding: 1.173333rem .4re m 0;
    padding-top: 1.173333rem;
    li + li {
      border-top: 1px solid #dcdcdc;
    }
    li {
      font-size: 16px;
      color: #777;
      padding: 0.4rem 0.4rem;

      display: flex;
      justify-content: space-between;
      align-items: center;
      .info-title {
        font-size: 16px;
        color: #777;
      }
      .info-details {
        display: flex;
        align-items: center;
        > em {
          margin-right: 0.4rem;
        }
        .user-img {
          display: inline-block;
          width: 1.066667rem;
          height: 1.066667rem;
          img {
            // display: block;
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>


