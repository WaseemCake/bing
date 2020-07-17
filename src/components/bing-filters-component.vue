<template>
  <div class="filters"></div>
</template>

<script>
const FilterEvents = Object.freeze(["click"]);
import ComponentBase from "../mixins/component-base.vue";
import Utils from "../utils.js";

export default {
        name: 'bing-filters',
        mixins: [ComponentBase],
        props: {
            options: {
                type: Object,
                required: false,
                default: () => {}
            },
            visible: {
                type: Boolean,
                required: false,
                default: () => true
            },
        },
        data(){
            return {
                itemType: 'search',
                allowedEvents: FilterEvents
            };
        },        
};
</script>