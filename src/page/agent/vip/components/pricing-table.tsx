import { useState, useRef, useEffect } from 'react';
import { Check, X, ArrowRight, Crown, Star, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, useAnimation, useInView } from 'framer-motion';
import PaymentModal from './payment-modal';

export default function PricingTable() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: <Star className='h-8 w-8 text-yellow-400' />,
      description: 'Phù hợp với người mới hoặc giỏ hàng nhỏ',
      price: '0',
      originalPrice: '',
      discount: '',
      savings: '',
      color: 'bg-gradient-to-b from-white to-gray-50',
      hoverColor: 'hover:border-yellow-400',
      shadowColor: 'shadow-yellow-400/10',
      features: [
        { name: '15 tin mỗi tháng', included: true },
        { name: 'Hiện thị trong 10 ngày', included: true },
        { name: 'Ưu tiên đề xuất', included: false },
        { name: 'Báo cáo tương tác', included: false },
        { name: 'Giảm giá cho lần sau', included: false },
      ],
      buttonText: 'Mua ngay',
    },
    {
      id: 'silver',
      name: 'Bạc',
      icon: <Shield className='h-8 w-8 text-red-500' />,
      description: 'Phù hợp với môi giới chuyên nghiệp có giỏ hàng từ 10 BĐS',
      price: '250.000',
      originalPrice: '500.000',
      discount: '-50%',
      savings: 'Tiết kiệm 250.000đ mỗi tháng',
      color: 'bg-gradient-to-b from-white to-red-50',
      hoverColor: 'hover:border-red-500',
      shadowColor: 'shadow-red-500/10',
      features: [
        { name: '30 tin mỗi tháng', included: true },
        { name: 'Hiện thị trong 30 ngày', included: true },
        { name: 'Ưu tiên đề xuất (7 ngày)', included: true },
        { name: 'Báo cáo tương tác', included: false },
        { name: 'Giảm giá 8% cho lần sau', included: false },
      ],
      buttonText: 'Mua ngay',
    },
    {
      id: 'gold',
      name: 'Vàng',
      icon: <Crown className='h-8 w-8 text-amber-500' />,
      description: 'Phù hợp với môi giới có giỏ hàng và ngân sách quảng cáo lớn',
      price: '500.000',
      originalPrice: '750.000',
      discount: '-33%',
      savings: 'Tiết kiệm 250.000đ mỗi tháng',
      color: 'bg-gradient-to-b from-white to-amber-50',
      hoverColor: 'hover:border-amber-500',
      shadowColor: 'shadow-amber-500/20',
      features: [
        { name: 'Không giới hạn tin đăng', included: true },
        { name: 'Hiện thị trong 60 ngày', included: true },
        { name: 'Ưu tiên đề xuất (14 ngày)', included: true },
        { name: 'Báo cáo tương tác', included: true },
        { name: 'Giảm giá 8% cho lần sau', included: true },
      ],
      buttonText: 'Mua ngay',
      popular: true,
    },
    {
      id: 'diamond',
      name: 'Kim Cương',
      icon: <Zap className='h-8 w-8 text-blue-500' />,
      description: 'Phù hợp với môi giới có giỏ hàng và ngân sách quảng cáo lớn',
      price: '800.000',
      originalPrice: '1.200.000',
      discount: '-33%',
      savings: 'Tiết kiệm 400.000đ mỗi tháng',
      color: 'bg-gradient-to-b from-white to-blue-50',
      hoverColor: 'hover:border-blue-500',
      shadowColor: 'shadow-blue-500/10',
      features: [
        { name: 'Không giới hạn tin đăng', included: true },
        { name: 'Không giới hạn thời gian', included: true },
        { name: 'Ưu tiên đề xuất (30 ngày)', included: true },
        { name: 'Báo cáo tương tác', included: true },
        { name: 'Giảm giá 15% cho lần sau', included: true },
      ],
      buttonText: 'Mua ngay',
    },
  ];

  const handleOpenModal = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };


  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' ref={ref}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            custom={i}
            initial='hidden'
            animate={controls}
            whileHover={{
              y: -20,
              scale: 1,
              boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)',
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 12,
              delay: 0.05,
            }}
            onHoverStart={() => setHoveredCard(plan.id)}
            onHoverEnd={() => setHoveredCard(null)}
            className='z-10'
          >
            <Card
              className={`h-full border border-gray-200 rounded-[8px] transition-all duration-300 ${plan.color} ${plan.hoverColor} ${
                hoveredCard === plan.id ? `shadow-xl ${plan.shadowColor}` : 'shadow-md'
              } ${plan.popular ? 'border-amber-500' : ''} relative overflow-hidden`}
            >
              {plan.popular && (
                <div className='absolute top-0 right-0'>
                  <div className='bg-amber-500 text-white text-xs font-bold py-1 px-3 shadow-lg transform rotate-0 translate-x-2 -translate-y-0 origin-bottom-left'>
                    Bán chạy nhất
                  </div>
                </div>
              )}

              {plan.popular && (
                <motion.div
                  className='absolute inset-0 bg-amber-500 opacity-0 pointer-events-none'
                  animate={{
                    opacity: [0, 0.05, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                  }}
                />
              )}

              <CardHeader className='pb-3 relative'>
                <div className='flex justify-between items-center mb-1'>
                  <div
                    className={`p-2 rounded-full ${
                      plan.id === 'free'
                        ? 'bg-yellow-100'
                        : plan.id === 'silver'
                          ? 'bg-red-100'
                          : plan.id === 'gold'
                            ? 'bg-amber-100'
                            : 'bg-blue-100'
                    }`}
                  >
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className='text-base font-bold'>Hội viên {plan.name}</CardTitle>
                <CardDescription className='text-xs h-8'>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className='pb-3'>
                <div className='mb-4'>
                  <div className='flex items-baseline'>
                    <span className='text-xs text-gray-500 mr-1'>từ</span>
                    <span className='text-xl font-bold'>{plan.price}đ</span>
                    <span className='text-xs text-gray-500 ml-1'>/tháng</span>
                    {plan.discount && (
                      <motion.span
                        className='ml-2 text-xs font-medium text-red-500'
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: 'reverse',
                        }}
                      >
                        {plan.discount}
                      </motion.span>
                    )}
                  </div>
                  {plan.savings && <p className='text-xs text-gray-500 mt-1'>{plan.savings}</p>}
                </div>

                <div className='space-y-3'>
                  <h4 className='text-xs font-medium border-b pb-1'>Gói tin hàng tháng</h4>
                  <ul className='space-y-2'>
                    {plan.features.map((feature, index) => (
                      <li key={index} className='flex items-start'>
                        {feature.included ? (
                          <Check className='h-3 w-3 text-green-500 mr-1.5 mt-0.5 shrink-0' />
                        ) : (
                          <X className='h-3 w-3 text-red-500 mr-1.5 mt-0.5 shrink-0' />
                        )}
                        <span className={`text-xs ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full group relative overflow-hidden text-xs py-1.5 ${
                    plan.id === 'free'
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : plan.id === 'silver'
                        ? 'bg-red-500 hover:bg-red-600'
                        : plan.id === 'gold'
                          ? 'bg-amber-500 hover:bg-amber-600'
                          : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  onClick={() => handleOpenModal(plan)}
                >
                  <span className='relative z-10 flex items-center justify-center'>
                    {plan.buttonText}
                    <ArrowRight className='ml-1 h-3 w-3 transition-transform group-hover:translate-x-1' />
                  </span>
                  <span className='absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300'></span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} plan={selectedPlan} />
    </>
  );
}
