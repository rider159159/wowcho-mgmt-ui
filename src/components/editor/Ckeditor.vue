<script setup lang="ts">
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage'
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Font from '@ckeditor/ckeditor5-font/src/font'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
// import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'
import Link from '@ckeditor/ckeditor5-link/src/link'
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage'
import DocumentList from '@ckeditor/ckeditor5-list/src/documentlist'
import DocumentListProperties from '@ckeditor/ckeditor5-list/src/documentlistproperties'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat'
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'
import { MyUploadAdapter } from '@/plugins/ckeditor'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  getCkData: {
    type: Boolean,
    default: false
  }
})

const editor:any = ref(null)
let editorInstance:any = null
const emits = defineEmits(['update:modelValue'])
// URL
const apiUrl = import.meta.env.VITE_BASE_URL

function MyUploadAdapterPlugin(editor:any) {
  const uploadUrl = `${apiUrl}/upload`
  editor.plugins.get('FileRepository').createUploadAdapter = (loader:any) => {
    return new MyUploadAdapter(loader, uploadUrl)
  }
}

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
  ClassicEditor.create(editor.value, {
    toolbar: {
      items: [
        'undo', 'redo',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'heading',
        '|',
        'fontSize', 'fontColor', 'fontBackgroundColor', // 'fontFamily'
        '|',
        'horizontalLine', 'link', 'blockQuote',
        '|',
        'mediaEmbed', 'ImageUpload',
        '|',
        'alignment', 'removeFormat',
        '|',
        'bulletedList', 'numberedList', 'outdent', 'indent'
      ],
      shouldNotGroupWhenFull: true
    },
    plugins: [Alignment, Autoformat, AutoImage, AutoLink, BlockQuote, Bold, Italic, Underline, Essentials,
      Font, Heading, HorizontalLine,
      Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload, LinkImage,
      Indent, IndentBlock, Link, DocumentList, DocumentListProperties,
      MediaEmbed, PasteFromOffice, FileRepository, RemoveFormat
    ],
    // @ts-ignore
    image: {
      styles: [
        'alignCenter',
        'alignLeft',
        'alignRight'
      ],
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75'
        }
      ],
      toolbar: [
        'imageTextAlternative', 'toggleImageCaption', '|',
        'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', 'imageStyle:side', '|',
        'resizeImage'
      ],
      insert: {
        integrations: [
          'insertImageViaUrl'
        ]
      }
    },
    // @ts-ignore
    fontSize: {
      options: [12, 14, 'default', 20, 24, 28],
      supportAllValues: true
    },
    extraPlugins: [MyUploadAdapterPlugin]
  })
    .then((newEditor) => {
      editorInstance = newEditor
      checkProps()
      newEditor.model.document.on('change:data', () => {
        emits('update:modelValue', newEditor.getData())
      })
    })
    .catch((error) => {
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
  <div id="editor" class="formatted" :class="props.class">
    <div ref="editor" ></div>
  </div>
</template>
