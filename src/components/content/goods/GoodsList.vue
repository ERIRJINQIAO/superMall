<template>
  <div class="goods-List">
    <goods-list-item v-for="item in goods" :key="item.index" :goods-item = 'item' class="item">
    </goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
};
</script>
<style>
  .goods-List {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
    box-sizing: border-box;
    width: 100%;
  }

  .goods-List .item {
    width: 48%;
  }
</style>