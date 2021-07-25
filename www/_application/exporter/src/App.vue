<template>
  <v-app>


    <div class="panel-container">

      <v-tabs
        fixed-tabs
        background-color="indigo"
        dark
      >




        <v-tab @click="currentPanel='WordpressEditor'">
          <v-icon x-large>mdi-wordpress</v-icon>
        </v-tab>



        <v-tab @click="currentPanel='XMLExporter'">
          <v-icon x-large>mdi-xml</v-icon>
        </v-tab>


        <!--
        <v-tab @click="currentPanel='JSONExporter'">
          <v-icon x-large>mdi-code-json</v-icon>
        </v-tab>

        <v-tab @click="currentPanel='documentation'">
          <v-icon x-large>mdi-lightbulb-on-outline</v-icon>
        </v-tab>

        <v-tab @click="currentPanel='php'">
          <v-icon x-large>mdi-language-php</v-icon>
        </v-tab>

        //-->

        <v-tab @click="currentPanel='mysql'">
          <v-icon x-large>mdi-database</v-icon>
        </v-tab>



        <v-tab @click="currentPanel='WordpressExporter'">
          <v-icon x-large>mdi-wordpress</v-icon>
        </v-tab>



        <v-tab @click="currentPanel='option'">
          <v-icon x-large>mdi-cog</v-icon>
        </v-tab>


      </v-tabs>



        <WordpressEditor v-show="currentPanel=='WordpressEditor'"></WordpressEditor>
        <WordpressExporter v-show="currentPanel=='WordpressExporter'"></WordpressExporter>
        <XMLExporter v-show="currentPanel=='XMLExporter'"></XMLExporter>
        <JSONExporter v-show="currentPanel=='JSONExporter'"></JSONExporter>
        <MySQLExporter v-show="currentPanel=='mysql'"></MySQLExporter>
        <PHPExporter v-show="currentPanel=='php'"></PHPExporter>

    </div>

  </v-app>
</template>

<script>


import WordpressExporter from './components/WordpressExporter';
import WordpressEditor from './components/WordpressEditor.vue';



import XMLExporter from './components/XMLExporter';
import JSONExporter from './components/JSONExporter';
import MySQLExporter from './components/MySQLExporter';
import PHPExporter from './components/PHPExporter';

export default {

  data () {
    return {
      containerSelector: '#app',
      ajax: null,
      container: null,
      currentPanel: 'WordpressEditor'
    };
  },

  watch: {
  },
  name: 'App',

  components: {

    WordpressEditor,
    WordpressExporter,

    XMLExporter,
    JSONExporter,
    MySQLExporter,
    PHPExporter
  },

  created() {
    console.log(this.$schemaBuilder);
    console.log(this.$ajax);
  },

  mounted() {
    this.container = document.querySelector(this.containerSelector);
  },


};
</script>


<style scoped lang="scss">

@import './assets/scss/main.scss';

.v-tabs {
  flex: none;
  display: block;
  height: auto;
}

</style>
