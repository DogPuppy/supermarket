<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: 'Scroll',
    components: {},
    props: {
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        observeDOM: true,
        click: true,
        // observeImage: true
      })
      if(this.probeType===2 ||this.probeType===3){
        this.scroll.on("scroll",(position)=>{
        this.$emit("scroll",position)
      })
      }
      if(this.pullUpLoad){
        this.scroll.on("pullingUp",()=>{
        this.$emit("pullingUp")
      })
      }
      
    }
  }
</script>

<style scoped>
</style>