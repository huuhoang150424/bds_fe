//@ts-nocheck

import { motion } from 'framer-motion';

export function AboutContent() {
  return (
    <section className='py-12 bg-white relative overflow-hidden px-[100px]'>
      <div className='absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full opacity-70 translate-x-1/2 -translate-y-1/2'></div>
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-red-50 rounded-full opacity-60 -translate-x-1/3 translate-y-1/3'></div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'
          >
            <div className='inline-block px-3 py-1 bg-red-50 rounded-full text-red-700 text-xs font-medium mb-4'>
              Câu chuyện của chúng tôi
            </div>
            <h2 className='text-2xl md:text-3xl font-bold mb-4 text-red-700'>Hành trình phát triển</h2>
            <div className='space-y-3'>
              <p className='text-xs md:text-sm text-gray-700'>
                LuxEstate được thành lập vào năm 2008 với sứ mệnh mang đến những giải pháp bất động sản cao cấp, đáp ứng
                nhu cầu ngày càng cao của khách hàng tại Việt Nam.
              </p>
              <p className='text-xs md:text-sm text-gray-700'>
                Trải qua hơn 15 năm phát triển, chúng tôi đã trở thành một trong những đơn vị hàng đầu trong lĩnh vực
                bất động sản cao cấp, với mạng lưới rộng khắp các thành phố lớn như Hà Nội, TP. Hồ Chí Minh, Đà Nẵng,
                Nha Trang và Phú Quốc.
              </p>
              <p className='text-xs md:text-sm text-gray-700'>
                Chúng tôi tự hào đã giúp hơn 10,000 khách hàng tìm được ngôi nhà mơ ước hoặc cơ hội đầu tư sinh lời. Với
                đội ngũ chuyên gia giàu kinh nghiệm và am hiểu thị trường, LuxEstate cam kết mang đến dịch vụ tư vấn
                chuyên nghiệp, minh bạch và hiệu quả.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            transition={{
              whileInView: { duration: 0.6 },
              //whileHover: { type: 'spring', stiffness: 300, damping: 15 },
            }}
            viewport={{ once: true }}
            className='relative h-[300px] md:h-[400px] rounded-lg overflow-hidden'
          >
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTMHzHuz3vdOjHrB53ayrezvjjJiywBX3Bv_rFj_FLk-cr33jqbiy_1ePAZFZlAiwWI9M&usqp=CAU' alt='Luxury real estate office' className='object-cover w-full h-full ' />
            <div className='absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent' />
            <div className='absolute bottom-0 left-0 p-4'>
              <p className='text-xs md:text-sm text-white font-medium'>Trụ sở chính LuxEstate tại TP. Hồ Chí Minh</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
