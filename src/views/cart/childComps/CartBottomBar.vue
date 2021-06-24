<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
      :is-checked="isSelectAll"
      @click.native="allClick"></check-button>
      <span>全/不选</span>
    </div>
    <div class="total-price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"
  import { mapGetters } from "vuex"

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    props: {},
    data() {
      return {
        
      }
    },
    methods: {
      allClick(){
        if(this.isSelectAll){
          this.cartList.forEach(item=>item.checked=false)
        }else{
          this.cartList.forEach(item=>item.checked=true)
        }
      },
      calcClick(){
        if(this.isSelectAll){
          this
        }
      }
    },
    computed: {
      ...mapGetters(["cartList"]),
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((pre, item) => {
          return pre + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if (this.cartList.length===0) {
          return false
        }
        return !(this.cartList.find(item=>!item.checked))
      }
    }
  }
</script>

<style scoped>
  .bottom-bar
  {
  height:
  40px;
  background-color:
  #eee;
  position:
  relative;
  display:
  flex;
  }
  .check-button
  {
  width:
  22px;
  height:
  22px;
  margin:0
  10px;
  }
  .check-content
  {
  width:
  100px;
  display:
  flex;
  align-items:
  center;
  }
  .total-price
  {
  line-height:
  40px;
  flex:
  1;
  text-align: center;
  }
  .calculate {
  width:
  100px;
  line-height:
  40px;
  margin-right:
  0;
  background-color: red;
  color: #fff;
  text-align: center;
  padding: 0 5px;
  }
</style>