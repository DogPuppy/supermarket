<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="图片">
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
    components: {},
    props: {},
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style scoped>
  .back-top{
    position: fixed;
    right:10px;
    bottom:55px;
  }
  .back-top img{
    width: 45px;
    height: 45px;
  }
</style>