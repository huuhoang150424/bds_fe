
import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function AboutTeam() {
  const team = [
    {
      name: "Nguyễn Văn Anh",
      position: "Tổng Giám đốc",
      image: "https://offer.rever.vn/hubfs/anhdep3-min.jpg",
      bio: "Hơn 20 năm kinh nghiệm trong lĩnh vực bất động sản cao cấp.",
    },
    {
      name: "Trần Thị Bình",
      position: "Giám đốc Kinh doanh",
      image: "https://offer.rever.vn/hubfs/can-ho-sunrise-riverside-30.jpg",
      bio: "Chuyên gia tư vấn bất động sản với hơn 15 năm kinh nghiệm.",
    },
    {
      name: "Lê Văn Cường",
      position: "Giám đốc Tài chính",
      image: "https://cdn.guland.vn/files/mua-ban-nha-dat-bat-dong-san-duong-nguyen-xien-phuong-long-thanh-my-quan-9-guland-5879-5363063.jpg",
      bio: "Thạc sĩ Tài chính, từng làm việc tại các tập đoàn lớn.",
    },
    {
      name: "Phạm Thị Dung",
      position: "Giám đốc Marketing",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNMMSTUXIYzLqtZtuC6u1MrBG3kX4dkqkpKA&s",
      bio: "Chuyên gia marketing với nhiều chiến dịch thành công.",
    },
  ]

  return (
    <section className="py-12 bg-white px-[100px]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-red-700">Đội ngũ lãnh đạo</h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
            Đội ngũ lãnh đạo giàu kinh nghiệm và tâm huyết của LuxEstate, những người đã và đang dẫn dắt công ty vươn
            tới những tầm cao mới.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              // whileHover={{
              //   scale: 1.03,
              //   boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              // }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-red-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-3 flex justify-center gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  initial={{ y: 50 }}
                  whileHover={{ y: 0 }}
                >
                  <motion.a
                    href="#"
                    className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                  >
                    <Facebook className="h-3.5 w-3.5 text-white" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                  >
                    <Twitter className="h-3.5 w-3.5 text-white" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                  >
                    <Instagram className="h-3.5 w-3.5 text-white" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                  >
                    <Linkedin className="h-3.5 w-3.5 text-white" />
                  </motion.a>
                </motion.div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold">{member.name}</h3>
                <p className="text-xs text-red-600 mb-2">{member.position}</p>
                <p className="text-xs text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
