exporter<script>

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
            url: configuration.services.getJSON.url
          }
        },
        editor: {
          statusCaption: 'Entities documentation',
          mode: 'ace/mode/json',
        }
      },
    }
  },


  methods: {

    async contentChanged(xml) {

      let data = {
        xml: xml
      };

      const responseData = await this.$ajax.post(this.options.services.getSQL.url, data);
      this.setCode(responseData.code);

    },

    getDropTableOption() {
      return this.dropIfExists;
    },
  }

});

export default MySQLExporter;


</script>
