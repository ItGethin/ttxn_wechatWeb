<template>
  <div class="myPlayed">
    <top-head :title="title" :isNav="isNav"></top-head>
    <transition v-if="playedList.length">
      <div class="played-list">
        <div class="played today" v-if="playedLists.today.length">
          <h3 class="time">今天</h3>
          <ul class="played-list">
            <router-link v-for="(item, index) in playedLists.today" :key="index" tag="li" :to="`/course/${item.id}`">
              <div class="played-info">
                  <i class="iconfont icon--bofang4 playedIcon"></i>
                  <div class="played-information">
                      <div class="title">{{item.NAME}}：{{item.audio_title}}</div>
                      <div class="times">
                          <span class="duration">时长 <em>{{item.duration|duration}}</em></span>
                          <span class="progress">播放至<em>{{item.play_duration|setProgress(item.duration)}}</em></span>
                      </div>
                  </div>
              </div>
            </router-link>
          </ul>
        </div>

        <div class="bgColor" style="height: .26667rem; backgroundColor: #eee"></div>
        <div class="played yesterday" v-if="playedLists.yesterday.length">
            <h3 class="time">昨天</h3>
            <ul class="played-list">
                <router-link v-for="(item, index) in playedLists.yesterday" :key="index" tag="li" :to="`/course/${item.id}`">
                  <div class="played-info">
                      <i class="iconfont icon--bofang4 playedIcon"></i>
                      <div class="played-information">
                          <div class="title">{{item.NAME}}：{{item.audio_title}}</div>
                          <div class="times">
                              <span class="duration">时长 <em>{{item.duration|duration}}</em></span>
                              <span class="progress">播放至<em>{{item.play_duration|setProgress(item.duration)}}</em></span>
                          </div>
                      </div>
                  </div>
                </router-link>
            </ul>
        </div>
        <div class="bgColor" style="height: .26667rem; backgroundColor: #eee"></div>
        <div class="played earlier" v-if="playedLists.earlier.length">
          <h3 class="time">更早</h3>
          <ul class="played-list">
                <router-link v-for="(item, index) in playedLists.earlier" :key="index" tag="li" :to="`/course/${item.id}`">
                  <div class="played-info">
                      <i class="iconfont icon--bofang4 playedIcon"></i>
                      <div class="played-information">
                          <div class="title">{{item.NAME}}：{{item.audio_title}}</div>
                          <div class="times">
                              <span class="duration">时长 <em>{{item.duration|duration}}</em></span>
                              <span class="progress">播放至<em>{{item.play_duration|setProgress(item.duration)}}</em></span>
                          </div>
                      </div>
                  </div>
                </router-link>
            </ul>
        </div>
      </div>
    </transition>  
    
    <no-record v-if="!playedList.length" :title="title"></no-record>
  </div>
</template>
<script>
import TopHead from "components/Header";
import NoRecord from "components/NoRecord";
import Time from "config/time";
export default {
  data() {
    return {
      title: "播放记录",
      isNav: true,
      sharePopup: false,
      playedList: [],
      playedLists: {
        today: [],
        yesterday: [],
        earlier: []
      }
    };
  },
  components: {
    TopHead,
    NoRecord
  },
  filters: {
    duration(value) {
      return Time.sConversionTime(value);
    },
    setProgress(value, state1) {
      if (value === state1) {
        return "已播完";
      } else {
        return Math.ceil(value / state1 * 100) + "%";
      }
    }
  },
  computed: {},
  methods: {
    getPlayed() {
      this.$get("play/getPlayRecordList", {
        token: localStorage.getItem("token"),
        pageSize: 10,
        pageNum: 1
      })
        .then(res => {
          if (res.resultCode === 0) {
            this.playedList = res.data.list.list;
            res.data.list.list.filter((item, index, arr) => {
              switch (Time.getTimeState(item.play_date)) {
                case "今天":
                  this.playedLists.today.push(item);
                  break;
                case "昨天":
                  this.playedLists.yesterday.push(item);
                  break;
                case "更早":
                  this.playedLists.earlier.push(item);
                  break;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getPlayed();
  }
};
</script>
<style lang="scss" scoped>
.myPlayed {
  // height: 100%;
  padding-top: 1.173333rem;
  // background: #eee;
  .played-list {
    .played {
      background: #fff;
      // margin-bottom: 0.266667rem;
      .time {
        font-size: 16px;
        padding-top: 0.4rem;
        padding-left: 0.346667rem;
      }
      .played-list {
        padding-top: 0.2rem;
        li + li {
          border-top: 1px solid #dcdcdc;
        }
        li {
          color: #7d7d7d;
          padding: 0.4rem 0.666667rem 0.4rem 0.346667rem;

          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .played-info {
            display: flex;
            i.playedIcon {
              font-size: 24px;
            }
            .played-information {
              margin-left: 0.373333rem;
              .title {
                font-size: 16px;
                color: #000;
                line-height: 1.5;
                margin-bottom: 0.4rem;
              }
              .times {
                font-size: 12px;
                span.duration {
                  margin-right: 0.733333rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>


