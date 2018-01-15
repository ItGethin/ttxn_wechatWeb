<template>
  <mu-dialog :open="flag" @close="close">
    <slot></slot>
    <mu-flat-button class="cancle" slot="actions" @click="close" primary :label="cancleText"/>
    <mu-flat-button class="sure" slot="actions" primary @click="sure" :label="sureText"/>
  </mu-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    sureText: {
      type: String,
      default: "确定"
    },
    cancleText: {
      type: String,
      default: "取消"
    }
  },
  computed: {},
  methods: {
    close() {
      this.$emit("close", false);
    },
    sure() {
      this.$emit("close", true);
    }
  }
};
</script>
<style lang="scss">
.mu-dialog-wrapper {
  .mu-dialog {
    // 里面的内容
    .mu-dialog-body {
      padding: 0.933333rem 0;
      text-align: center;
      p {
        font-size: 16px;
        line-height: 1.6;
        color: #272727;
      }
    }
    // 两个按钮
    .mu-dialog-actions {
      display: flex;
      justify-content: space-between;
      padding: 0;
      button {
        flex: 1;
        height: 48px;
        color: #272727;
        border-top: 1px solid #eee;
        border-right: 1px solid #eee;
      }
      button.sure {
        color: #ff6a11;
        // background-color: red;
      }
    }
  }
}
</style>