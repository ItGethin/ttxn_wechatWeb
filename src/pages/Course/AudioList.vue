<template>
  <div class="audio-list">
      <top-head :title="title" :isNav="isNav"></top-head>
      <div class="banner" :style="styleObject">

          <div class="bgColor"></div>
            <!-- @sendMessage="open" @openInvalid="openInvalid" -->
          <audio-control ref="audioControl" @sendMessage="openLast" :courseId="courseId"></audio-control>
          
      </div>
      <div class="audio-infos">
          <div class="audio-infos-title">
              <h3>{{audioDetails.title}}</h3>
              <span class="audio-info">
                <em>{{audioDetails.updatetime|getUpdateTime}}</em>
                <em>{{audioDetails.teacherName}}</em>
                <em>{{audioDetails.times}}人已学</em>
              </span>
          </div>
          <div class="audio-info-content" v-html="audioDetails.content">
          </div>
      </div>

      <!-- <mu-dialog :open="dialogLast" dialogClass="dialogLast" @close="closeLast">
          已经是最后一首了!
        <mu-flat-button label="确定" slot="actions" primary @click="closeLast"/>
      </mu-dialog> -->

      <dialog-component :flag="dialogLast" sureText="再次播放" cancleText="我知道了" @close="closeLast">
        <p>您已学完本课程</p>
      </dialog-component>
  </div>
</template>

<script>
import Time from "config/time";
import Data from "config/url";
import {mapGetters} from 'vuex';
import TopHead from 'components/Header';
import AudioControl from "components/AudioControl";
import DialogComponent from "components/Dialog";
export default {
  data() {
    return {
      title: '音频详情',
      isNav: true,
      styleObject: {},
      audioDetails: {},
      dialogLast: false
    };
  },
  components: {
    TopHead,
    AudioControl,
    DialogComponent
  },
  computed: {
    ...mapGetters([
      "audioId"
    ]),
    courseId() {
      return this.$route.query.courseId;
    }
  },
  filters: {
    getUpdateTime(val) {
      return Time.getUpdateTime(val);
    }
  },
  watch: {
    "$store.state.audioIndex"(val, oldval) {
      // console.log(this.audioId);
      this.getAudioDetails(this.audioId);
    }
  },
  mounted() {
    this.getAudioDetails(this.$route.query.audioId);

    // 监听页面的滚动事件
    // window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    openLast() {
      this.dialogLast = true;
    },
    closeLast(value) {
      this.dialogLast = false;
      if(value) {
        this.$store.commit("AudioIndex", 0);
        this.$refs.audioControl.$refs.player.play();
        this.$store.commit("PlayState", true);
      }
    },
    // 获取音频详情信息
    getAudioDetails(id) {
      this.$get(`audio/getAudioDetails`, {id: id,subjectId: this.courseId})
        .then(res => {
          // console.log(res);
          this.styleObject = {
            backgroundImage: "url(" + res.data.audioDetails.app_l_img + ")",
            backgroundSize: "100% 100%"
          };
          this.audioDetails = {
            title: res.data.audioDetails.title,
            updatetime: res.data.audioDetails.up_time,
            times: res.data.audioDetails.times,
            content: res.data.audioDetails.content,
            teacherName: res.data.audioDetails.name
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  beforeDestroy() {},
  destroyed() {}
};
</script>

<style lang="scss">

.audio-list {
  background: #eee;
  .banner {
    width: 100%;
    height: 5.6rem;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 1.173333rem;
    left: 0;
    // z-index: 999;
    .bgColor {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5.6rem;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1;
    }
  }
  .audio-infos {
    // margin-top: 6.773333rem;
    background: #fff;
    padding: 6.773333rem 0.346667rem 0;
    .audio-infos-title {
      padding-top: .133333rem;
      h3 {
        font-size: 16px;
        color: #252525;
        line-height: 2;

        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .audio-info {
        display: flex;
        padding-top: 0.08rem;
        em {
          display: inline-block;
          font-size: 12px;
          color: #bbb;
          margin-right: 0.48rem;
        }
      }
    }
    .audio-info-content {
      margin-top: 0.773333rem;

      font-size: 16px;
      font-weight: 500;
      color: #000;
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
  }
}

.mu-dialog-wrapper {
  .netDialog {
    position: relative;
    .cancle {
      position: absolute;
      bottom: -1.4rem;
      left: 50%;
      transform: translate(-50%, 0);
      cursor: pointer;
      i {
        font-size: 0.7rem;
        color: #fff;
      }
    }
    .mu-dialog-title {
      padding: 0.4rem 0 0.32rem;
      font-size: 0.38rem;
      color: #252525;
      font-weight: 500;

      display: flex;
      justify-content: center;
    }
    .mu-dialog-body {
      font-size: 0.28rem;
      font-weight: 500;
      color: #252525;
      line-height: 1.4;
      letter-spacing: 0.6px;
    }
    .mu-dialog-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0;
      .mu-flat-button {
        width: 100%;
        // padding: 0.15rem 0;
        .mu-flat-button-wrapper {
          // width: 100%;

          border-top: 1px solid #dcdcdc;
          .mu-flat-button-label {
            font-size: 0.38rem;
            font-weight: 500;
            color: #252525;
          }
        }
      }
    }
  }
}
.audio-list .audio-infos .audio-info-content img{
		margin-bottom: .2rem!important;
}
.audio-list .audio-infos .audio-info-content span{
/*	display: inline-block;*/
	color:#272727 ;
	margin: .2rem 0!important;
}
.audio-list .audio-infos .audio-info-content strong span{
	color:#272727 ;
	margin: .4rem 0!important;
}
.audio-list .audio-infos .audio-info-content strong{
	color:#272727 ;
}
.audio-list .audio-infos .audio-info-content p{
	line-height: 1.4;
}
</style>

