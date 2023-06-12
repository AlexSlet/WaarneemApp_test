<template>
  <h2 class="main-title">
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: 'MainTitle',
}
</script>

<style scoped lang="scss">
.main-title {
  font-size: 36px;
  font-weight: 900;
  position: relative;
  letter-spacing: 0.05em;
  line-height: 42px;
  margin-bottom: 50px;
}
</style>
