<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="mid">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartList from "./childComps/CartList"
  import CartBottomBar from "./childComps/CartBottomBar"


  import { mapGetters } from "vuex"

  export default {
    name: 'Cart',
    data() {
      return {}
    },
    methods: {},
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({length:"cartLength"})
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
  background-color:
  var(--color-tint);
  color:
  white;
  }
</style>