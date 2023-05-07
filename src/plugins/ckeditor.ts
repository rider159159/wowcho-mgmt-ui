import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { App } from 'vue';



// export function setupCkeditor(AppInstance:App<Element>) {
//   AppInstance.use(CKEditor);
// }

interface Loader {
  file: Promise<File>;
}

// 上傳圖片設定
class MyUploadAdapter {
  private loader: Loader;
  private uploadUrl: string;

  constructor(loader: Loader, uploadUrl: string) {
    this.loader = loader;
    this.uploadUrl = uploadUrl;
  }

  upload(): Promise<{ default: string }> {
    return this.loader.file.then(
      (file: File) =>
        new Promise<{ default: string }>((resolve, reject) => {
          const data = new FormData();
          data.append('file', file);
          fetch(this.uploadUrl, {
            method: 'POST',
            body: data,
            headers:{
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhiNWQxZjA1OTg0NDRiMjI5YzMyMSIsImlhdCI6MTY4MjY0ODQ2MCwiZXhwIjoxNjgzMjUzMjYwfQ.hK0PEN1f22B1_eDotl9X4O9-uzH7J98rkhSSC6H5oJU'
            }
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              if (data.status==='Success') {
                resolve({ default: data.data.imgUrl });
              } else {
                reject(data.data?.message);
              }
            })
            .catch((error) => {
              reject(error.response.data.message);
            });
        })
    );
  }
}

export { MyUploadAdapter }