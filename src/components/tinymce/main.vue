
<template>
  <div>
    <textarea class="tinymce-textarea"
              :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff"
                   class="editor-upload-btn"
                   @successCBK="imageSuccessCBK"></editorImage>
    </div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import editorImage from './components/editorImage'
// 这下面是tinymce的插件
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
// import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
// import 'tinymce/plugins/colorpicker'
// import 'tinymce/plugins/textcolor'
// 这里写你自己存放语言包的路径
import '../../lang/tinymce_lang_zh_CN'
// import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/icons/default/icons.min.js'

export default {
  name: 'tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
    },
    value: {
      type: String,
      default: '',
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      },
    },
    // 菜单栏配置
    menubar: {
      default: 'file edit insert view format table',
    },
    height: {
      type: Number,
      required: false,
      default: 600,
    },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || `vue-tinymce-${new Date()}`,
      fullscreen: false,
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => tinymce.get(this.tinymceId).setContent(val || ''))
      }
    },
  },
  created() {

  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      tinymce.init({
        selector: `#${this.tinymceId}`,
        fontsize_formats: '8px 9px 10px 12px 13px 14px 16px 18px 21px 24px 28px 32px 36px',
        font_formats: '微软雅黑=微软雅黑;宋体=宋体;黑体=黑体;仿宋=仿宋;楷体=楷体;隶书=隶书;幼圆=幼圆;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;',
        language: 'zh_CN',
        height: this.height,
        body_class: 'panel-body',
        object_resizing: false,
        toolbar: `'bold italic underline strikethrough alignleft aligncenter alignright outdent indent alignnone blockquote undo redo removeformat subscript superscript code codesample', 
        'hr bullist numlist link unlink image charmap preview anchor pagebreak insertdatetime media table tabledelete tablecellprops tablemergecells tableinsertrowbefore tableinsertrowafter tabledeleterow tablerowprops tableinsertcolbefore tableinsertcolafter tabledeletecol',
        'formatselect fontselect fontsizeselect cut copy paste visualaid insert openlink pastetext print spellchecker searchreplace',
        'visualblocks visualchars help nonbreaking rotateleft rotateright flipv fliph editimage imageoptions fullpage ltr rtl template forecolor backcolor quicktable quicklink emoticons fullscreen'`,
        menubar: this.menubar,
        plugins: 'link lists image code table wordcount',
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('Change KeyUp SetContent', () => {
            _this.hasChange = true
            _this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
      })
    },
    destroyTinymce() {
      if (tinymce.get(this.tinymceId)) {
        tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    },
  },
  destroyed() {
    this.destroyTinymce()
  },
}
</script>
<style scoped>
.tox-editor-container {
  position: relative;
}
.tox-editor-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 5;
}
.tox-tinymce {
  min-height: 360px !important;
}
</style>
