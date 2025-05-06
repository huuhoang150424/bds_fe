import { motion } from 'framer-motion';

export function AboutTimeline() {
  const milestones = [
    {
      year: '2008',
      title: 'Thành lập công ty',
      description: 'LuxEstate được thành lập tại TP. Hồ Chí Minh với đội ngũ 10 nhân viên.',
    },
    {
      year: '2010',
      title: 'Mở rộng thị trường',
      description: 'Mở văn phòng đại diện tại Hà Nội và bắt đầu mở rộng thị trường miền Bắc.',
    },
    {
      year: '2013',
      title: 'Giải thưởng đầu tiên',
      description: "Nhận giải thưởng 'Đơn vị môi giới bất động sản tiêu biểu' lần đầu tiên.",
    },
    {
      year: '2015',
      title: 'Hợp tác quốc tế',
      description: 'Ký kết hợp tác với các đối tác quốc tế từ Singapore, Hàn Quốc và Nhật Bản.',
    },
    {
      year: '2018',
      title: 'Kỷ niệm 10 năm',
      description: 'Kỷ niệm 10 năm thành lập với hơn 5,000 giao dịch thành công.',
    },
    {
      year: '2020',
      title: 'Chuyển đổi số',
      description: 'Triển khai chiến lược chuyển đổi số toàn diện trong hoạt động kinh doanh.',
    },
    {
      year: '2023',
      title: 'Mở rộng quy mô',
      description: 'Mở rộng mạng lưới với 10 văn phòng trên toàn quốc và hơn 300 nhân viên.',
    },
  ];

  return (
    <section className='py-12 bg-red-50 px-[100px] '>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-10'
        >
          <h2 className='text-2xl md:text-3xl font-bold mb-3 text-red-700'>Hành trình phát triển</h2>
          <p className='text-xs md:text-sm text-gray-600 max-w-2xl mx-auto'>
            Những cột mốc quan trọng đánh dấu hành trình phát triển của LuxEstate từ khi thành lập đến nay.
          </p>
        </motion.div>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-red-200' />

          <div className='space-y-12'>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className='flex-1' />

                {/* Timeline dot */}
                <div className='absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 z-10 border-2 border-white' />

                {/* Content */}
                <div className='flex-1 p-4'>
                  <div
                    className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 ${
                      index % 2 === 0 ? 'mr-6' : 'ml-6'
                    }`}
                  >
                    <div className='bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded w-fit mb-2'>
                      {milestone.year}
                    </div>
                    <h3 className='text-sm font-semibold mb-1'>{milestone.title}</h3>
                    <p className='text-xs text-gray-600'>{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
