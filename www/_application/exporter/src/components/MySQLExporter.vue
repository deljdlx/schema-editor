<script>

import Vue from 'vue';
import Exporter from './Exporter.vue';
import configuration from '../services/Configuration.js';

const MySQLExporter = Vue.extend({
  mixins: [Exporter],
  data() {

    return {
      options: {
        services : {
          getSQL: {
            url: configuration.services.getSQL.url
          }
        },
        editor: {
          statusCaption: 'MySQL create database',
          mode: 'ace/mode/sql',
        }
      },
      dropIfExists: 1,
    }
  },


  methods: {

    async contentChanged(xml) {

      let data = {
        xml: xml,
        dropTable: this.dropIfExists
      };

      const responseData = await this.$ajax.post(this.options.services.getSQL.url, data);
      this.setCode(responseData.sql);

    },
  }

});

export default MySQLExporter;


</script>
