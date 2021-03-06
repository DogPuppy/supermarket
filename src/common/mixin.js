import {debounce} from "./utils"
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin={

  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener=()=>{
      refresh()
    }
    this.$bus.$on("itemImgLoad",this.itemImgListener)
  }
}

export const backTopMixin={
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,300)
    },
  },
  components:{
    BackTop
  }
}