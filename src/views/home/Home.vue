<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <home-swiper :banners = "banners"/>
    <recommend :recommendList = "recommend"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from './childComps/Recommend'
import { getMultiData } from "network/home";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    Recommend
  },
  data() {
    return {
       banners: [],
       recommend: [],
     
    }
  },
  created() {
    getMultiData().then((res) => {
      this.banners = res.data.banner.list;
      this.recommend = res.data.recommend.list;
    });
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
