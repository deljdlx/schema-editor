<script>

import Vue from 'vue';
import Exporter from './Exporter.vue';

const MySQLExporter = Vue.extend({
  mixins: [Exporter],
  data() {

    return {
      options: {
        editor: {
          statusCaption: 'Drawio xml ',
          mode: 'ace/mode/xml',
        }
      },
    }
  },


  methods: {

    async contentChanged(xml) {
      this.setCode(this.pretiffy(xml));
    },

    getDropTableOption() {
      return this.dropIfExists;
    },


    pretiffy(sourceXml) {
      var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
      var xsltDoc = new DOMParser().parseFromString([
          // describes how we want to modify the XML - indent everything
          '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
          '  <xsl:strip-space elements="*"/>',
          '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
          '    <xsl:value-of select="normalize-space(.)"/>',
          '  </xsl:template>',
          '  <xsl:template match="node()|@*">',
          '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
          '  </xsl:template>',
          '  <xsl:output indent="yes"/>',
          '</xsl:stylesheet>',
      ].join('\n'), 'application/xml');

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsltDoc);
      var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
      var resultXml = new XMLSerializer().serializeToString(resultDoc);
      return resultXml;
    }
  }

});

export default MySQLExporter;


</script>
