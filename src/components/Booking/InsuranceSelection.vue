<template>
<div>
  <form class="form" @submit.prevent="onSubmit">
    <div class="field" v-for="insurance in insurances" :key="insurance.name">
      <label class="checkbox">
        <input type="checkbox">
        {{insurance.name}}
      </label>
    </div>

    <div class="field">
      <div class="control">
        <button @click="$emit('submit')" class="button is-link">Continue</button>
      </div>
    </div>
  </form>
</div>  
</template>

<script>
export default {
  props: {
    fsm: { type: Object, required: true }
  },
  data() {
    return {
      insurances: this.fsm.data.insurances
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>
