<template>


    <div v-if="entity" class="entity-container">

        <v-text-field v-model="entityName" label=""></v-text-field>


        <v-row>
            <v-col cols="12">
                <v-btn-toggle>
                    <v-btn @click="newCustomTaxonomy">
                        <v-icon>mdi-tag</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>

        <div>

            <v-expansion-panels>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Properties
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-checkbox label="Public"></v-checkbox>

                        <v-checkbox label="Hierachical"></v-checkbox>

                        <v-checkbox label="Show in REST"></v-checkbox>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Fields
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <CustomPostTypeField v-for="(field, index) of entity.children" :key="index" class="field-container" :field="field"></CustomPostTypeField>
                    </v-expansion-panel-content>
                </v-expansion-panel>

            </v-expansion-panels>

        </div>
    </div>
</template>

<script>

import CustomPostTypeField from './CustomPostTypeField.vue';

export default {

    components: {
        CustomPostTypeField
    },

    props: {
        entity: Object,
    },

    data() {

        return {

        }
    },

    watch: {
        entityName() {
            console.log(this);
        }
    },

    computed: {
        entityName: {
            get: function() {
                console.log(this.entity);
                return this.entity.getAttribute('label');
                /*
                console.log(this.entity);
                for(let attrubte of this.entity.value.attributes) {
                    if(attribute.)
                }
                return this.entity.value;
                */
            },
            set: function(value) {

                this.entity.setAttribute('label', value);
                console.log(this.entity);
                console.log(this.entity.getAttribute('label'));
                this.$schemaBuilder.refreshGraph();
            }
        }
    },

    methods: {

        newCustomTaxonomy() {
            this.$emit('newCustomTaxonomy', {
                entity: this.entity
            });
        }
    }
};


</script>
