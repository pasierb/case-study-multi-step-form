<template>
<div>
    Recap

    <a @click.prevent="onNext">OK</a>
</div>
</template>

<script>
export default {
    props: {
        done: { type: Function, required: true }
    },
    methods: {
        onNext() {
            return this.done();
        }
    }
}
</script>

