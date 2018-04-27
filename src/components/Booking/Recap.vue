<template>
<div>
    <div>
        <TripListItem v-bind="selectedTrip" />
    </div>

    <div>
        <h4 class="title is-4">Selected extras:</h4>
        <div v-for="extra in selectedExtras" :key="extra.id" class="columns">
            <div class="column">
                {{extra.name}}
            </div>
            <div class="column">
                {{extra.price}}
            </div>
        </div>
    </div>

    <div>

    </div>

    <a @click.prevent="onNext" class="button is-link">OK</a>
</div>
</template>

<script>
import TripListItem from '../TripListItem.vue'

export default {
    props: {
        done: { type: Function, required: true },
        selectedTrip: { type: Object, required: true },
        selectedExtras: { type: Array, default: () => [] },
        userInfo: { type: Object, required: true }
    },
    methods: {
        onNext() {
            return this.done();
        }
    },
    components: {
        TripListItem
    }
}
</script>

