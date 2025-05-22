
import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Building } from "lucide-react"

export function ContactMap() {
  const [activeOffice, setActiveOffice] = useState(0)

  const offices = [
    {
      name: "Trụ sở chính TP. Hồ Chí Minh",
      address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      phone: "+84 123 456 789",
      email: "hcm@luxestate.com",
      hours: "Thứ Hai - Thứ Sáu: 8:00 - 18:00",
    },
    {
      name: "Văn phòng Hà Nội",
      address: "45 Phố Lý Thường Kiệt, Quận Hoàn Kiếm, Hà Nội",
      phone: "+84 234 567 890",
      email: "hanoi@luxestate.com",
      hours: "Thứ Hai - Thứ Sáu: 8:00 - 18:00",
    },
    {
      name: "Văn phòng Đà Nẵng",
      address: "78 Đường Bạch Đằng, Quận Hải Châu, Đà Nẵng",
      phone: "+84 345 678 901",
      email: "danang@luxestate.com",
      hours: "Thứ Hai - Thứ Sáu: 8:00 - 17:30",
    },
  ]

  return (
    <section className="py-12 bg-white relative overflow-hidden px-[100px]">
      {/* Thêm các hình trang trí */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-red-50 rounded-full opacity-50 -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-50 rounded-full opacity-40 translate-x-1/4 translate-y-1/4"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 bg-red-100 rounded-full text-red-700 text-xs font-medium mb-3">
            Vị trí
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-red-700">Vị trí văn phòng</h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
            Các văn phòng của LuxEstate trên toàn quốc, sẵn sàng phục vụ mọi nhu cầu của khách hàng.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {offices.map((office, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeOffice === index
                  ? "border-red-300 bg-red-50 shadow-md"
                  : "border-gray-200 hover:border-red-200 hover:bg-red-50/30"
              }`}
              onClick={() => setActiveOffice(index)}
            >
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <Building className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{office.name}</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-600">{office.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <p className="text-xs text-gray-600">{office.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <p className="text-xs text-gray-600">{office.email}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-600">{office.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-md"
        >
          {/* Placeholder for map - in a real application, you would integrate Google Maps or similar */}
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="bg-red-100 p-3 rounded-full mx-auto mb-4 w-fit">
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{offices[activeOffice].name}</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">{offices[activeOffice].address}</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Xem chỉ đường
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
