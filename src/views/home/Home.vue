<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" />
    <recommend :recommendList="recommend" />
    <feature />
    <tab-control />
    <goods-list :goods = 'showGoodsList'/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from "./childComps/Recommend";
import Feature from "./childComps/Feature";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getMultiData, getProductData } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    Feature,
    TabControl,
    GoodsList
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
      currentType: 'pop',
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
      });
    },
  },
  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this._getMultiData();
    this._getProductData('pop');
  },
};
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
}
</style>
