import { motion } from "framer-motion"
import { Award, Heart, Shield, Target, Users, Zap } from "lucide-react"

export function AboutValues() {
  const values = [
    {
      icon: <Shield className="h-5 w-5 text-red-600" />,
      title: "Uy tín",
      description: "Chúng tôi luôn đặt chữ tín lên hàng đầu trong mọi giao dịch với khách hàng và đối tác.",
    },
    {
      icon: <Award className="h-5 w-5 text-red-600" />,
      title: "Chất lượng",
      description: "Cam kết mang đến những sản phẩm và dịch vụ bất động sản chất lượng cao nhất.",
    },
    {
      icon: <Heart className="h-5 w-5 text-red-600" />,
      title: "Tận tâm",
      description: "Luôn lắng nghe và đặt lợi ích của khách hàng lên hàng đầu trong mọi quyết định.",
    },
    {
      icon: <Target className="h-5 w-5 text-red-600" />,
      title: "Chuyên nghiệp",
      description: "Đội ngũ nhân viên được đào tạo bài bản, làm việc chuyên nghiệp và hiệu quả.",
    },
    {
      icon: <Zap className="h-5 w-5 text-red-600" />,
      title: "Đổi mới",
      description: "Không ngừng đổi mới và áp dụng công nghệ hiện đại vào hoạt động kinh doanh.",
    },
    {
      icon: <Users className="h-5 w-5 text-red-600" />,
      title: "Cộng đồng",
      description: "Đóng góp tích cực vào sự phát triển của cộng đồng và xã hội.",
    },
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-white to-red-50 px-[100px]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 bg-red-100 rounded-full text-red-700 text-xs font-medium mb-3">
            Giá trị cốt lõi
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-red-700">Những giá trị định hình chúng tôi</h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
            Những giá trị cốt lõi định hình nên văn hóa và cách thức hoạt động của LuxEstate, giúp chúng tôi luôn giữ
            vững vị thế hàng đầu trong lĩnh vực bất động sản cao cấp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backgroundColor: "rgba(254, 226, 226, 0.3)",
              }}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:border-red-200 transition-all"
            >
              <motion.div
                className="bg-red-50 p-3 rounded-full w-fit mb-4"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {value.icon}
              </motion.div>
              <h3 className="text-sm md:text-base font-semibold mb-2">{value.title}</h3>
              <p className="text-xs text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
