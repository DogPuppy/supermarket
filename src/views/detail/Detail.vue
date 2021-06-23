<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <ul>
        <li v-for="item in $store.state.cartList">{{item}}</li>
      </ul>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList"


  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
  import { debounce } from "common/utils"
  import { itemListenerMixin,backTopMixin } from "common/mixin"
  import {BACK_POSITION} from "common/const"

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    props: {},
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0

      }
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],)
      },
      contentScroll(position) {
        const positionY = -position.y
        const length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && ((positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]))) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }

        }
        this.isShowBackTop = (-position.y) > BACK_POSITION
      },
      addToCart(){
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.realPrice
        product.iid=this.iid
        this.$store.dispatch("addCart",product)
      }
    },
    created() {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        this.getThemeTopY = debounce(() => {
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
          this.themeTopYs.push(Number.MAX_VALUE)

        }, 200)
      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mixins: [itemListenerMixin,backTopMixin],
    destoryed() {
      this.$bus.$off("itemImgLoad", this.itemImgListener)
    }

  }
</script>

<style scoped>
  #detail
  {
  position:
  relative;
  z-index:
  999;
  background-color:
  #fff;
  height:
  100vh;
  }
  .content
  {
  height:
  calc(100%
  -
  44px
  -
  49px);
  }
  .detail-nav
  {
  position:
  relative;
  z-index:
  999;
  background-color:
  #fff;
  }
</style>