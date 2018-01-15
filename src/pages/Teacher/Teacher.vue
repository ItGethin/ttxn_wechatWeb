<template>
  <div class="wrap">
    <div id="teacher" v-cloak>
        <top-head :title="title" :isNav="isNav"></top-head>
        <div class="banner" :style="styleObject">
            <div class="bgColor"></div>
            <div class="teacher_info">
                <div class="teacher_img">
                    <img :src="details.img" alt="">
                </div>
                <h3>{{details.name}}</h3>
                <span class="teacher-rank">{{details.desc}}</span>
            </div>    
        </div>

        <!-- 讲师简介 -->
        <div class="t_content">
            <p class="teacher_text" v-html="details.content"></p>
        </div>

        <!-- 列表 -->
        <div class="lists">
            <h3 class="list_title">
                讲述课程
            </h3>

            <ul class="list">
                <li v-for="(item, index) in list" :key="index" @click="courseDetails(item.subjectId)">
                    <div class="list_info">
                      <h3>{{item.l_title}}</h3>
                      <div class="list_detials">
                        <span>{{item.create_time | updateTime}}</span>
                        <!-- <span>{{item.duration | getTime}}</span> -->
                        <span>{{item.times}}人学习</span>
                      </div>
                    </div>
                    <div class="list_img">
                      <img v-lazy="item.app_l_img" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>

  <loading v-show="!list.length"></loading>
  </div>
</template>

<script>
import Time from "config/time";
import Loading from "components/Loading";
import TopHead from "components/Header";
import { share } from "config/share";
export default {
  data() {
    return {
      title: "讲师介绍",
      isNav: true,
      styleObject: {},
      details: {},
      list: []
    };
  },
  filters: {
    updateTime(value) {
      return Time.getUpdateTime(value);
    },
    getTime(value) {
      return Time.sConversionTime(value);
    }
  },
  components: {
    Loading,
    TopHead
  },
  mounted() {
    this.$get(`teacher/getTeacherDetails?id=${this.$route.params.id}`)
      .then(res => {
        this.styleObject = {
          backgroundImage: `url(${res.data.details.bg_img})`,
          backgroundSize: "100% 100%"
        };
        this.details = {
          img: res.data.details.img,
          name: res.data.details.name,
          id: res.data.details.id,
          content: res.data.details.content,
          desc: res.data.details.desc
        };

        let share_config = {
          title: this.details.name, // 分享标题
          desc: this.details.desc, // 分享描述
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.details.img, // 分享图标
          type: "link", // 分享类型,music、video或link，不填默认为link
          success: function() {
            // 用户确认分享后执行的回调函数
            console.log("分享成功");
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
            console.log("分享失败");
          }
        };
      // 教师的分享
        share(share_config);

        this.list = res.data.list.list;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    courseDetails(courseId) {
      this.$router.push({ name: "course", params: { id: courseId } });
    }
  }
};
</script>
<style lang="scss">

#teacher {
  padding-top: 1.173333rem;
  background: #eee;
  .banner {
    height: 5.6rem;
    position: relative;

    display: flex;
    flex-direction: column;

    .bgColor {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 5.6rem;

      background: rgba(0, 0, 0, 0.7);
      z-index: 1;
    }
    .teacher_info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 2;
      .teacher_img {
        width: 2.506667rem;
        height: 2.506667rem;
        img {
          box-sizing: border-box;
          display: block;
          width: 100%;
          height: 100%;
          border: 2px solid #fff;
          border-radius: 50%;
        }
      }
      h3 {
        font-size: 16px;
        color: #fff;
        letter-spacing: 0.7px;
        margin: 0.2rem 0;
      }
      .teacher-rank {
        // margin-top: 0.213333rem;
        font-size: 14px;
        color: #ccc;
      }
    }
  }

  .t_content {
 /*   // padding: 0 0.31rem;*/

    .teacher_text {
      box-sizing: border-box;
      // padding: 0 .31rem;
      background: #fff;
      padding: 0.573333rem 0.413333rem 0.746667rem;
      font-size: 14px;
      color: #000;
      font-weight: 500;
      line-height: 1.61;
      letter-spacing: -0.6px;

      margin-bottom: 0.266667rem;

      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
      a {
        text-decoration: none;
        color: #000;
      }
    }
  }
  .lists {
    background: #fff;
    .list_title {
      font-size: 16px;
      line-height: 2.4;
      letter-spacing: -0.6px;
      color: #272727;
      // padding: 0 .34rem;
      margin-left: .34rem;
     
      border-bottom: 1px solid #dcdcdc;
    }
/*    // 列表*/
    .list {
      padding: 0 0.346667rem;
      li {
        padding: 0.4rem 0;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e5e5e5;
        // padding: 0 .3rem;
        .list_info {
          // padding-left: .32rem;
          max-width: 5.333333rem;
          display: flex;
          flex-direction: column;

          justify-content: space-between;
          h3 {
            font-size: 14px;
            color: #272727;
            line-height: 1.4;
/*         //  超出两行 显示省略号*/
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .list_detials {
            display: flex;

            span {
              display: inline-block;
              font-size: 14px;
              color: #7d7d7d;
              margin-right: 0.32rem;
            }
          }
        }
        .list_img {
          width: 3.813333rem;
          height: 2.133333rem;
          img {
            display: block;
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>


