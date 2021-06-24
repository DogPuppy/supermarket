<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    components: {},
    props: {},
    data() {
      return {
        message: "",
        isShow:false
      }
    },
    methods: {
      show(message, duration=1000) {
        console.log(this.message,this.isShow);
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.message = ""
          this.isShow = false
        }, duration)
      }
    },
  }
</script>

<style scoped>
  .toast
  {
  position:
  fixed;
  top:
  50%;
  left:
  50%;
  color:
  white;
  padding:
  8px
  10px;
  transform:
  translate(-50%,
  -50%);
  background-color:
  rgba(0,
  0,
  0,
  .7);
  z-index:
  999;
  border-radius: 10px;
  }
</style>