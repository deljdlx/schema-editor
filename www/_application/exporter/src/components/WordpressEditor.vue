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


          <template>
            <v-row>
              <v-col cols="3">
                <v-treeview
                  :items="items"
                  open-all
                  :active.sync="active"
                  :open.sync="open"
                  activatable
                  open-on-click
                ></v-treeview>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="9">
                <CustomPostType v-if="this.entity" :entity="entity" @newCustomTaxonomy="this.addCustomTaxonomy" @entityLabelChanged="handleEntityLabelChanged"></CustomPostType>
              </v-col>
            </v-row>
          </template>





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

      active: [],
      open: [0,1,2],

      items: [
        {
          id: 1,
          name: 'Custom post types :',
          children: [
          ],
        },
        {
          id: 5,
          name: 'Taxonomies :',
          children: [
          ],
        },
        {
          id: 15,
          name: 'User roles :',
          children: [
          ],
        },
      ],





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
        console.log('clicked on entity');
      }
      else {
        entity = entity.parent;
      }

      if(entity._entityType == 'entity') {
        this.entity = entity;
        this.active = [
          entity.id
        ];
      }
      else if(entity._entityType == 'taxonomy') {
        console.log('clicked on taxonomy');
      }



    });


    this.$schemaBuilder.addEventListener('entityMoved', (entity) => {

      if(entity._entityType) {
        if(entity._entityType == 'entity') {
          this.entity = entity;
          this.active = [
            entity.id
          ];
        }
      }
      else {
        this.entity = entity.parent;
      }
    });


    this.$schemaBuilder.addEventListener('clearSelection', () => {
      this.entity = null;
      this.active = [];
    });

    this.$schemaBuilder.addEventListener('entityLabelChanged', (entity) => {

      let node = this.findInCustomPostTypes(entity.id);
      if(node) {
        node.name = entity.getAttribute('label');
      }
    });
  },


  computed: {
      selected () {

        // const id = this.active[0];
        // let node = this.items[0].children.find(item => item.id === id);
        return this.active[0];
      },
  },

  watch: {
      selected () {
        const id = this.active[0];


        console.log(id);

        let node = this.findInCustomPostTypes(id);

        console.log(node);

        if(node) {
          this.$schemaBuilder.select(node.cell);
          this.entity = node.cell
        }
        else {
          this.entity = null;
          this.$schemaBuilder.clearSelection();
        }


        return 'test';
      },
  },


  methods: {

    handleEntityLabelChanged(data) {
      let node = this.findInCustomPostTypes(data.entity.id);
      if(node) {
        node.name = data.entity.getAttribute('label');
      }
    },

    findInCustomPostTypes(id) {
        return this.items[0].children.find(item => item.id === id);

    },

    async addCustomRole() {
      let role = this.$schemaBuilder.insertRole();
      this.roles.push(role);
      this.addNode(role);
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

      this.addNode(taxonomy);

    },

    async addCustomPostType() {

      let entity = this.$schemaBuilder.insertEntity();
      this.entity = entity;
      this.customPostTypes.push(entity);

      this.$schemaBuilder.getGraph().setSelectionCell(entity);

      for(let attribute of entity.children) {
        let data = {
          id: attribute.id,
          name: attribute.getAttribute('label'),
          cell: attribute,
        }
        // node.children.push(data);
        console.log(data);
      }

     this.addNode(entity);
    },


    addNode(mxCell) {

      let index = 0;
      let node = {};

      node = {
        id: mxCell.id,
        name: mxCell.getAttribute('label'),
        cell: mxCell,
        children: []
      }

      if(mxCell._entityType == 'entity') {
        index = 0;
      }
      else if(mxCell._entityType == 'taxonomy') {
        index = 1;
      }
      else if(mxCell._entityType == 'role') {
        index = 2;
      }

      this.items[index].children.push(node);

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

  // background-color: $color-lightest;

  margin: $gutter;
  padding: $gutter;

  border: solid 1px $color-border;

  input {
    border: solid 1px #fff;
  }
}

</style>
