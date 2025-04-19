// components/Warning.tsx
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import React, { useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { useAddReport } from '../hooks/use-add-report';

interface WarningProps {
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
  postId: string;
}

function Warning({ isAuthenticated = false, onAuthRequired, postId }: WarningProps) {
  const { mutate: addReport, isPending: isLoading } = useAddReport();
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<string>('');
  const [content, setContent] = useState<string>(''); 

  const handleClick = () => {
    if (isAuthenticated) {
      setIsOpen(true);
    } else if (onAuthRequired) {
      onAuthRequired();
    }
  };

  const handleSubmit = () => {
    if (!reason) {
      alert('Vui lòng chọn một lý do báo cáo!');
      return;
    }

    const payload = {
      postId,
      reason,
      content: content || undefined, 
      status: 'pending', 
    };
    console.log('Payload sent to API:', payload); // Debug payload

    addReport(payload, {
      onSuccess: () => {
        alert('Báo cáo đã được gửi thành công!');
        setIsOpen(false);
        setReason('');
        setContent('');
      },
      onError: (error: any) => {
        console.error('API error:', error.response?.data || error.message);
        alert(`Có lỗi xảy ra khi gửi báo cáo: ${error.response?.data?.message || 'Vui lòng thử lại.'}`);
      },
    });
  };

  return (
    <div className="warning">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="text-[24px] cursor-pointer" onClick={handleClick}>
            <IoWarningOutline />
          </div>
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <p>Cảnh báo</p>
        </HoverCardContent>
      </HoverCard>

      {isAuthenticated && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[500px]">
            <div>
              <div>
                <span className="text-lg font-[500]">
                  Báo cáo tin rao có thông tin không đúng
                </span>
              </div>
              <div className="border border-gray-100 my-[10px]"></div>
              <RadioGroup
                value={reason}
                onValueChange={setReason}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Địa chỉ của bất động sản" id="terms1" />
                  <label
                    htmlFor="terms1"
                    className="text-sm font-normal leading-none"
                  >
                    Địa chỉ của bất động sản
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Thông tin giá, diện tích, mô tả không chính xác"
                    id="terms2"
                  />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-normal leading-none"
                  >
                    Thông tin giá, diện tích, mô tả không chính xác
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Ảnh trùng với tin rao khác" id="terms3" />
                  <label
                    htmlFor="terms3"
                    className="text-sm font-normal leading-none"
                  >
                    Ảnh trùng với tin rao khác
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Không liên lạc được" id="terms4" />
                  <label
                    htmlFor="terms4"
                    className="text-sm font-normal leading-none"
                  >
                    Không liên lạc được
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Tin không có thật" id="terms5" />
                  <label
                    htmlFor="terms5"
                    className="text-sm font-normal leading-none"
                  >
                  Tin không có thật
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Bất động sản đã bán" id="terms6" />
                  <label
                    htmlFor="terms6"
                    className="text-sm font-normal leading-none"
                  >
                  Bất động sản đã bán
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="khác" id="terms7" />
                  <label
                    htmlFor="terms7"
                    className="text-sm font-normal leading-none"
                  >
                  khác
                  </label>
                </div>
                <div>
                  <Textarea
                    placeholder="Mô tả chi tiết về vấn đề..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-4"
                  />
                </div>
                <Button
                  className="w-full bg-[#E03C31] hover:bg-[#FF837A] mt-4"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  <span>{isLoading ? 'Đang gửi...' : 'Gửi'}</span>
                </Button>
              </RadioGroup>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Warning;