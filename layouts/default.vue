<template>
  <div>
    <div class="main-content">
      <div class="container is-max-widescreen">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
:root {
  --main-color: #ff7e82;
  --main-dark-color: #484848;
}

.main-content {
  padding: 50px 0;
  font-family: sans-serif;
}

button {
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
}

.field textarea {
  resize: none;
}

::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
