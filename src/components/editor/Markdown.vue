<script lang="ts" setup>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
import DocumentList from '@ckeditor/ckeditor5-list/src/documentlist'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])

const mkEditor:any = ref(null)
let editorInstance:any = null

function checkProps() {
  if (props.modelValue.length > 0) {
    editorInstance.setData(props.modelValue)
  }
}

onMounted(() => {
  ClassicEditor.create(mkEditor.value, {
    // Markdown Heading
    plugins: [Heading, Autoformat, Essentials, Bold, Italic, BlockQuote, HorizontalLine,
      DocumentList
    ]
  })
    .then((newEditor) => {
      editorInstance = newEditor
      checkProps()
      newEditor.model.document.on('change:data', () => {
        emits('update:modelValue', newEditor.getData())
      })
    })
    .catch((error: Error) => {
      console.error('There was a problem initializing the editor.', error)
    })
})

</script>

<template>
  <div class="markdown">
    <div ref="mkEditor" id="mkEditor"></div>
  </div>
</template>
