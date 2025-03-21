import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function Faqs() {
  return (
    <div>
        {/* FAQ Section */}
        <Card className="mb-16 border border-gray-200 rounded-[10px]">
          <CardHeader>
            <CardTitle className='text-3xl'>Câu hỏi thường gặp</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full space-y-[30px]">
              <AccordionItem value="item-1">
                <AccordionTrigger>Hội Hội viên cung cấp các quyền lợi hàng tháng như thế nào?</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      Hội Hội viên có thời hạn trong 3 tháng hoặc 6 tháng. Bạn sẽ nhận được các quyền lợi theo từng
                      tháng (30 ngày). Các quyền lợi có thể hạn sử dụng là 30 ngày. Sau mỗi 30 ngày các quyền lợi sẽ tự
                      động được làm mới.
                    </p>

                    <p>Ví dụ: Ngày 15/03, bạn đăng ký Gói Hội viên Tiêu chuẩn trong vòng 3 tháng:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        Ngày 15/03: Kích hoạt các quyền lợi của Gói Hội viên Tiêu chuẩn với thời hạn sử dụng trong 30
                        ngày, bao gồm:
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Voucher miễn phí 1 Tin Vip Bạc (7 ngày)</li>
                          <li>Voucher miễn phí 30 Tin Thường (10 ngày)</li>
                          <li>Voucher miễn phí 30 lượt đẩy tin (dùng cho Tin Thường và Tin đẩy)</li>
                          <li>Các tiện ích hàng ngày (Xuất bản nhanh, Hẹn giờ đăng tin, Báo cáo hiệu suất...)</li>
                        </ul>
                      </li>
                      <li>
                        Ngày 14/04: Các quyền lợi trong 30 ngày đầu tiên hết hạn. Tài khoản nhận quyền lợi đợt tiếp theo
                        với thời hạn sử dụng trong 30 ngày.
                      </li>
                      <li>
                        Ngày 14/05: Các quyền lợi trong 30 ngày trước hết hạn. Tài khoản nhận quyền lợi đợt tiếp theo
                        với thời hạn sử dụng trong 30 ngày.
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Sau khi đăng ký Gói Hội viên thành công, các voucher đăng tin/đẩy tin sẽ được lưu ở đâu?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    Sau khi đăng ký Gói Hội viên, voucher đăng tin/đẩy tin sẽ được lưu tại mục "Khuyến mãi" trong tài
                    khoản đăng tin của bạn.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Tôi có thể quản lý các quyền lợi trong Gói Hội viên đã mua như thế nào?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    Bạn có thể quản lý các quyền lợi trong Gói Hội viên đã mua thông qua trang quản lý tài khoản của
                    mình. Tại đây, bạn có thể xem số lượng tin đăng còn lại, thời hạn sử dụng, và các quyền lợi khác.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Hội Hội viên của tôi sẽ gia hạn như thế nào?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    Gói Hội viên của bạn sẽ không tự động gia hạn. Trước khi hết hạn, hệ thống sẽ gửi thông báo để bạn
                    có thể gia hạn nếu muốn tiếp tục sử dụng dịch vụ.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Tôi có thể hủy Gói Hội viên nếu không cần nữa không?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    Sau khi đăng ký Gói Hội viên, bạn không thể hủy gói trong thời gian sử dụng. Gói sẽ tự động kết thúc
                    sau khi hết hạn đăng ký.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>
                  Nếu tài tin đang đã sử dụng voucher Gói Hội viên, tôi có được hoàn lại voucher không?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    Voucher đã sử dụng sẽ không được hoàn lại trong bất kỳ trường hợp nào. Vui lòng cân nhắc kỹ trước
                    khi sử dụng voucher từ Gói Hội viên của bạn.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
    </div>
  )
}

export default Faqs