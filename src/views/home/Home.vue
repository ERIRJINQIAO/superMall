<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isfixed"
      class="tab-control"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImageLoad" />
      <recommend :recommendList="recommend" />
      <feature />
      <tab-control @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoodsList" />
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from "./childComps/Recommend";
import Feature from "./childComps/Feature";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";

import Scroll from "components/common/scroll/Scroll";

import { getMultiData, getProductData } from "network/home";

import { debounce } from "common/until.js";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    Feature,
    TabControl,
    GoodsList,
    BackTop,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: {
          page: 1,
          list: [],
        },
        new: {
          page: 1,
          list: [],
        },
        sell: {
          page: 1,
          list: [],
        },
      },
      currentType: "pop",
      isShowBackTop: false,
      topOffset: 0,
      isfixed: false,
      saveSroll: null,
    };
  },
  methods: {
    _getMultiData() {
      getMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    _getProductData(type) {
      const page = this.goods[type].page;
      getProductData(type, page).then((res) => {
        const newList = res.data.list;
        this.goods[type].list.push(...newList);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //显示与隐藏向上箭头
    contentScroll(position) {
      this.isShowBackTop = -position.y > 400;

      //决定是否吸顶
      this.isfixed = -position.y > this.topOffset;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //上拉加载更多
    loadMore() {
      this._getProductData(this.currentType);
    },
    // swiper图片加载完成后计算tab切换距离顶部的距离
    swiperImageLoad() {
      this.topOffset = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  mounted() {
    //图片完全加载后的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },

  // beforeDestroy(){
  //   console.log("beforeDestroy")
  // },

  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this._getMultiData();
    // 2.请求商品数据
    this._getProductData("pop");
    this._getProductData("new");
    this._getProductData("sell");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveSroll, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    console.log("deactivated");
    this.saveSroll = this.$refs.scroll.getScrollY();
  },
};
</script>
<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 999;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
