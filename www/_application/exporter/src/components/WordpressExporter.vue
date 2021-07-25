<script>

import Vue from 'vue';
import Exporter from './Exporter.vue';

const WordpressExporter = Vue.extend({
  mixins: [Exporter],
  data() {

    return {
      options: {
        services : {
          getSQL: {
            url: './_application/exporter/backend/getWordpress.php'
          }
        },
        editor: {
          statusCaption: 'Wordpress entities',
          mode: 'ace/mode/php',
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

export default WordpressExporter;


</script>
