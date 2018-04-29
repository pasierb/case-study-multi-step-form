<template>
<div>
    <form @submit.prevent="onSubmit">
        <div class="field">
            <label class="label" for="firstName">Firstname:</label>
            <div class="control">
                <input class="input" name="firstName" v-model="userInfo.firstName" type="text" />
            </div>
        </div>
        <div class="field">
            <label class="label" for="lastName">Lastname:</label>
            <div class="control">
                <input class="input" name="lastName" v-model="userInfo.lastName" type="text" />
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
import { SET_USER_INFO } from '../../../stateMachines/transitions';

export default {
    props: {
        done: { type: Function, required: true },
        userInfo: { type: Object, required: true }
    },
    methods: {
        onSubmit() {
            return this.done(SET_USER_INFO, this.userInfo);
        }
    }
}
</script>
