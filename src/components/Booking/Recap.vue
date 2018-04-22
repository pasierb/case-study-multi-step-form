<template>
<div>
    Recap {{selectedTrip}}

    <a @click.prevent="onNext">OK</a>
</div>
</template>

<script>
export default {
    props: {
        done: { type: Function, required: true },
        selectedTrip: { type: Object, required: true },
        selectedExtras: { type: Array, default: () => [] }
    },
    methods: {
        onNext() {
            return this.done();
        }
    }
}
</script>

