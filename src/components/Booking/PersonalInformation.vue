<template>
<div>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label class="label" for="firstName">Name</label>
            <div class="control">
                <input class="input" name="firstName" v-model="userInfo.firstName" type="text" />
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" type="submit">Submit</button>
            </div>
        </div>
    </form>
</div>  
</template>

<script>
import { NEXT } from '../../stateMachines/transitions';

export default {
    props: {
        done: { type: Function, required: true },
        userInfo: { type: Object, default: () => ({}) }
    },
    methods: {
        onSubmit() {
            return this.done(NEXT, this.userInfo);
        }
    }
}
</script>
