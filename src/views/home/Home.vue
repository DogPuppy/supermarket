<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="mid">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','样式']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control :titles="['流行','新款','样式']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"

  import HomeSwiper from "./childComps/HomeSwiper"
  import HomeRecommendView from "./childComps/HomeRecommendView"
  import HomeFeatureView from "./childComps/HomeFeatureView"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"


  import { getHomeMultidata, getHomeGoods } from "network/home"
  import { debounce } from "common/utils"
  import {itemListenerMixin,backTopMixin} from "common/mixin"
  import {BACK_POSITION} from "common/const"

  export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          "pop": { page: 0, list: [] },
          "new": { page: 0, list: [] },
          "sell": { page: 0, list: [] },
        },
        currentType: "pop",
        tabOffsetTop: 0,
        isTabFixed: false

      }
    },
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      GoodsList,
      Scroll

    },
    methods: {
      /* 网络请求 */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      },
      /* 事件监听 */
      tabClick(index) {
        switch (index) {
          case 0: this.currentType = "pop"; break;
          case 1: this.currentType = "new"; break;
          case 2: this.currentType = "sell"; break;
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > BACK_POSITION
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")

    },
    mixins:[itemListenerMixin,backTopMixin],
    deactivated(){
      this.$bus.$off("itemImageLoad",this.itemImgListener)
    }
  }
</script>

<style scoped>
  .height
  {
  height:
  500px;
  width:
  100%;
  }
  #home
  {
  height:
  100vh;
  position:
  relative;
  }
  .tab-control{
    position: relative;
    z-index: 999;
  }
  .home-nav
  {
  background-color:
  var(--color-tint);
  box-shadow: none;
  color: #fff;

  }
  .content
  {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>