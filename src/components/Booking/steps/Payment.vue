<template>
<div>
    <form @submit.prevent="onSubmit">
        <button type="submit">Pay</button>
    </form>
</div>
</template>

<script>
import { PAY } from '../../../stateMachines/transitions';
export default {
    props: {
        done: { type: Function, required: true }
    },
    methods: {
        onSubmit() {
            return this.done(PAY);
        }
    }
}
</script>
