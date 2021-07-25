<script>

import Vue from 'vue';
import Exporter from './Exporter.vue';

const PHPExporter = Vue.extend({
  mixins: [Exporter],

  data() {

    return {
      options: {
        services : {
          getSQL: {
            url: './_application/exporter/getSQL.php'
          }
        },
        editor: {
          statusCaption: 'PHP models',
          mode: 'ace/mode/php',
        }
      },
      dropIfExists: 1,
    }
  },



});

export default PHPExporter;


</script>
