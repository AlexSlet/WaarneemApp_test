<template>
  <div>
    <b-button type="is-dark" expanded @click="$emit('onClick')">
      <slot />
    </b-button>
  </div>
</template>
