<template>
    <div class="about">
        <top-head :title="title" :isNav="isNav"></top-head>
        <div class="logo">
          <div class="logoImg">
            <img src="../../assets/images/logo.png" alt="">
          </div>
        </div>
        <div class="lists">
            <div class="list telphoto">
                <span class="list-text">客服电话</span>
                <!-- <a class="tel" :href="`tel:${tel}#mp.weixin.qq.com`">{{telPhoto}}</a> -->
                <a class="tel" :href="`tel:${tel}`">{{telPhoto}}</a>
            </div>
            
            	 <router-link to="/user/terms" class="list" tag="div">
                <span class="list-text">服务使用协议</span>
                <i class="iconfont icon--jiantouhui"></i>
                </router-link>
            
        </div>
        <div class="us">
            <span>深圳市天天学农网络科技有限公司</span>
        </div>
    </div>
</template>

<script>
import TopHead from "components/Header";
export default {
  data() {
    return {
      title: "关于我们",
      isNav: true,
      tel: ""
    };
  },
  components: {
    TopHead
  },
  computed: {
    telPhoto() {
      //手机：'12345678901'.replace(/\B(?=(?:\d{4})+$)/g, '-')  '123-4567-8901'

      //价格：'99893'.replace(/\B(?=(?:\d{3})+$)/g, ',')  '99,893'
      return this.tel.replace(/\B(?=(?:\d{4})+$)/g, " ");
    }
  },
  mounted() {
    this.getPhone();
  },
  methods: {
    getPhone() {
      this.$get('tel/list')
        .then(res => {
          this.tel = res.data.appTel.tel;
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.about {
  height: 100%;
  background-color: #f6f6f6;
  .logo {
    padding-top: 1.173333rem;
    height: 7.733333rem;
    background: #eee;

    display: flex;
    justify-content: center;
    align-items: center;
    .logoImg {
      width: 2.133333rem;
      height: 2.133333rem;

      img {
        display: block;
        width: 100%;
        height: 100%;
        border: none;
      }
    }
  }
  .lists {
    padding-left: 0.533333rem;
    background: #fff;

    .list{
     display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 16px;
      color: #777;
      padding: 0.413333rem 0.453333rem 0.44rem 0;
      a{
      	color: #777;    	 
   
     i{
        font-size: 12px;
      }
        } 
    }
    .telphoto {
      border-bottom: 1px solid #e8e8e8;
      padding-right: 0.76rem;
      .tel {
        color: #ff500b;
      }
    }
  }

  .us {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0.666667rem;

    font-size: 14px;
    color: #bbb;
    text-align: center;
  }
}
</style>


