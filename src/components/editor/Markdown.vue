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
  },
  getCkData: {
    type: Boolean,
    default: false
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

watch(() => props.getCkData,
  (oldValue, newValue) => {
    editorInstance.setData(props.modelValue)
  }
)

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

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy()
  }
})

</script>

<template>
  <div id="markdown" class="formatted">
    <div ref="mkEditor" class="w-full text-h6 h-120px leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"></div>
  </div>
</template>
