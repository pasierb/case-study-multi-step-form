<template>
<div class="columns is-mobile is-multiline trip-list-item">
  <div class="column is-4-mobile is-3-tablet">
    <img :src="logoUrl" class="image" />
  </div>
  <div class="column is-8-mobile is-6-tablet">
    <h4 class="title is-4">{{departure}} - {{destination}}</h4>
    {{price}}
  </div>
  <div class="column is-12-mobile is-3-tablet">
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
