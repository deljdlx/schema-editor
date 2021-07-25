<template>

    <div class="panel-body panel-body--sql code-editor-container">
      <div class="toolbar">


        <v-btn-toggle>
            <v-btn @click="copySource">
                <v-icon>mdi-content-copy</v-icon>
            </v-btn>
        </v-btn-toggle>


        <v-btn-toggle v-if="dropIfExists !== null">
            <v-btn
                text
                :isActive="dropIfExists"
                v-model="dropIfExists"
            >
                <v-icon>mdi-database-refresh</v-icon>
            </v-btn>
        </v-btn-toggle>





      </div>

      <div class="panel-content">
        <textarea ref="code-paster" class="code-paster" v-model="code"></textarea>
        <div ref="editor" class="code-editor"></div>
        <div ref="editorStatusBar">{{options.editor.statusCaption}}</div>
      </div>

    </div>
</template>



<script>

export default ({
  data () {
    return {
        options: {
            services : {

            },
            editor: {
                statusCaption: 'Code editor',
                theme: 'ace/theme/dracula',
                mode: 'ace/mode/sql',
            },
        },

        editor: null,
        statusBar: null,

        dropIfExists: null,

        xml: '',
        code: '',
    };
  },


  mounted() {


    console.log('%c' + 'Exporter mounted', 'color: #0bf; font-size: 1rem; background-color:#fff');

    this.initializeEditor();

    this.$document.addEventListener('schema.content.changed', (event) => {
        this.xml = event.detail.xml;
        this.contentChanged(event.detail.xml);
    });
  },




  methods: {

    setCode(code) {
      this.code = code;

      if(this.editor) {
        this.editor.getSession().setValue(code);
      }
    },

    async contentChanged(xml) {
        return xml;
    },

    initializeEditor() {
      if(this.$refs.editor) {
        this.editor = window.ace.edit(this.$refs.editor);

        let StatusBar = window.require("ace/ext/statusbar").StatusBar;
        // create a simple selection status indicator

        this.statusBar = new StatusBar(this.editor, this.$refs.editorStatusBar);

        this.editor.setTheme(this.options.editor.theme);
        this.editor.session.setMode({
            path: this.options.editor.mode,
            inline: true
        });
      }
    },

    copySource() {
        this.$refs.['code-paster'].select();
        this.$document.execCommand("copy");
    }
  }
})
</script>


<style scoped lang="scss">

@import '../assets/scss/main.scss';




</style>

