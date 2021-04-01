<template>
  <div class="nav-bar">
    <div class="nav-bar-left"><slot name="left"></slot></div>
    <div class="nav-bar-center"><slot name="center"></slot></div>
    <div class="nav-bar-right"><slot name="right"></slot></div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
};
</script>
<style>
.nav-bar {
  height: 49px;
  display: flex;
  line-height: 49px;
}
.nav-bar .nav-bar-left {
  width: 40px;
}
.nav-bar .nav-bar-right {
  width: 40px;
}
.nav-bar .nav-bar-center {
  flex: 1;
  text-align: center;
  font-size: 18px;
  color: #fff;

}
</style>