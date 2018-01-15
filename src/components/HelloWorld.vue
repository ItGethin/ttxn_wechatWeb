<template>
  <div class="hello">
    <button @click="getNet">拍照</button>
    <img ref="loadImg" :src="imgSrc" alt="">
    <button @click="open">打开dialog</button>
    <dialog-top :flag="flag" @close="kk">
      <p>我来打开</p>
    </dialog-top>

    <audio id="audio" ref="player" controls src="https://xuenong.b0.upaiyun.com/test/201801/8fc448e6b7dd4f4c9816f4eaaa8b42ff.mp3"></audio>
  </div>
</template>

<script>
// function isLocalStorageSupported() {
//   var testKey = "test",
//     storage = window.sessionStorage;
//   try {
//     storage.setItem(testKey, "testValue");
//     storage.removeItem(testKey);
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

// alert(isLocalStorageSupported());

import { share, config } from "config/share";
import DialogTop from "components/Dialog";
import Time from "config/time";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      tel: "13510242352",
      imgSrc:
        "https://xuenong.b0.upaiyun.com/test/a8b1288c20134b139c316bbce63754c1.png",
      flag: false,
      commentInfo: {},
      loading: false,
      pageNum: 1
    };
  },
  components: {
    DialogTop
  },
  filters: {
    commentTime(value) {
      return Time.commentTime(value);
    }
  },
  computed: {
    telPhoto() {
      // 空格分开
      return this.tel.replace(/\B(?=(?:\d{4})+$)/g, " ");
    }
  },
  mounted() {
    var audio = this.$refs.player;
    audio.currentTime = 10;
    // document.addEventListener("WeixinJSBridgeReady", function () {
    //   alert('执行了微信内置方法');
    //         audio.play();
    // }, false);

    wx.config({
      // 配置信息, 即使不正确也能使用 wx.ready
      debug: false,
      appId: "",
      timestamp: 1,
      nonceStr: "",
      signature: "",
      jsApiList: []
    });
    wx.ready(()=> {
      alert(this.$refs.player.paused);
      this.$refs.player.play();
      alert(this.$refs.player.paused);
    });

    //     if (is_weixn()) {
    //         wx.ready(function() {
    //             alert('执行了微信内置方法');
    //             document.getElementById('audio').play();
    //             autoPlayAudioWx();
    //         });
    //     } else {
    //         document.getElementById("audio").play();
    //     }

    // function is_weixn() {
    //     var ua = navigator.userAgent.toLowerCase();
    //     if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // function autoPlayAudioWx() {
    //     wx.ready(function() {
    //       alert('执行了微信内置方法');
    //         document.getElementById('audio').play();
    //     });
    // }

    // let share_config = {   //"https://xuenong.b0.upaiyun.com/test/a8b1288c20134b139c316bbce63754c1.png"
    //   title: "天天学农-专注果蔬农技知识服务", // 分享标题
    //   desc: "全行业最资深的农技专家、种植达人正在这里做分享", // 分享描述
    //   link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: https://xuenong.b0.upaiyun.com/test/a8b1288c20134b139c316bbce63754c1.png, // 分享图标
    //   type: "link", // 分享类型,music、video或link，不填默认为link
    //   success: function() {
    //     // 用户确认分享后执行的回调函数
    //     alert(JSON.stringify(share_config));
    //   },
    //   cancel: function() {
    //     alert("分享失败");
    //     // 用户取消分享后执行的回调函数
    //   }
    // };
    // this.getCode('wx6ac600e470dcd35c');

    // console.log(window.location.href.split("#")[0]);

    // let data = {
    //   tel: "18070254260"
    // };
    // this.$post("login/sendLoginVcode", data).then(res => {
    //   console.log(res);
    // });

    // 不会触发，原因可能是没有ready函数
    // wx.getNetworkType({
    //   success: function(res) {
    //     var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
    //     console.log(res);
    //   }
    // });
  },
  methods: {
    // 点击能够触发  选择图片或拍照
    getNet() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

          this.imgSrc = localIds; //绑定页面的img标签的src属性，就可以展示自己选择的图片
          // alert()
        }
      });
    },
    dd() {
      var img = this.$refs.loadImg;
      img.crossOrigin = "Anonymous";
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);

      canvas.toBlob(function(data) {
        var blob = data;
        var formData = new FormData();
        formData.append("img", blob);
        formData.append("token", window.localStorage.getItem("token"));
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/proxy/wechat/user/updUser");
        xhr.onload = function(data) {
          if (xhr.status === 200) {
            alert("上传成功");
          }
        };
        xhr.send(formData);
      }, "image/png");
    },
    open() {
      this.flag = true;
    },
    kk() {
      this.flag = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  .comment-wrap {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 2;
    .comment-area {
      box-sizing: border-box;
      padding: 0.333333rem 0.346667rem 0.346667rem;
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
        margin-top: 0.2rem;
        width: 2rem;
        font-size: 0.3rem;
        color: #fff;
        line-height: 2.4;
        align-self: flex-end;
        background: #ff6a11;
        outline: none;
        border: none;
        border-radius: 6px;
        // padding-bottom: .2rem;
      }
    }
  }

  // 评论
  .comment-list {
    padding: 0 0.346667rem;

    height: 600px;
    overflow: auto;
    .noComment {
      height: 8rem;
      .commentContent {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 1.333333rem;
        .commentImg {
          width: 2.08rem;
          height: 2.08rem;
          img {
            height: 100%;
            width: 100%;
            display: block;
          }
        }
      }
      span {
        font-size: 14px;
        color: #666;
      }
    }
    li {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #e4e4e4;
      padding: 0.32rem 0;
      .commentUser-info {
        margin-bottom: 0.293333rem;
        display: flex;
        .commentUser-img {
          width: 1.066667rem;
          height: 1.066667rem;
          img {
            border-radius: 50%;
            display: block;
            height: 100%;
            width: 100%;
          }
        }
        .commentUser-name {
          box-sizing: border-box;
          padding-top: 4px;
          margin-left: 0.4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          span.username {
            font-size: 14px;
            font-weight: 500;
            color: #333;
          }
          span.time {
            font-size: 12px;
            font-weight: 500;
            color: #7d7d7d;
          }
        }
      }
      .comment-content {
        font-size: 14px;
        font-weight: 500;
        color: #777;
        line-height: 1.2;
        letter-spacing: -0.6px;
      }
    }
  }
}

.mu-bottom-sheet.share {
  .mu-sub-header.title {
    padding: 0;
    font-size: 16px;
    color: #272727;
    text-align: center;
  }
  .share-icons {
    margin-top: 0.266667rem;
    padding: 0 0.533333rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icons {
      text-align: center;
      img {
        display: block;
        width: 1.413333rem;
        height: 1.413333rem;
        border: none;
      }
    }
    .icon-text {
      font-size: 14px;
      color: #bbb;
    }
  }
  .cancle {
    font-size: 16px;
    color: #777;
    line-height: 3.5;
    text-align: center;
    margin-top: 0.72rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  animation: slideUp 1s ease;
}

.fade-enter,
.fade-leave-active {
  animation: slideDown 1s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slideDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
