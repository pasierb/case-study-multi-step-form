<template>
<div>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label class="label" for="cardNumber">Card number:</label>
            <div class="control">
                <input class="input" name="cardNumber" type="text" />
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" type="submit">Pay!</button>
            </div>
        </div>
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
