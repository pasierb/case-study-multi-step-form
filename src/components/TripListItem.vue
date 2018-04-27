<template>
<div class="columns is-mobile trip-list-item">
  <div class="column is-one-quarter">
    <img :src="logoUrl" />
  </div>
  <div class="column">
    <h4 class="title is-4">{{departure}} - {{destination}}</h4>
    {{price}}
  </div>
  <div class="column has-text-right">
    <slot />
  </div>
</div>
</template>

<script>
export default {
  props: {
    logoUrl: String,
    id: { type: Number, required: true },
    destination: { type: String, required: true },
    departure: { type: String, required: true },
    price: { type: Number, required: true }
  }
}
</script>

<style lang="scss">
.trip-list-item {
  border-bottom: 1px solid #aaa;
  margin-bottom: 10px;
}
</style>
