<template>
  <div class="entry"></div>
</template>
<script>
// function ajax(url, fnSucc) {
//   if (window.XMLHttpRequest) {
//     var oAjax = new XMLHttpRequest();
//   } else {
//     var oAjax = new ActiveXObject("Microsoft.XMLHTTP"); //IE6浏览器创建ajax对象
//   }
//   oAjax.open("GET", url, true); //把要读取的参数的传过来。
//   oAjax.send();
//   oAjax.onreadystatechange = function() {
//     if (oAjax.readyState == 4) {
//       if (oAjax.status == 200) {
//         fnSucc(oAjax.responseText); //成功的时候调用这个方法
//       }
//     }
//   };
// }

// ajax('https://wxtest.ixuenong.com/proxy/wechat/login/auth',function(str) {
//   console.log(str);
// })

export default {
  data() {
    return {};
  },
  mounted() {
    // this.$http
    //   .get(`/login/login`)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    /**
     * 通过hello授权,获取code,在这里存储token
     */
    // this.getUrlStr('code');

    /**
     * 一体
     */
    // this.getCode("wx6ac600e470dcd35c");
    // console.log(this.getUrlStr("code"));
    // console.log(this.getUrlStr("code") === undefined);

    if (this.getUrlStr("code") === undefined) {
      this.getCode("wx6ac600e470dcd35c");
    } else {
      this.getToken(this.getUrlStr("code"));
    }

    // alert(111);

    // let url = `${Data.token}wechat/login/auth?indexPage=${encodeURIComponent('lesson/all')}&loginPage=${encodeURIComponent('login')}`;
    // window.location.href = url;
  },
  methods: {
    getCode(appids) {
      /**
         * 获取微信code
         */
      let appid = appids;
      let href = window.location.href;
      let redirect_uri = encodeURI(href.split("#")[0]);
      redirect_uri = redirect_uri.replace(/&/g, "%26");
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        appid +
        "&redirect_uri=" +
        redirect_uri +
        "&response_type=code&scope=snsapi_userinfo&state=abcdefghigklmnopqrstuvwxyz#wechat_redirect";
    },
    getUrlStr(name) {
      /**
         * 获取地址栏参数
         *
         *
         */
      let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
      if (reg.test(window.location.href)) {
        return unescape(RegExp.$2.replace(/\+/g, " "));
      }
      return undefined;
    },
    getToken(code) {
      this.$get("login/login", {
        code
      })
        .then(res => {
          if (res.resultCode == 0) {
            window.localStorage.setItem("token", res.data.token);
            // this.$router.push("/lesson/all");
            // window.location.href = "https://wxtest.ixuenong.com/?#/lesson/all";  // 测试环境
             window.location.href = "https://wx.ixuenong.com/?#/lesson/all";   //  线上环境
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
