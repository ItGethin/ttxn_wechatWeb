/*
    微信分享的配置
    @params: share_config

    包含config的配置

*/
import {
  get,
  post
} from './http'


//  分享的默认配置参数
const default_config = {   // 线上环境  https://wx.ixuenong.com
  title: "天天学农-专注果蔬农技知识服务", // 分享标题
  desc: "全行业最资深的农技专家、种植达人正在这里做分享", // 分享描述
  link: "https://wx.ixuenong.com/?#/lesson/all", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: "https://ttxn.oss-cn-shenzhen.aliyuncs.com/static/img/upload/logo.png", // 分享图标
  type: "link", // 分享类型,music、video或link，不填默认为link
  success: function () {
    // 用户确认分享后执行的回调函数
    console.log("分享成功");
  },
  cancel: function () {
    // 用户取消分享后执行的回调函数
    console.log("分享失败");
  }
}

//  分享的接口
export function share(share_config = default_config) {

  //  获取配置信息
  get(`/login/getSignature`, {
      url: window.location.href.split("#")[0]
    })
    .then(res => {
      // console.log(res);
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
            "downloadImage"
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(() => {
          wx.onMenuShareTimeline(share_config); // 分享都朋友圈
          wx.onMenuShareAppMessage(share_config); // 分享给朋友
          wx.onMenuShareQQ(share_config); // 分享到QQ
          wx.onMenuShareQZone(share_config); //分享到QQ空间 


          //   wx.onMenuShareAppMessage({
          //     title: "测试", // 分享标题
          //     desc: "我就看看有没有效果", // 分享描述
          //     link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          //     imgUrl: "https://xuenong.b0.upaiyun.com/test/a8b1288c20134b139c316bbce63754c1.png", // 分享图标
          //     type: "link", // 分享类型,music、video或link，不填默认为link
          //     success: function () {
          //       // 用户确认分享后执行的回调函数
          //       alert("分享成功");
          //     },
          //     cancel: function () {
          //       alert("分享失败");
          //       // 用户取消分享后执行的回调函数
          //     }
          //   });
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};


/*
    config 配置

*/
export function config() {
  get(`/login/getSignature`, {
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
}
