<template>
  <section class="app-container">
    <div class="app-view">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
.app-container {
  /*50 = navbar  */
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px 10px;
  width: 100%;
  position: relative;
  overflow: hidden;
  .app-view {
    width: 100%;
    height: 100%;
    overflow: hidden auto;
  }
}
.fixed-header+.app-container {
  padding-top: 100px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
