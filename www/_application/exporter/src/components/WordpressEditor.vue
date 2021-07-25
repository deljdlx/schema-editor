<template>

    <div class="panel-body panel-body--sql code-editor-container">
      <div class="toolbar">




        <v-btn-toggle>
            <v-btn @click="addCustomPostType">
                <v-icon>mdi-table-large</v-icon>
            </v-btn>
        </v-btn-toggle>

        <v-btn-toggle>
            <v-btn @click="addCustomTaxonomy">
                <v-icon>mdi-tag</v-icon>
            </v-btn>
        </v-btn-toggle>


        <v-btn-toggle>
            <v-btn @click="addCustomRole">
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-btn-toggle>

        <v-btn-toggle>
            <v-btn @click="save">
                <v-icon>mdi-content-save</v-icon>
            </v-btn>
        </v-btn-toggle>



      </div>

      <div class="panel-content">
          <CustomPostType v-if="this.entity" :entity="entity" @newCustomTaxonomy="this.addCustomTaxonomy"></CustomPostType>

      </div>

    </div>

</template>



<script>

import Vue from 'vue';
import Exporter from './Exporter.vue';

import EntityExporter from '../services/EntityExporter';

import CustomPostType from './WordpressEditor/CustomPostType.vue';

const WordpressExporter = Vue.extend({
  mixins: [Exporter],

  components: {
    CustomPostType,
  },


  data() {

    return {

      roles: [],
      customPostTypes: [],
      taxonomies: [],
      relations: [],

      entity: null,
      fieldTypes: [
        'tite',
        'excerpt',
        'content',
        'image',
      ],

      options: {
        services : {
          getSQL: {
            url: './_application/exporter/backend/getWordpress.php'
          }
        },
      },
    }
  },

  mounted() {


    this.$schemaBuilder.addEventListener('entityClick', (entity) => {
      if(entity._entityType) {

        if(entity._entityType == 'entity') {
          this.entity = entity;
        }
      }
      else {
        this.entity = entity.parent;
      }

      this.showEntity(entity);
    });


    this.$schemaBuilder.addEventListener('clearSelection', () => {
      this.entity = null;
    });


  },


  methods: {

    showEntity() {
      console.log(this.entity);
    },

    async addCustomRole() {
      let role = this.$schemaBuilder.insertRole();
      this.roles.push(role);
    },

    async addCustomTaxonomy(event) {

      if(event) {
        this.entity = event.entity
      }

      let taxonomy = this.$schemaBuilder.insertTaxonomy();
      this.taxonomies.push(taxonomy);


      if(this.entity) {


        let geo = this.entity.getGeometry();
        taxonomy.getGeometry().translate(geo.x + 300, geo.y + 0);

        let relation = this.$schemaBuilder.linkEntity(
          this.entity,
          taxonomy,
          '0,n',
          '0,n'
        );

        this.relations.push(relation);

      }


      this.$schemaBuilder.refreshGraph();
    },

    async addCustomPostType() {

      let entity = this.$schemaBuilder.insertEntity();
      this.entity = entity;
      this.customPostTypes.push(entity);

      this.$schemaBuilder.getGraph().setSelectionCell(entity);


    },

    async contentChanged(xml) {

      let data = {
        xml: xml
      };

      const responseData = await this.$ajax.post(this.options.services.getSQL.url, data);
      this.setCode(responseData.code);

    },

    async save() {
      let model = {};
      let customPostTypes = [];

      let entityExporter = new EntityExporter();

      for(let customPostType of this.customPostTypes) {
        let descriptor = entityExporter.exportCustomType(customPostType);
        customPostTypes.push(descriptor);
      }

      model.customPostTypes = customPostTypes;

      console.log(
        JSON.parse(JSON.stringify(model))
      );
    },
  }
});

export default WordpressExporter;


</script>

<style scoped lang="scss">

@import '../assets/scss/main.scss';

.entity-container {

  background-color: $color-lightest;

  margin: $gutter;
  padding: $gutter;

  border: solid 1px $color-border;

  input {
    border: solid 1px #fff;
  }
}

</style>
