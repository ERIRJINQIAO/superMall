<template>
  <div>
    <ul class="recommendList">
      <li v-for="item in recommendList" :key = "item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
          <h3>{{ item.title }}</h3>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Recommend",
  props: {
    recommendList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style>
.recommendList {
  display: flex;
  justify-content: space-between;
  padding: 15px 0 30px;
  text-align: center;
}
.recommendList  li {
  list-style: none;
}
.recommendList  li a{
  display: block;
  margin: 0 5px;
}
.recommendList  li a img{
  max-width: 100%;
  margin-bottom: 6px;
}
.recommendList  li a  h3 {
  font-size: 13px;
  color: #000;
  font-weight: 400;
}
</style>