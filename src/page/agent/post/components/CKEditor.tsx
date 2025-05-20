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
  HtmlEmbed,
  BlockQuote,
  Heading,
  Indent,
  IndentBlock,
  List,
  MediaEmbed,
  PasteFromOffice,
  TextTransformation,
  CodeBlock,
  GeneralHtmlSupport,
  AutoImage,
  CloudServices,
  Style,
  SelectAll
} from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CkeditorProps {
  onChange?: (value: string) => void;
  value?: string;
  isPost?: boolean;
  formData?: Record<string, any>;
}

export default function Ckeditor({ onChange, value, isPost, formData = {} }: CkeditorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [contentLength, setContentLength] = useState('dài (2000-2500 từ)');
  const [contentStyle, setContentStyle] = useState('cao cấp');
  const editorRef = useRef<any>(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Áp dụng các style tùy chỉnh cho editor khi component mount
  useEffect(() => {
    const applyCustomStyles = () => {
      if (editorRef.current?.editor) {
        // Các style có thể được áp dụng thông qua JavaScript nếu cần
      }
    };
    
    // Đợi editor khởi tạo xong
    const interval = setInterval(() => {
      if (editorRef.current?.editor) {
        applyCustomStyles();
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const generateContent = async () => {
    if (!editorRef.current) {
      toast({
        variant: 'destructive',
        title: 'Không thể kết nối với trình soạn thảo. Vui lòng thử lại.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `
        Tạo nội dung bài đăng bất động sản SIÊU THU HÚT, SÁNG TẠO, CHUYÊN NGHIỆP bằng tiếng Việt, dựa trên mô tả của người dùng (nếu có): "${userInput || 'bất động sản chung'}" và thông tin form sau:
        - Tiêu đề: ${formData.title || 'Chưa cung cấp'}
        - Loại bất động sản: ${formData.propertyType || 'Chưa cung cấp'}
        - Giá: ${formData.price ? `${formData.price.toLocaleString()} VNĐ${formData.listingType === 'Thuê' ? '/tháng' : ''}` : 'Chưa cung cấp'}
        - Diện tích: ${formData.squareMeters ? `${formData.squareMeters} m²` : 'Chưa cung cấp'}
        - Số phòng ngủ: ${formData.bedroom || 'Chưa cung cấp'}
        - Số phòng tắm: ${formData.bathroom || 'Chưa cung cấp'}
        - Số tầng: ${formData.floor || 'Chưa cung cấp'}
        - Hướng nhà: ${formData.direction || 'Chưa cung cấp'}
        - Nội thất: ${formData.isFurniture ? 'Có nội thất' : 'Không nội thất'}
        - Trạng thái: ${formData.status || 'Chưa cung cấp'}
        - Địa chỉ: ${formData.address || 'Chưa cung cấp'}
        - Tags: ${formData.tags?.join(', ') || 'Chưa cung cấp'}

        Nội dung phải ${contentLength} và có phong cách ${contentStyle}, với các yêu cầu sau:
        
        1. ĐỘ DÀI VÀ CHI TIẾT:
           - Tạo nội dung ${contentLength === 'dài (2000-2500 từ)' ? 'dài 2000-2500 từ' : contentLength === 'trung bình (1000-1500 từ)' ? '1000-1500 từ' : '500-800 từ'}.
           - Cực kỳ chi tiết, đầy đủ thông tin, phân tích sâu sắc.
           - Chia thành nhiều phần rõ ràng, mỗi phần dài khoảng 200-300 từ.
        
        2. CẤU TRÚC VÀ ĐỊNH DẠNG HTML:
           - Sử dụng cấu trúc HTML có tính thẩm mỹ cao với các div bắt mắt.
           - Thêm các lớp CSS cho từng phần nội dung với style đặc trưng (màu sắc, font chữ, padding, margin).
           - Tạo các khối nội dung (div) có background màu nhẹ nhàng, viền bo tròn, đổ bóng.
           - Sử dụng các container, card, và section để phân chia nội dung thành các khối riêng biệt.
           - Áp dụng hiệu ứng hover khi di chuột vào các khối quan trọng.
           - Tạo các box highlight cho thông tin quan trọng với style nổi bật.
        
        3. BỐ CỤC CHI TIẾT:
           - <h1> cho tiêu đề chính, với style đặc biệt (font size lớn, màu gradient).
           - <h2> cho các phần chính: có background nhẹ, padding, border-left màu đậm.
           - <h3> cho các mục phụ: style riêng biệt, dễ nhận biết.
           - <div class="feature-box"> cho các tính năng nổi bật.
           - <div class="location-advantage"> cho ưu điểm vị trí.
           - <div class="investment-potential"> cho tiềm năng đầu tư.
           - <div class="property-highlight"> cho điểm nhấn bất động sản.
           - <div class="testimonial"> cho nhận xét từ các khách hàng (tạo giả định).
           - <div class="call-to-action"> cho phần kêu gọi hành động.
           - <div class="comparison-table"> để so sánh với các bất động sản tương tự.
        
        4. KIỂU DÁNG VÀ MÀU SẮC:
           - Sử dụng bảng màu chuyên nghiệp, hài hòa (xanh dương nhạt, xanh lá cây, cam đất, xám nhạt).
           - Font chữ đa dạng: Roboto cho text chính, Playfair Display cho tiêu đề, Montserrat cho các điểm nhấn.
           - Tạo các nút CTA nổi bật với gradient và hiệu ứng hover.
           - Sử dụng icons FontAwesome hoặc Material Icons trong các mục quan trọng.
        
        5. NỘI DUNG CHI TIẾT CẦN BAO GỒM:
           - Mở đầu ấn tượng với paragraph có style riêng (font size lớn, chữ in nghiêng nhẹ).
           - Phân tích chi tiết về vị trí địa lý và chiến lược (300+ từ).
           - Mô tả chi tiết từng không gian sống (phòng khách, phòng ngủ, nhà bếp, sân vườn) với đặc điểm nổi bật.
           - Chi tiết về tiện ích nội khu và ngoại khu (tối thiểu 10-15 tiện ích mỗi loại).
           - Phân tích thị trường chuyên sâu (xu hướng giá, so sánh với khu vực lân cận).
           - Lý do đầu tư (tối thiểu 8 lý do với phân tích chi tiết).
           - Đánh giá từ chuyên gia (giả định) với blockquote style đẹp.
           - FAQ với tối thiểu 6-8 câu hỏi thường gặp.
           - Lời kết với call-to-action mạnh mẽ.
        
        6. KHÔNG ĐƯỢC BỎ QUA:
           - Phải áp dụng đầy đủ CSS inline để tạo style đẹp (KHÔNG sử dụng external CSS).
           - Tất cả định dạng phải sử dụng HTML và inline CSS.
           - KHÔNG sử dụng code fence như \`\`\`html hoặc bất kỳ code fence nào khác.
           - Chỉ trả về nội dung HTML thuần túy với inline CSS.
           - Phải tạo nội dung ${contentLength === 'dài (2000-2500 từ)' ? 'tối thiểu 2000 từ' : contentLength === 'trung bình (1000-1500 từ)' ? 'tối thiểu 1000 từ' : 'tối thiểu 500 từ'}.
           - Phong cách viết phải ${contentStyle === 'cao cấp' ? 'sang trọng, đẳng cấp, dùng từ ngữ tinh tế' : contentStyle === 'chuyên nghiệp' ? 'rõ ràng, mạch lạc, đi thẳng vào vấn đề' : 'thân thiện, gần gũi, dễ tiếp cận'}.
      `;

      const result = await model.generateContent(prompt);
      let generatedText = await result.response.text();

      // Xóa code fence nếu có
      generatedText = generatedText.replace(/```html\n|\n```/g, '');

      const editorInstance = editorRef.current.editor;
      editorInstance.setData(generatedText);
      if (onChange) {
        onChange(generatedText);
      }
      
      // Thông báo thành công
      toast({
        title: "Tạo nội dung thành công!",
        description: `Đã tạo bài viết ${contentLength} với phong cách ${contentStyle}.`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra khi tạo nội dung',
        description: 'Vui lòng thử lại sau.',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any, editor: any) => {
    const data = editor.getData();
    if (onChange) {
      onChange(data);
    }
  };

  return (
    <div className="space-y-3">
      {isPost && (
        <div className="space-y-3 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-base font-medium text-gray-800">Tùy chỉnh nội dung</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="userInput" className="block text-xs font-medium text-gray-700 mb-1">
                Mô tả yêu cầu
              </Label>
              <Input
                id="userInput"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Mô tả yêu cầu (VD: Tôi muốn đăng nhà bán ở quận 7)"
                className="w-full px-2 py-[6px] mt-[5px] text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                disabled={isLoading}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="contentLength" className="block text-xs font-medium text-gray-700 mb-1">
                  Độ dài nội dung
                </Label>
                <Select
                  value={contentLength}
                  onValueChange={setContentLength}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                    <SelectValue placeholder="Chọn độ dài" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngắn (500-800 từ)">Ngắn (500-800 từ)</SelectItem>
                    <SelectItem value="trung bình (1000-1500 từ)">Trung bình (1000-1500 từ)</SelectItem>
                    <SelectItem value="dài (2000-2500 từ)">Dài (2000-2500 từ)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="contentStyle" className="block text-xs font-medium text-gray-700 mb-1">
                  Phong cách
                </Label>
                <Select
                  value={contentStyle}
                  onValueChange={setContentStyle}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                    <SelectValue placeholder="Chọn phong cách" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cao cấp">Cao cấp</SelectItem>
                    <SelectItem value="chuyên nghiệp">Chuyên nghiệp</SelectItem>
                    <SelectItem value="thân thiện">Thân thiện</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <Button
              onClick={generateContent}
              disabled={isLoading}
              className={`relative px-6 py-2 text-sm text-white font-medium rounded-md overflow-hidden transition-all duration-500 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient'
              } shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {!isLoading && (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6H9v2h2v2h2v-2h2v-2h-2V7z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {isLoading && (
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h-8z"
                    />
                  </svg>
                )}
                {isLoading ? 'Đang tạo nội dung...' : 'Tạo nội dung chuyên nghiệp'}
              </span>
              {!isLoading && (
                <>
                  <span className="absolute inset-0 shimmer" />
                  <span className="absolute inset-0 sparkle" />
                  <span className="absolute inset-0 particle" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
      
      <div className="rounded-md border border-gray-300 shadow-sm overflow-hidden">
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: 'Nhập nội dung mô tả bất động sản tại đây...',
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
              BlockQuote,
              Heading,
              Indent,
              IndentBlock,
              List,
              MediaEmbed,
              PasteFromOffice,
              TextTransformation,
              CodeBlock,
              HtmlEmbed,
              GeneralHtmlSupport,
              AutoImage,
              CloudServices,
              Style,
              SelectAll
            ],
            toolbar: {
              items: [
                'heading',
                '|',
                'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
                '|',
                'bold', 'italic', 'underline', 'strikethrough',
                '|',
                'alignment',
                '|',
                'numberedList', 'bulletedList',
                '|',
                'outdent', 'indent',
                '|',
                'link', 'blockQuote', 'insertTable', 'mediaEmbed', 'htmlEmbed',
                '|',
                'imageUpload',
                '|',
                'undo', 'redo',
                '|',
                'selectAll',
                '|',
                'code'
              ],
              shouldNotGroupWhenFull: true
            },
            fontSize: {
              options: [9, 10, 11, 12, 'default', 14, 16, 18, 20, 22, 24, 26, 28, 36, 48],
              supportAllValues: true,
            },
            fontFamily: {
              options: [
                'default',
                'Arial, Helvetica, sans-serif',
                'Courier New, Courier, monospace',
                'Georgia, serif',
                'Lucida Sans Unicode, Lucida Grande, sans-serif',
                'Tahoma, Geneva, sans-serif',
                'Times New Roman, Times, serif',
                'Trebuchet MS, Helvetica, sans-serif',
                'Verdana, Geneva, sans-serif',
                'Roboto, sans-serif',
                'Open Sans, sans-serif',
                'Montserrat, sans-serif',
                'Playfair Display, serif'
              ]
            },
            fontColor: {
              colors: [
                { color: '#000000', label: 'Black' },
                { color: '#4D4D4D', label: 'Dark Gray' },
                { color: '#999999', label: 'Gray' },
                { color: '#E6E6E6', label: 'Light Gray' },
                { color: '#FFFFFF', label: 'White' },
                { color: '#E64C4C', label: 'Red' },
                { color: '#E6994C', label: 'Orange' },
                { color: '#E6E64C', label: 'Yellow' },
                { color: '#4CE64C', label: 'Green' },
                { color: '#4C4CE6', label: 'Blue' },
                { color: '#994CE6', label: 'Purple' },
                { color: '#E64C99', label: 'Pink' },
                { color: '#55A5D9', label: 'Light Blue' },
                { color: '#5ABF7B', label: 'Light Green' },
                { color: '#D9A555', label: 'Light Brown' },
                { color: '#274F8A', label: 'Dark Blue' },
                { color: '#326F4A', label: 'Dark Green' },
                { color: '#8A4F27', label: 'Dark Brown' }
              ]
            },
            fontBackgroundColor: {
              colors: [
                { color: '#000000', label: 'Black' },
                { color: '#4D4D4D', label: 'Dark Gray' },
                { color: '#999999', label: 'Gray' },
                { color: '#E6E6E6', label: 'Light Gray' },
                { color: '#FFFFFF', label: 'White' },
                { color: '#E64C4C', label: 'Red' },
                { color: '#E6994C', label: 'Orange' },
                { color: '#E6E64C', label: 'Yellow' },
                { color: '#4CE64C', label: 'Green' },
                { color: '#4C4CE6', label: 'Blue' },
                { color: '#994CE6', label: 'Purple' },
                { color: '#E64C99', label: 'Pink' },
                { color: '#55A5D9', label: 'Light Blue' },
                { color: '#5ABF7B', label: 'Light Green' },
                { color: '#D9A555', label: 'Light Brown' },
                { color: '#F0F7FB', label: 'Light Blue Background' },
                { color: '#F0FBF5', label: 'Light Green Background' },
                { color: '#FBF7F0', label: 'Light Brown Background' }
              ]
            },
            image: {
              toolbar: [
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'imageResize'
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
                }
              ],
            },
            table: {
              contentToolbar: [
                'tableColumn', 
                'tableRow', 
                'mergeTableCells',
                'tableProperties',
                'tableCellProperties'
              ],
              tableProperties: {
                borderColors: [
                  { color: '#000000', label: 'Black' },
                  { color: '#4D4D4D', label: 'Dark Gray' },
                  { color: '#999999', label: 'Gray' },
                  { color: '#E6E6E6', label: 'Light Gray' },
                  { color: '#55A5D9', label: 'Light Blue' },
                  { color: '#5ABF7B', label: 'Light Green' }
                ],
                backgroundColors: [
                  { color: '#FFFFFF', label: 'White' },
                  { color: '#F0F7FB', label: 'Light Blue Background' },
                  { color: '#F0FBF5', label: 'Light Green Background' },
                  { color: '#FBF7F0', label: 'Light Brown Background' }
                ]
              },
              tableCellProperties: {
                borderColors: [
                  { color: '#000000', label: 'Black' },
                  { color: '#4D4D4D', label: 'Dark Gray' },
                  { color: '#999999', label: 'Gray' },
                  { color: '#E6E6E6', label: 'Light Gray' },
                  { color: '#55A5D9', label: 'Light Blue' },
                  { color: '#5ABF7B', label: 'Light Green' }
                ],
                backgroundColors: [
                  { color: '#FFFFFF', label: 'White' },
                  { color: '#F0F7FB', label: 'Light Blue Background' },
                  { color: '#F0FBF5', label: 'Light Green Background' },
                  { color: '#FBF7F0', label: 'Light Brown Background' }
                ]
              }
            },
            htmlEmbed: {
              showPreviews: true
            },
            heading: {
              options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
              ]
            },
            htmlSupport: {
              allow: [
                {
                  name: /^(div|section|article|aside|header|footer|nav|figure|figcaption)$/,
                  attributes: true,
                  classes: true,
                  styles: true
                },
                {
                  name: /^(h1|h2|h3|h4|h5|h6|p|span|strong|em|u|s|blockquote)$/,
                  attributes: true,
                  classes: true,
                  styles: true
                },
                {
                  name: /^(ul|ol|li|dl|dt|dd)$/,
                  attributes: true,
                  classes: true,
                  styles: true
                },
                {
                  name: /^(table|tbody|thead|tfoot|tr|td|th)$/,
                  attributes: true,
                  classes: true,
                  styles: true
                },
                {
                  name: /^(a|button)$/,
                  attributes: true,
                  classes: true,
                  styles: true
                },
                {
                  name: /^(img|video|audio|iframe)$/,
                  attributes: true,
                  classes: true,
                  styles: true
                },
                {
                  name: /^(code|pre)$/,
                  attributes: true,
                  classes: true,
                  styles: true
                }
              ]
            }
          }}
          data={value}
          onReady={(editor) => {
            editorRef.current = { editor };
          }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}