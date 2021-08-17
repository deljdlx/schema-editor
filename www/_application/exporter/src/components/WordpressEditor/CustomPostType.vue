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

            <v-expansion-panels :multiple="true">

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
            panels: [],
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
                return this.entity.getAttribute('label');
            },
            set: function(value) {
                this.entity.setAttribute('label', value);
                this.$schemaBuilder.refreshGraph();
                this.$emit('entityLabelChanged', {
                    entity: this.entity
                });

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
