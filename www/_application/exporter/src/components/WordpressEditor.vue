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
                <CustomPostType v-if="this.entity" :entity="entity" @newCustomTaxonomy="this.addCustomTaxonomy"></CustomPostType>
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

      active:[],


      items: [
        {
          id: 1,
          name: 'Custom post types :',
          children: [
            /*
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' },
            */
          ],
        },
        {
          id: 5,
          name: 'Taxonomies :',
          children: [
            /*
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 8, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: 'material2 :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' },
                  ],
                },
              ],
            },*/
          ],
        },
        {
          id: 15,
          name: 'User roles :',
          children: [
            /*
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' },
            */
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

    this.$schemaBuilder.addEventListener('entityLabelChanged', (entity) => {

      let node = this.findInCustomPostTypes(entity.id);
      if(node) {
        node.name = entity.getAttribute('label');
      }

      console.log(node);
    });

  },


  computed: {
      selected () {

        console.log('%c' + 'selected', 'color: #0bf; font-size: 1rem; background-color:#fff');
        console.log(this.active);

        const id = this.active[0];
        let node = this.items[0].children.find(item => item.id === id);


        if(node) {
          this.$schemaBuilder.select(node.cell);
        }

        return this.active;
      },
  },

  watch: {
      selected () {
        // this.entity = node.cell;
        // console.log(this.active);

        const id = this.active[0];
        // let node = this.items[0].children.find(item => item.id === id);
        let node = this.findInCustomPostTypes(id);


        if(node) {
          this.$schemaBuilder.select(node.cell);
          this.entity = node.cell
        }


        return 'test';
      },
  },


  methods: {

    findInCustomPostTypes(id) {
        return this.items[0].children.find(item => item.id === id);

    },

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

      const node = {
        id: entity.id,
        // name: 'toto', //entity.getCaption()
        name: entity.getAttribute('label'),
        cell: entity,
      };


      this.items[0].children.push(node);

      // entity.node = node;


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
