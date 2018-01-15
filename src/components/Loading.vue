<template>
  <div class="loading">
    <div class="meitu">
				<!--<img class="jump" src="../assets/images/Loading.gif" alt="Loading" />-->
				<mt-spinner type="fading-circle" :size="50" color="orangered"></mt-spinner>
				<div class="word">加载中...</div>
				<!--<img class="dian" src="static/images/load-dian.gif" alt="load" />-->
			</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: #fff;
  color: #eee;
  z-index: 999;
  .meitu {
    width: 2.5rem;
    height:2.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -1.25rem;
    margin-top: -1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .jump {
      margin-top: 0.266667rem;
      display: block;
      width: 1.6rem;
      height: 1.6rem;
    }
    .word {
      display: block;
      font-size: 12px;
    /*  color: #999;*/
   		color: orangered;
      margin-top: .133333rem;
      margin-top: .333rem;
    }
    .dian {
      display: inline-block;
      width: 0.16rem;
      height: 0.16rem;
    }
  }
}

</style>