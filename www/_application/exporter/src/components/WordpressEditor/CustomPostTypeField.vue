<template>


    <v-row>
        <v-col cols="8">
            <v-text-field v-model="caption" label=""></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-select :items="fieldTypes" label="Map to"></v-select>
        </v-col>
    </v-row>

</template>




<script>


export default({

    data() {
        return {
            fieldTypes: [
                'tite',
                'excerpt',
                'content',
                'image',
            ],
            caption: '',
        };
    },

    props: {
        field: Object,
    },

    mounted() {
        this.caption = this.field.value.attributes[0].value
    }


});

</script>