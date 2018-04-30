<template>
<div>
    <TripListItem v-bind="selectedTrip" />

    <div>
        <h4 class="title is-4">Selected extras:</h4>

        <table class="table is-fullwidth">
            <tbody>
                <tr v-for="extra in selectedExtras" :key="extra.id">
                    <td>
                        {{extra.name}}
                    </td>
                    <td class="has-text-right">
                        {{extra.price}} CHF
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th class="has-text-right">{{extrasPrice}} CHF</th>
                </tr>
            </tfoot>
        </table>
    </div>

    <div class="columns is-mobile">
        <div class="column">
            <h3 class="title is-3">Total:</h3>
        </div> 
        <div class="column has-text-right">
            <h3 class="title is-3">{{totalPrice}} CHF</h3>
        </div>
    </div>

    <a @click.prevent="onNext" class="button is-link">OK</a>
</div>
</template>

<script>
import TripListItem from '../../TripListItem.vue'

export default {
    props: {
        done: { type: Function, required: true },
        selectedTrip: { type: Object, required: true },
        selectedExtras: { type: Array, default: () => [] },
        userInfo: { type: Object, required: true },
        totalPrice: Number,
    },
    methods: {
        onNext() {
            return this.done();
        }
    },
    computed: {
        extrasPrice() {
            return this.selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
        }
    },
    components: {
        TripListItem
    }
}
</script>

