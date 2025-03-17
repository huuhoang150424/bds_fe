import { CustomImage } from "@/components/common";

function Relate() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className='border border-gray-100 rounded-xl p-4 flex flex-col items-center hover:shadow-md transition-all hover:-translate-y-1'
        >
          <CustomImage
            src='https://th.bing.com/th/id/OIP.GU7rALcQVFnrd9dY76jgpAHaEc?rs=1&pid=ImgDetMain'
            alt={`Company ${item}`}
            width={120}
            height='auto'
            className='h-16 w-16 object-contain mb-3'
          />
          <div className='text-center'>
            <h3 className='font-medium text-gray-800'>Chung cư Rivera Park Hà Nội</h3>
            <p className='text-sm text-gray-500 mt-2'>Sunshine Center</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Relate;
