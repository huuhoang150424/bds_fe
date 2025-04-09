import Carousel, { Slider, SliderContainer, ThumsSlider } from '@/components/core/carousel';
import { CustomImage } from '@/components/common';
const SliderItem = ({ src, alt = 'image', onClick }: { src: string; alt?: string; onClick?: () => void }) => (
  <Slider className="xl:h-[400px] sm:h-[350px] h-[300px] w-full mb-0" thumnailSrc={src}>
    <CustomImage
      src={src}
      width="full"
      height={400}
      alt={alt}
      className="h-full object-cover rounded-lg w-full cursor-pointer"
      onClick={onClick} // Truyền sự kiện click vào CustomImage
    />
  </Slider>
);
export default SliderItem;