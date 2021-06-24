<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="图片">
  </div>
</template>

<script>
  export default {
    name: '',
    components: {},
    props: {
      isChecked:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style scoped>
  .check-button{
    border-radius: 50%; 
    border: 2px solid #aaa;
  }
  .check{
    background-color: red;
    border-color: red;
  }
</style>