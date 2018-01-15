<template>
  <div class="noRecord">
      <img src="../assets/images/norecord.png" alt="">
      <span class="noRecordText">暂无{{title}}</span>
  </div>
</template>

<script>
export default {
  data() {
      return {}
  },
  props: {
      title: {
          type: String,
          default: ''
      }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
    .noRecord {
        height: 100%;
        padding-top: 4.8rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      img {
          width: 1.866667rem;
          height: 1.866667rem;
      }
      .noRecordText {
          font-size: 14px;
          margin-top: .266667rem;
      }
    }
</style>

