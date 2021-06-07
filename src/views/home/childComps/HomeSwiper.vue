<template>
  <swiper v-if="banners.length">
    <swiper-item v-for="item in banners" :key="item.id" ref="swiper">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>




<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return {
          isload: false, //限制只需要等一张banner图加载完成后开始计算首页tab与顶部的距离
        };
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    swiperImgLoad() {
      if (!this.isload) {
        this.$emit("swiperImgLoad");
        this.isload = true;
      }
    },
  },
};
</script>