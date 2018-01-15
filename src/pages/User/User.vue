<template>
  <router-view></router-view>
</template>
<script>
import {share} from 'config/share'
export default {
  data() {
      return {}
  },
  mounted() {
    share();
  }
}
</script>


