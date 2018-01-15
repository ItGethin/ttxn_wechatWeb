<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { config } from "config/share";
export default {
  name: "app",
  mounted() {
    const script = document.createElement("script");
    script.src = "https://s19.cnzz.com/z_stat.php?id=1272065574&web_id=1272065574";
    script.language = "JavaScript";
    document.body.appendChild(script);

    // config();

    //  页面唤起
    var hiddenProperty =
      "hidden" in document
        ? "hidden"
        : "webkitHidden" in document
          ? "webkitHidden"
          : "mozHidden" in document ? "mozHidden" : null;
    var visibilityChangeEvent = hiddenProperty.replace(
      /hidden/i,
      "visibilitychange"
    );
    var _that = this;
    var onVisibilityChange = function() {
      if (!document[hiddenProperty]) {
        console.log("页面激活");
        _that.$get("login/refreshToken", {
          token: window.localStorage.getItem("token")
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("页面非激活");
      }
    };
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
  },
  watch: {
    $route() {
      if (window._czc) {
        let location = window.location;
        let contentUrl = location.pathname + location.hash;
        let refererUrl = "/";
        window._czc.push(["_trackPageview", contentUrl, refererUrl]);
      }
    }
  },
  methods: {}
};
</script>

<style>
#app {
  height: 100%;
}
.load .mu-circle-wrapper {
  width: 0.42rem !important;
  height: 0.42rem !important;
  z-index: 1;
}
.load .mu-circle-clipper .mu-circle {
  border-color: #999999;
  z-index: 1;
}
.load .mu-infinite-scroll-text {
  font-size: 0.32rem !important;
  color: #999999;
  z-index: 1;
}
.load {
  padding-bottom: 50px !important;
}
</style>
