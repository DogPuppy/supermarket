<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="图片">
        <div >{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommendView',
    components: {},
    data() {
      return {}
    },
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {},
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 30px;
    border-bottom: 10px solid rgb(226, 226, 226);
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 80px;
    height: 80px;
    margin: 5px 0;
  }
</style>