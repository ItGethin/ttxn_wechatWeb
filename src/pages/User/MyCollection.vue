<template>
  <div class="mycollection">
      <top-head :title="title" :isNav="isNav"></top-head>
      <ul class="course-list">
          <router-link v-for="(item, index) in collectionList" :key="index" :to="`/course/${item.id}`" tag="li">
              <div class="courseImg">
                <img :src="item.app_l_img" alt="">
              </div>
              <div class="courseInfo">
                  <div class="title" v-text="item.l_title"></div>
                  <div class="info">
                      <div class="information">
                        <span class="taecher" v-text="item.name">武老师</span>
                        <span class="progress">{{item.sumCount|setProgress(item.learnCount)}}</span>
                      </div>
                  </div>
              </div>
          </router-link>
      </ul>

      <no-record v-if="!collectionList.length" title="收藏哦"></no-record>
			<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" :loadingText="loadingText" v-show="shower"  class="load" />
  </div>
</template>
<script>
import TopHead from "components/Header";
import NoRecord from "components/NoRecord";
export default {
  data() {
    return {
      title: "我的收藏",
      isNav: true,
      collectionList: [],
      loadingText:"加载中...",
      timer: false, //定时器
			loading: false,
			scroller: null,
			pageNum:1,
			shower:false,
    };
  },
  components: {
    TopHead,
    NoRecord
  },
  filters: {
    setProgress(value, state1) {
      if (state1 === undefined || state1 === 0) {
        return "未学习";
      } else if (value === state1) {
        return "已学完";
      } else {
        return "已学" + Math.ceil(state1 / value * 100) + "%";
      }
    }
  },
  mounted() {
  	this.scroller = this.$el;
    this.getCollection();
  },
  methods: {
    // 获取收藏列表
    getCollection(){
    	var url="collect/userSubjectCollectList?pageSize=10&pageNum="+this.pageNum;
      this.$get(url, {
        token: window.localStorage.getItem("token"),
      })
        .then(res => {
          console.log(res);
          if (res.resultCode === 0){
            this.collectionList = res.data.userCollect.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
			loadMore:function(){
				if(this.collectionList.length<10){
					this.loading = false;
					this.shower=false;
				}
				else{
			      this.loading = true;
			      this.pageNum+=1;
			      this.shower=true;
			      this.time=setTimeout(() => {
						var url="collect/userSubjectCollectList?pageSize=10&pageNum="+this.pageNum;
						this.$get(url,{
			        token: window.localStorage.getItem("token"),	  			
			  	})
					.then((res)=>{
          if (res.resultCode === 0){
             this.collectionList =  this.collectionList.concat(res.data.userCollect.list);
          }
						var number=Math.ceil((res.data.userCollect.list.length+1)/10);	
						if(this.pageNum > number+1  || number<=1 ){
							 clearTimeout(this.timer)	
							 this.shower=false;
						
							 return;
						}	
							console.log(this.pageNum);
						 	this.loading = false;
					})
					.catch((err)=>{
						console.log(err)
					})
			       
			      },2000);		      			  					
				}  
			}, 
  }
}
</script>
<style lang="scss" scoped>
.mycollection {
  padding-top: 1.173333rem;
  .course-list {
    padding: 0.333333rem 0.346667rem 0;
    li {
      display: flex;
      padding: 0.333333rem 0;
      border-bottom: 1px solid #e5e5e5;
      .courseImg {
        display: block;
        width: 3.34rem;
       /* height: 2.133333rem;*/
        height: 1.866rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border: none;
        }
      }
      .courseInfo {
        flex: 1;
        margin-left: .266667rem;
 /*       // max-width: 5.333333rem;*/
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 16px;
          color: #272727;
        }
        .info {
          display: flex;
          justify-content: space-between;
          .information {
            display: flex;
            font-size: 12px;
            color: #777;
            span {
              margin-right: 0.333333rem;
            }
            span.progress {
              color: #bbb;
            }
          }
          .more {
            font-size: 12px;
          }
        }
      }
    }
  }

}
</style>


