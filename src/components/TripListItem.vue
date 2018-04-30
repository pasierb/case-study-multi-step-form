<template>
<div class="columns is-mobile is-multiline trip-list-item level">
  <div class="column is-narrow">
    <img :src="logoUrl" class="image" style="width: 80px;" />
  </div>
  <div class="column is-6 is-8-mobile is-4-tablet">
    <div class="columns level is-mobile">
      <div class="column is-narrow">
        <h4 class="title is-4">{{departureTime}}</h4>
        <h5 class="subtitle is-5">{{departure}}</h5>
      </div>
      <div class="column">
        <div class="columns is-mobile level">
          <div class="column">
            <div class="flight-connector"></div>
          </div>
          <div class="column is-narrow has-text-grey-light">
            <i class="fa fa-plane"></i>
          </div>
        </div>
      </div>
      <div class="column is-narrow">
        <h4 class="title is-4">{{landingTime}}</h4>
        <h5 class="subtitle is-5">{{destination}}</h5>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="has-text-right">
      <p class="title is-3">{{price}} CHF</p>
      <slot />
    </div>
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
    departureTime: { type: String, required: true },
    landingTime: { type: String, required: true },
    price: { type: Number, required: true }
  }
}
</script>

<style lang="scss">
.trip-list-item {
  border-bottom: 1px solid #aaa;
  margin-bottom: 10px;
}

.flight-connector {
  border: 1px solid hsl(0, 0%, 71%);
}
</style>
