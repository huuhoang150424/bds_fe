export default function InfoSection() {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Bất động sản bán */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#E03C31]" fill="currentColor">
                  <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm9-8.586 6 6V15l.001 5H6v-9.586l6-6z" />
                  <path d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#E03C31] transition-colors">
                Bất động sản bán
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Bạn có thể tìm thấy ngôi nhà mơ ước hoặc cơ hội đầu tư hấp dẫn thông qua lượng tin rao lớn, uy tín về các
                loại hình
                <span className="text-[#E03C31]"> bất động sản bán</span> tại Việt Nam, bao gồm bán nhà riêng,
                <span className="text-[#E03C31]"> bán nhà mặt tiền</span>, bán căn hộ chung cư,
                <span className="text-[#E03C31]"> bán biệt thự</span>, bán đất,
                <span className="text-[#E03C31]"> bán shophouse</span> và các loại hình BĐS khác.
              </p>
            </div>
          </div>
  
          {/* Bất động sản cho thuê */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#E03C31]" fill="currentColor">
                  <path d="M19 2H5C3.346 2 2 3.346 2 5v2.831c0 1.053.382 2.01 1 2.746V19c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8.424c.618-.735 1-1.692 1-2.746V5c0-1.654-1.346-3-3-3zm1 3v2.831c0 1.14-.849 2.112-1.891 2.167L18 10c-1.103 0-2-.897-2-2V4h3c.552 0 1 .449 1 1zM10 4h4v4c0 1.103-.897 2-2 2s-2-.897-2-2V4zM4 5c0-.551.448-1 1-1h3v4c0 1.103-.897 2-2 2l-.109-.003C4.849 9.943 4 8.971 4 7.831V5zm6 14v-3h4v3h-4zm6 0v-3c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H5v-7.131c.254.067.517.111.787.125A3.988 3.988 0 0 0 9 10.643c.733.832 1.807 1.357 3 1.357s2.267-.525 3-1.357a3.988 3.988 0 0 0 3.213 1.351c.271-.014.533-.058.787-.125V19h-3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#E03C31] transition-colors">
                Bất động sản cho thuê
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Cập nhật thường xuyên và đầy đủ các loại hình
                <span className="text-[#E03C31]"> bất động sản cho thuê</span> như: thuê phòng trọ, nhà riêng,
                <span className="text-[#E03C31]"> thuê biệt thự</span>, văn phòng, kho xưởng hay
                <span className="text-[#E03C31]"> thuê mặt bằng</span> kinh doanh giúp bạn nhanh chóng tìm được bất động
                sản ưng ý.
              </p>
            </div>
          </div>
  
          {/* Đánh giá dự án */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#E03C31]" fill="currentColor">
                  <path d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H5.17l-1.17 1.17V4h16v12z" />
                  <path d="m12.445 10.964-.866-3.351a1 1 0 0 0-1.931.498l.867 3.351a1 1 0 0 0 1.93-.498z" />
                  <path d="m16.445 10.964-.866-3.351a1 1 0 0 0-1.931.498l.867 3.351a1 1 0 0 0 1.93-.498z" />
                  <path d="m8.445 10.964-.866-3.351a1 1 0 0 0-1.931.498l.867 3.351a1 1 0 0 0 1.93-.498z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#E03C31] transition-colors">Đánh giá dự án</h3>
              <p className="text-sm text-gray-600 text-center">
                Các <span className="text-[#E03C31]">video đánh giá tổng quan dự án</span> cung cấp góc nhìn khách quan
                của các chuyên gia về những dự án nổi bật tại Việt Nam, giúp bạn đưa ra quyết định đúng đắn cho nơi an cư
                lý tưởng hoặc cơ hội đầu tư sinh lời.
              </p>
            </div>
          </div>
  
          {/* Wiki BDS */}
          <div className="group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#E03C31]" fill="currentColor">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                  <path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#E03C31] transition-colors">Wiki BDS</h3>
              <p className="text-sm text-gray-600 text-center">
                Ngoài cập nhật những biến động thị trường, chúng tôi còn cung cấp kiến thức, kinh nghiệm về mua bán, cho
                thuê, đầu tư, vay mua nhà,
                <span className="text-[#E03C31]"> phong thủy</span>, thiết kế nhà, mọi thông tin cần thiết để dẫn lối
                người tìm nhà tìm thấy căn nhà mơ ước.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  