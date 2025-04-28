import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DialogContent, DialogClose } from '@/components/ui/dialog';

interface PaymentSuccessDialogProps {
  amount: number;
}

export default function PaymentSuccessDialog({ amount }: PaymentSuccessDialogProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; color: string; speed: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 80,
      size: 5 + Math.random() * 10,
      color: [
        '#FF4136',
        '#FF851B',
        '#FFDC00',
        '#2ECC40',
        '#0074D9',
        '#B10DC9',
        '#F012BE',
        '#FF4136',
        '#FF851B',
        '#FFDC00',
      ][Math.floor(Math.random() * 10)],
      speed: 1 + Math.random() * 3,
    }));

    setParticles(newParticles);
    const interval = setInterval(() => {
      setParticles(
        (prev) =>
          prev
            .map((p) => ({
              ...p,
              y: p.y + p.speed,
              x: p.x + (Math.random() - 0.5) * 2,
            }))
            .filter((p) => p.y < 120),
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <DialogContent className="max-w-md p-0 border-0 overflow-hidden">
      <div className="relative w-full overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
            }}
          />
        ))}

        <Card className="w-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSI2MCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>

          <div className="relative p-8 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-75"></div>
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center animate-in zoom-in duration-700">
                  <CheckCircle
                    className="h-16 w-16 text-red-500 animate-in zoom-in duration-1000 delay-300"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-2 animate-in slide-in-from-bottom duration-500 delay-200">
              Thanh Toán Thành Công!
            </h2>

            <div className="w-16 h-1 bg-white/50 rounded-full my-3 animate-in slide-in-from-bottom duration-500 delay-300"></div>

            <p className="text-white/90 text-center text-base animate-in slide-in-from-bottom duration-500 delay-400">
              Số tiền <span className="font-bold">{amount.toLocaleString()} VNĐ</span> đã được chuyển thành công
            </p>

            <div className="mt-8 w-full animate-in slide-in-from-bottom duration-500 delay-500">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/70 text-sm">Mã giao dịch</span>
                  <span className="font-mono font-medium text-sm">TX{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Thời gian</span>
                  <span className="text-sm">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <DialogClose asChild>
              <Button
                className="mt-6 bg-white text-red-600 hover:bg-white/90 w-full text-sm animate-in slide-in-from-bottom duration-500 delay-600"
              >
                Đóng
              </Button>
            </DialogClose>
          </div>
        </Card>
      </div>
    </DialogContent>
  );
}