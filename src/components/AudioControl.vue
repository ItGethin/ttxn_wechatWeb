<template>
      <div class="audio_control"><!--class="hiden"  -->
        <audio id="audio" class="hiden" controls :src="audioInfo.url" ref="player" autoplay @waiting="isLoadAudio1" @canplay="isLoadAudio2" @seeked="jumped" @timeupdate="timeupdate" @ended="endPlay"></audio>  
            <div class="loadAudio" ref="loadAudio" v-show="loadAudio">
              <div class="loadImg">
                <img src="../assets/images/loadImg.gif" alt="">
              </div>
              <div class="loadText">加载中……</div>
            </div>
            <div class="play">
                <!-- 播放状态 -->
                <div class="play-text" v-show="!loadAudio && playState">
                    <h3>{{audioInfo.title}}</h3>
                    <div class="isPlay">
                        <em class="playText">正在播放</em>
                        <em class="playImg"><img src="https://ttxuenong.oss-cn-shenzhen.aliyuncs.com/static/img/applet/9c81a4b3ca7b4ab4a001c8c571d2c64e.gif" alt=""></em>
                    </div>
                </div>
                <!-- 暂停状态 -->
                <div class="play-pause" v-show="!loadAudio && !playState">
                    <i class="iconfont icon--bofang3"  @click.stop="playToggle"></i>
                </div>
                  <!-- 音频控件 -->
                  <div class="audio_btn">
                    <!-- 单个音频 -->
                    <div class="single-audio" v-if="$store.state.audioList.length===1">
                        <i class="iconfont icon--zanting_" @click.stop="playToggle" v-if="playState"></i>
                        <i class="iconfont icon--bofang" @click.stop="playToggle" v-else></i>
                        <span>{{currentTime| getTime}}</span>
                        <div class="progress-bar-wrapper">
                          <my-progress-bar :percent="percent" @percentChange="percentChange" @sliderBegin="sliderBegin"></my-progress-bar>
                        </div>
                        <span> {{audioInfo.duration| getTime}}</span>
                    </div> 
                    <!-- 音频列表 -->
                    <div class="audios" v-else>
                        <div class="progress-bar-wrapper">
                          <my-progress-bar :percent="percent" @percentChange="percentChange" @sliderBegin="sliderBegin"></my-progress-bar>
                        </div>
                        <div class="audio-btn">
                            <div class="left-btn">
                                <i class="iconfont icon--zanting_" @click.stop="playToggle" v-if="playState"></i>
                                <i class="iconfont icon--bofang" @click.stop="playToggle" v-else></i>
                                <i class="iconfont icon--xiaji" @click.stop="nextPlay"></i>
                                <span>{{currentTime| getTime}} / {{audioInfo.duration| getTime}}</span>
                            </div>
                            <!-- 选集 -->
                            <div class="bottom_sheet">
                              <span @click="openBottomSheet">列表</span>
                              <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
                                <mu-list @itemClick="closeBottomSheet">
                                  <mu-sub-header>列表</mu-sub-header>
                                  <div class="list">
                                    <mu-list-item v-for="(item, index) in audioList" :key="index" :class="{'activeList':index===audioIndex}" @click="changeAudioId(index)">
                                        {{(index+1)}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.title}}
                                    </mu-list-item>
                                  </div>
                                  <div class="cancle" @click="closeBottomSheet">取消</div>
                                </mu-list>
                              </mu-bottom-sheet>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>  
</template>
<script>
import Time from "config/time";
import { mapGetters } from "vuex";
import MyProgressBar from "components/MyProgressBar";
export default {
  data() {
    return {
      audioInfo: {},
      beginTime: 0,
      currentTime: 0,
      learnTime: 0,
      loadAudio: false,
      // playState: true,
      bottomSheet: false
    };
  },
  props: ["courseId"],
  components: {
    MyProgressBar
  },
  filters: {
    getTime(value) {
      return Time.sConversionTime(value);
    }
  },
  computed: {
    ...mapGetters(["audioId", "audioIndex", "audioList", "playState"]),
    percent() {
      return this.currentTime / this.audioInfo.duration;
    }
  },
  watch: {
    "$store.state.audioIndex"(val, oldval) {
      // 最后一首之后的循环播放
      this.listPlay(this.audioId);
      // this.beginTime = this.learnTime = 0;
    }
  },
  mounted() {
    if (
      localStorage.getItem("playRecord") &&
      this.$route.query.audioId ===
        JSON.parse(localStorage.getItem("playRecord")).audioId
    ) {
      const audio = this.$refs.player;
      this.currentTime = JSON.parse(localStorage.getItem("playRecord"))
        ? JSON.parse(localStorage.getItem("playRecord")).duration
        : 0;
      audio.currentTime = this.currentTime;
      this.beginTime = this.currentTime;
    }

    this.getAudioUrl(this.$route.query.audioId, this.$route.query.courseId)
      .then(res => {
        // console.log(res);
        this.audioInfo = {
          title: res.data.audioInfo.title,
          duration: res.data.audioInfo.duration,
          id: res.data.audioInfo.id,
          url: res.data.audioInfo.url
        };

        if (this.is_iphone()) {
          wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            appId: "",
            timestamp: 1,
            nonceStr: "",
            signature: "",
            jsApiList: []
          });
          wx.ready(() => {
            if(this.$refs.player.paused) {
              this.$store.commit("PlayState", false);
            } else {
              this.$store.commit("PlayState", true);
            }
          });
        } else {
          this.$store.commit("PlayState", true);
        }
      })
      .catch(err => {
        console.log(err);
      });

    // this.loadAudio();
    // console.log('进入该页面的beginTime',this.beginTime);
  },
  methods: {
    // 判断是否是ios
    is_iphone() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //判断iPhone|iPad|iPod|iOS
        //alert(navigator.userAgent);
        // console.log("iPhone.html");
        return true;
      } else if (/(Android)/i.test(navigator.userAgent)) {
        //判断Android
        //alert(navigator.userAgent);
        // console.log("Android.html");
        return false;
      } else {
        //pc
        // console.log("pc.html");
        return false;
      }
    },
    // 执行ready方法
    readyMethods() {
      wx.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: "",
        timestamp: 1,
        nonceStr: "",
        signature: "",
        jsApiList: []
      });
      wx.ready(() => {
        alert(document.getElementById("audio").paused);
        this.$refs.player.play();
        document.getElementById("audio").play();
        alert(this.$refs.player.paused);
        this.$refs.player.play();
      });
    },
    // 获取音频的url地址
    getAudioUrl(audioId, courseId) {
      return this.$get(`audio/getAudioInfoUrl`, {
        id: audioId,
        subjectId: courseId
      });
    },
    //  判断是否失效
    getUrlisExist(audioId, courseId) {
      return this.$get(`audio/getUrlisExist`, {
        id: audioId,
        subjectId: courseId
      });
    },
    percentChange(newPercent) {
      let currentTime = this.audioInfo.duration * newPercent;
      this.$refs.player.currentTime = currentTime;
    },
    // 列表播放
    changeAudioId(val) {
      this.postPlayRecord();
      this.$store.commit("AudioIndex", val);
      // this.listPlay(this.audioId);
    },
    timeupdate() {
      const audio = this.$refs.player;
      this.currentTime = Math.floor(audio.currentTime);
      // console.log(audio.currentTime);
    },
    sliderBegin() {
      /*
        ** 开始滑动,记录开始滑动之前的播放的学习时长
        ** 统计学习时长,进行累加
      */
      const audio = this.$refs.player;
      // console.log('拖动之前的beginTime', this.beginTime);
      this.learnTime += Math.ceil(audio.currentTime) - this.beginTime;
      // console.log(audio.currentTime,this.learnTime);
      // console.log('拖动之前的learnTime',this.learnTime);
    },
    // jumping() {  // 开始拖动点
    //   /*
    //     ** 结束时间
    //     ** 统计学习时长,进行累加
    //   */
    //   // console.log('拖动开始');
    //   const audio = this.$refs.player;
    //   this.learnTime += (Math.ceil(audio.currentTime) - this.beginTime);
    //   console.log(audio.currentTime);
    // },
    jumped() {
      // 结束拖动点
      /*
      ** 开始时间
      ** 改变开始时间点
    */
      // console.log('拖动结束点');
      const audio = this.$refs.player;
      this.beginTime = Math.ceil(audio.currentTime);
      // console.log('拖动结束的beginTime',this.beginTime);
      // console.log(audio.currentTime);
    },
    //  切换播放状态
    playToggle() {
      let audio = this.$refs.player;
      if (audio.paused) {
        audio.play();
        // this.playState = true;
        this.$store.commit("PlayState", true);
      } else {
        audio.pause();
        // this.playState = false;
        this.$store.commit("PlayState", false);
      }
    },
    // 点击播放下一首
    nextPlay() {
      const audio = this.$refs.player;
      this.postPlayRecord();
      if (
        this.$store.state.audioIndex <
        this.$store.state.audioList.length - 1
      ) {
        // console.log("进入播放");
        // 获取该下标的audioId
        this.$store.commit("AudioIndex", this.$store.state.audioIndex + 1);
        // 判断音频是否失效
        // this.getUrlisExist(this.audioId, this.courseId).then(res2 => {
        //   // console.log(res2);
        //   if (res2.data.audioInfo.state === 0) {
        //     alert("该音频已失效");
        //     // 告诉父组件 弹窗  并且暂停播放
        //     // this.$emit("openInvalid", true);
        //   } else {
        //     this.beginTime = this.learnTime = 0;
        //     this.getAudioUrl(this.audioId, this.courseId)
        //       .then(res => {
        //         this.audioInfo = {
        //           title: res.data.audioInfo.title,
        //           duration: res.data.audioInfo.duration,
        //           id: res.data.audioInfo.id,
        //           url: res.data.audioInfo.url
        //         };
        //         this.playState = true;
        //       })
        //       .catch(err => {
        //         console.log(err);
        //       });
        //   }
        // });
      } else {
        // console.log("最后一首");
        this.$refs.player.pause();
        // this.playState = false;
        this.$store.commit("PlayState", false);
        this.$emit("sendMessage", true);
      }
    },
    endPlay() {
      const audio = this.$refs.player;
      // console.log('我播完了');

      //  本集播放结束  显示音频的总时长
      this.currentTime = this.audioInfo.duration;
      this.nextPlay();
    },
    // 列表播放
    listPlay(id) {
      this.getUrlisExist(this.audioId, this.courseId)
        .then(res2 => {
          // 判断音频是否失效
          if (res2.data.audioInfo.state === 0) {
            alert("该音频已失效");
            // 告诉父组件 弹窗  并且暂停播放
            // this.$emit("openInvalid", true);
          } else {
            this.beginTime = this.learnTime = 0;
            this.getAudioUrl(this.audioId, this.courseId)
              .then(res => {
                this.audioInfo = {
                  title: res.data.audioInfo.title,
                  duration: res.data.audioInfo.duration,
                  id: res.data.audioInfo.id,
                  url: res.data.audioInfo.url
                };
                // this.playState = true;
                this.$store.commit("PlayState", true);
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    isLoadAudio1() {
      // 缓存中
      this.loadAudio = true;
    },
    isLoadAudio2() {
      // 缓存完成
      this.loadAudio = false;
    },
    // 打开底部弹窗
    openBottomSheet() {
      this.bottomSheet = true;
    },
    closeBottomSheet(reason) {
      this.bottomSheet = false;
      if (reason == "overlay") {
        this.bottomSheet = false;
      }
    },
    // 存取用户的播放记录 存储到本地
    setPlayRecord() {
      const audio = this.$refs.player;
      let currentTime = parseInt(audio.currentTime);
      let playRecord = {
        title: this.audioInfo.title,
        audioId: this.audioId,
        duration: currentTime,
        linkid: this.courseId
      };
      // 保存到本地
      window.localStorage.setItem("playRecord", JSON.stringify(playRecord));
    },
    postPlayRecord() {
      const audio = this.$refs.player;
      // console.log('提交之前的currentTime',this.currentTime);
      // console.log('提交之前的beginTime',this.beginTime)
      let currentTime = this.currentTime;
      this.learnTime += currentTime - this.beginTime;
      // console.log('提交之前的learnTime', this.learnTime);
      let playRecord = {
        audioId: this.audioId,
        duration: currentTime,
        realDur: this.learnTime,
        token: window.localStorage.getItem("token"),
        linkId: this.courseId
      };
      // console.log(playRecord);
      this.$post(`play/getPlayRecordDuration`, playRecord).then(res => {
        if (res.resultCode === 0) {
          console.log("提交成功!!");
        } else {
          console.log("提交失败??");
        }
      });
    }
  },
  beforeDestroy() {
    // this.playState = false;
    this.postPlayRecord();
    this.setPlayRecord();
  },
  destroyed() {}
};
</script>

<style lang="scss">
@import "../assets/css/audioControl.scss";

::-webkit-scrollbar {
  width: 0;
}
// 播放列表样式
.mu-bottom-sheet {
  .mu-list {
    line-height: 2.8;
    > .mu-sub-header {
      font-weight: 800;
      font-size: 16px;
      color: #272727;
      margin: 0;
      padding-left: 0.4rem;
    }
    .list {
      height: 6.666667rem;
      overflow-y: auto;
      div {
        .mu-item-wrapper {
          div {
            .mu-item {
              color: #000;
              border-top: 1px solid #dcdcdc;
              padding: 0 0.4rem;
              .mu-item-content {
                color: #ff500b;
                font-size: 14px;
                color: #272727;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
      .activeList {
        .mu-item-wrapper {
          div {
            .mu-item {
              .mu-item-content {
                color: #ff500b;
              }
            }
          }
        }
      }
    }
    .cancle {
      text-align: center;
      font-size: 0.34rem;
      color: #000;
      font-weight: 800;
      letter-spacing: 0.1rem;
    }
  }
}
</style>

