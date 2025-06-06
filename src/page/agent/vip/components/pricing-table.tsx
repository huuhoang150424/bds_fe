import { useState, useRef, useEffect } from 'react';
import { Check, X, ArrowRight, Crown, Star, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, useAnimation, useInView } from 'framer-motion';
import PaymentModal from './payment-modal';
import { useGetPricings } from '@/page/admin/pricing/hooks/use-get-pricings';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { useGetPurchasedPackages } from '../hooks/use-get-my-pricing';

const SkeletonCard = () => {
  return (
    <Card className="h-full border border-gray-200 rounded-[8px] shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center mb-1">
          <div className="p-2 rounded-full bg-gray-200 w-12 h-12 animate-pulse"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full mt-2 animate-pulse"></div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="mb-4">
          <div className="flex items-baseline">
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 ml-2 animate-pulse"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <ul className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <li key={index} className="flex items-start">
                <div className="h-3 w-3 bg-gray-200 rounded-full mr-1.5 mt-0.5 shrink-0 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
      </CardFooter>
    </Card>
  );
};

export default function PricingTable() {
  useScrollToTopOnMount();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data: pricings, isLoading: isPricingsLoading } = useGetPricings(1, 10);
  const { data: purchasedPackages, isLoading: isPurchasedLoading } = useGetPurchasedPackages(1, 10);
  const allPricings = pricings?.data?.data || [];
  const purchased = purchasedPackages?.data?.data || [];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isPlanPurchasedAndActive = (pricingId: string) => {
    if (!purchased || purchased.length === 0) {
      return false;
    }
    return purchased.some(
      (pkg: any) =>
        pkg?.pricing?.id === pricingId &&
        new Date(pkg.endDate) > new Date()
    );
  };

  const plans = allPricings.map((plan: any, index: number) => {
    const discountPercent = plan.discountPercent || 0;
    const originalPrice = discountPercent > 0 ? Math.round(plan.price / (1 - discountPercent / 100)) : plan.price;
    const savings = originalPrice - plan.price;

    const features = [
      {
        name: plan.maxPost === -1 ? 'Không giới hạn tin đăng' : `${plan.maxPost} tin mỗi tháng`,
        included: true,
      },
      {
        name: plan.displayDay === -1 ? 'Không giới hạn thời gian' : `Hiển thị trong ${plan.displayDay} ngày`,
        included: true,
      },
      {
        name: plan.boostDays > 0 ? `Ưu tiên đề xuất (${plan.boostDays} ngày)` : 'Ưu tiên đề xuất',
        included: plan.boostDays > 0,
      },
      {
        name: 'Báo cáo tương tác',
        included: plan.hasReport,
      },
      {
        name: discountPercent > 0 ? `Giảm giá ${discountPercent}% cho lần sau` : 'Giảm giá cho lần sau',
        included: discountPercent > 0,
      },
    ];

    const iconMap = [
      { icon: <Star className='h-8 w-8 text-yellow-400' />, bg: 'bg-yellow-100', button: 'bg-gray-800 hover:bg-gray-700' },
      { icon: <Shield className='h-8 w-8 text-red-500' />, bg: 'bg-red-100', button: 'bg-red-500 hover:bg-red-600' },
      { icon: <Crown className='h-8 w-8 text-amber-500' />, bg: 'bg-amber-100', button: 'bg-amber-500 hover:bg-amber-600' },
      { icon: <Zap className='h-8 w-8 text-blue-500' />, bg: 'bg-blue-100', button: 'bg-blue-500 hover:bg-blue-600' },
    ];

    const colorMap = [
      { color: 'bg-gradient-to-b from-white to-gray-50', hoverColor: 'hover:border-yellow-400', shadowColor: 'shadow-yellow-400/10' },
      { color: 'bg-gradient-to-b from-white to-red-50', hoverColor: 'hover:border-red-500', shadowColor: 'shadow-red-500/10' },
      { color: 'bg-gradient-to-b from-white to-amber-50', hoverColor: 'hover:border-amber-500', shadowColor: 'shadow-amber-500/20' },
      { color: 'bg-gradient-to-b from-white to-blue-50', hoverColor: 'hover:border-blue-500', shadowColor: 'shadow-blue-500/10' },
    ];

    const iconData = iconMap[index % iconMap.length];
    const colorData = colorMap[index % iconMap.length];
    const isPurchased = isPlanPurchasedAndActive(plan.id);

    return {
      id: plan.id,
      name: plan.name,
      icon: iconData.icon,
      iconBg: iconData.bg,
      description: plan.description,
      price: formatCurrency(plan.price),
      originalPrice: formatCurrency(originalPrice),
      savings: savings > 0 ? `Tiết kiệm ${formatCurrency(savings)}đ mỗi tháng` : '',
      color: colorData.color,
      hoverColor: colorData.hoverColor,
      shadowColor: colorData.shadowColor,
      features,
      buttonText: isPurchased ? 'Đã mua' : 'Mua ngay',
      buttonClass: isPurchased ? 'bg-gray-400 cursor-not-allowed' : iconData.button,
      popular: plan.name.includes('VIP_3'),
      isPurchased,
    };
  });

  const handleOpenModal = (plan: any) => {
    if (!plan.isPurchased) {
      setSelectedPlan(plan);
      setIsModalOpen(true);
    }
  };

  if (isPricingsLoading || isPurchasedLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' ref={ref}>
        {plans.map((plan: any, i: number) => (
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
              {plan.isPurchased && (
                <div className='absolute top-0 left-0'>
                  <div className='bg-green-500 text-white text-xs font-bold py-1 px-3 shadow-lg transform rotate-0 -translate-x-2 -translate-y-0 origin-top-left'>
                    Đã mua
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
                  <div className={`p-2 rounded-full ${plan.iconBg}`}>
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
                    {plan.features.map((feature: any, index: number) => (
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
                  className={`w-full group relative overflow-hidden text-xs py-1.5 ${plan.buttonClass}`}
                  onClick={() => handleOpenModal(plan)}
                  disabled={plan.isPurchased}
                >
                  <span className='relative z-10 flex items-center justify-center'>
                    {plan.buttonText}
                    {!plan.isPurchased && (
                      <ArrowRight className='ml-1 h-3 w-3 transition-transform group-hover:translate-x-1' />
                    )}
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