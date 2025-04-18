import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Alignment,
  Link,
  Table,
  TableToolbar,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Base64UploadAdapter,
  Font,
  ImageResize,
} from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

interface CkeditorProps {
  onChange?: (value: string) => void;
  value?: string;
}

export default function Ckeditor({ onChange, value }: CkeditorProps) {
  const handleChange = (e: any, editor: any) => {
    const data = editor.getData();
    if (onChange) {
      onChange(data);
    }
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        placeholder: 'Nhập nội dung mô tả tại đây...',
        plugins: [
          Essentials,
          Bold,
          Italic,
          Paragraph,
          Alignment,
          Link,
          Table,
          TableToolbar,
          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Base64UploadAdapter,
          Font,
          ImageResize,
        ],
        toolbar: [
          'undo',
          'redo',
          '|',
          'bold',
          'italic',
          '|',
          'fontSize',
          '|',
          'alignment:left',
          'alignment:center',
          'alignment:right',
          '|',
          'link',
          '|',
          'insertTable',
          '|',
          'imageUpload',
        ],
        fontSize: {
          options: [9, 10, 11, 12, 'default', 14, 16, 18, 20, 22, 24, 26, 28, 36, 48],
          supportAllValues: true,
        },
        image: {
          toolbar: [
            'imageStyle:alignLeft',
            'imageStyle:alignCenter',
            'imageStyle:alignRight',
            '|',
            'imageTextAlternative',
            '|',
            'imageResize',
          ],
          resizeUnit: 'px',
          resizeOptions: [
            {
              name: 'resizeImage:original',
              value: null,
              label: 'Kích thước gốc',
            },
            {
              name: 'resizeImage:50',
              value: '50',
              label: '50%',
            },
            {
              name: 'resizeImage:75',
              value: '75',
              label: '75%',
            },
            {
              name: 'resizeImage:100',
              value: '100',
              label: '100%',
            },
            {
              name: 'resizeImage:200',
              value: '200',
              label: '200%',
            },
            {
              name: 'resizeImage:300',
              value: '300',
              label: '300%',
            },
            {
              name: 'resizeImage:400',
              value: '400',
              label: '400%',
            },
          ],
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
        },
      }}
      data={value}
      
      onChange={handleChange}
    />
  );
}
