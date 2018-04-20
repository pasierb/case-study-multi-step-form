<template>
<div>
    <form @submit.prevent="onSubmit">
        <button type="submit">Pay</button>
    </form>
</div>
</template>

<script>
export default {
    props: {
        done: { type: Function, required: true }
    },
    methods: {
        onSubmit() {
            return this.done();
        }
    }
}
</script>
