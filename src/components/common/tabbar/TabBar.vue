<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabBar",
};
</script>
<style>
#tab-bar {
  height: 49px;
  background: #fff;
  box-shadow: 4px 4px 6px 6px #000;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
}
</style>