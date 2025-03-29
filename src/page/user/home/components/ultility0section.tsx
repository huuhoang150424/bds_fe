export default function UtilitySection() {
    return (
      <div className="max-w-6xl mx-auto px-[60px] py-[60px]">
        <div className="title flex justify-between items-center pb-[20px]">
          <h2 className="text-[22px] font-bold">Hỗ trợ tiện ích</h2>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Xem tuổi xây nhà */}
          <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#E03C31] transition-colors cursor-pointer group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#E8F7F7]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#00B4D8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 6V12L16 14" stroke="#00B4D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#E03C31]">Xem tuổi xây nhà</h3>
              <p className="text-sm text-gray-500">Xem tuổi xây nhà hợp phong thủy</p>
            </div>
          </div>
  
          {/* Chi phí làm nhà */}
          <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#E03C31] transition-colors cursor-pointer group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FFF4DE]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z"
                  stroke="#FFA800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="#FFA800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M1 9H23" stroke="#FFA800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#E03C31]">Chi phí làm nhà</h3>
              <p className="text-sm text-gray-500">Tính toán chi phí xây dựng</p>
            </div>
          </div>
  
          {/* Tính lãi suất */}
          <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#E03C31] transition-colors cursor-pointer group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#E8E8FC]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="#696CFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
                  stroke="#696CFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M16 8V14" stroke="#696CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 8V14" stroke="#696CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#E03C31]">Tính lãi suất</h3>
              <p className="text-sm text-gray-500">Tính lãi suất vay mua nhà</p>
            </div>
          </div>
  
          {/* Tư vấn phong thủy */}
          <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#E03C31] transition-colors cursor-pointer group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FFE2E5]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                  stroke="#FF424F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 1V3" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 21V23" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M4.22 4.22L5.64 5.64"
                  stroke="#FF424F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.36 18.36L19.78 19.78"
                  stroke="#FF424F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M1 12H3" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12H23" stroke="#FF424F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M4.22 19.78L5.64 18.36"
                  stroke="#FF424F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.36 5.64L19.78 4.22"
                  stroke="#FF424F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#E03C31]">Tư vấn phong thủy</h3>
              <p className="text-sm text-gray-500">Xem hướng nhà hợp phong thủy</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  