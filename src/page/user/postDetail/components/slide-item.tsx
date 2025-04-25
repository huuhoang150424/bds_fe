import { Slider } from '@/components/core/carousel';

const SliderItem = ({
  src,
  alt = 'image',
  onClick,
}: {
  src: string;
  alt?: string;
  onClick?: () => void;
  countImg?: number;
}) => (
  <Slider className='xl:h-[400px] sm:h-[350px] h-[300px] w-full mb-0 relative' thumnailSrc={src}>
    <img
      src={src}
      width='full'
      height={400}
      alt={alt}
      className='h-full object-cover rounded-lg w-full cursor-pointer'
      onClick={onClick}
    />
  </Slider>
);
export default SliderItem;
