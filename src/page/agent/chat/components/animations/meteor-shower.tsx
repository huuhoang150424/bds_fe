// @ts-nocheck

import { useEffect, useRef } from 'react';

export default function MeteorShower() {
  const canvasRef = useRef(null);
  console.log('render affect')
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Điều chỉnh kích thước canvas để phù hợp với container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Tạo các ngôi sao trên bầu trời đêm
    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    // Lớp Milky Way (Dải Ngân Hà)
    class MilkyWay {
      constructor() {
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.width = canvas.width * 1.5;
        this.height = canvas.height * 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = 0.0001;
        this.particles = [];

        for (let i = 0; i < 500; i++) {
          const distance = Math.random();
          const angle = Math.random() * Math.PI * 2;
          const x = Math.cos(angle) * this.width * distance * 0.5;
          const y = Math.sin(angle) * this.height * distance;
          const jitter = this.height * 0.2 * (Math.random() - 0.5);

          this.particles.push({
            x: x,
            y: y + jitter,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.01 + 0.005,
          });
        }
      }

      update() {
        this.angle += this.rotationSpeed;
        this.particles.forEach((particle) => {
          particle.x += particle.speed * (Math.random() - 0.5);
          particle.y += particle.speed * (Math.random() - 0.5);
          particle.opacity = Math.max(0.1, Math.min(1, particle.opacity + (Math.random() - 0.5) * 0.05));
        });
      }

      draw() {
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.angle);

        this.particles.forEach((particle) => {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }
    }

    // Lớp Spiral Galaxy (Thiên hà xoáy)
    class SpiralGalaxy {
      constructor(x, y, size) {
        this.centerX = x;
        this.centerY = y;
        this.size = size;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = 0.0014;
        this.particles = [];
        this.numArms = 4;
        this.armTightness = 0.3;
        this.numParticles = 250;

        for (let i = 0; i < this.numParticles; i++) {
          const t = Math.random() * 10;
          const armIndex = Math.floor(Math.random() * this.numArms);
          const baseAngle = (armIndex * (Math.PI * 2)) / this.numArms;
          const r = this.size * 0.05 * Math.exp(this.armTightness * t);
          const spiralAngle = baseAngle + t;

          const x = r * Math.cos(spiralAngle);
          const y = r * Math.sin(spiralAngle);

          const noiseX = (Math.random() - 0.5) * 3;
          const noiseY = (Math.random() - 0.5) * 3;

          this.particles.push({
            x: x + noiseX,
            y: y + noiseY,
            size: Math.random() * 1.2 + 0.5,
            opacity: Math.max(0.3, 0.8 - r / this.size),
          });
        }
      }

      update() {
        this.angle += this.rotationSpeed;
        this.particles.forEach((particle) => {
          particle.opacity = Math.max(0.3, Math.min(0.8, particle.opacity + (Math.random() - 0.5) * 0.02));
        });
      }

      draw() {
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.angle);

        ctx.beginPath();
        const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.3);
        coreGradient.addColorStop(0, 'rgba(255, 255, 220, 0.6)');
        coreGradient.addColorStop(0.5, 'rgba(255, 255, 200, 0.2)');
        coreGradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
        ctx.fillStyle = coreGradient;
        ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        const outerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        outerGlow.addColorStop(0, 'rgba(180, 200, 255, 0.1)');
        outerGlow.addColorStop(1, 'rgba(180, 200, 255, 0)');
        ctx.fillStyle = outerGlow;
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();

        this.particles.forEach((particle) => {
          ctx.beginPath();
          ctx.fillStyle = `rgba(180, 200, 255, ${particle.opacity})`;
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }
    }

    // Lớp Meteor (Sao băng) 
    class Meteor {
      x: number;
      y: number;
      size: number;
      color: string;
      tail: Array<{ x: number; y: number }>;
      speed: number;
      lifetime: number;
      maxLifetime: number;

      constructor() {
        this.x = Math.random() * canvas.width * 0.3;
        this.y = Math.random() * canvas.height * 0.3;
        this.size = Math.random() * 2 + 1;

        // Chỉ sử dụng màu trắng cho sao băng
        this.color = 'hsl(0, 0%, 100%)'; // Màu trắng thuần

        this.tail = [];
        // Giảm tốc độ sao băng
        this.speed = Math.random() * 2 + 1; // Giảm tốc độ xuống còn 1/3
        this.lifetime = 0;
        this.maxLifetime = Math.random() * 300 + 200; // Tăng thời gian sống
      }

      update() {
        this.lifetime++;

        if (this.lifetime > this.maxLifetime) {
          // Reset meteor when it reaches its lifetime
          this.x = Math.random() * canvas.width * 0.3;
          this.y = Math.random() * canvas.height * 0.3;
          this.tail = [];
          this.lifetime = 0;
          return;
        }

        this.tail.unshift({ x: this.x, y: this.y });

        if (this.tail.length > 20) {
          this.tail.pop();
        }

        this.x += this.speed;
        this.y += this.speed;

        if (this.x > canvas.width || this.y > canvas.height) {
          this.x = Math.random() * canvas.width * 0.3;
          this.y = Math.random() * canvas.height * 0.3;
          this.tail = [];
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.fillStyle = this.color;
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();

        // Draw tail
        for (let i = 0; i < this.tail.length; i++) {
          const tailPart = this.tail[i];
          const alpha = 1 - i / this.tail.length;

          ctx!.beginPath();
          ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx!.arc(tailPart.x, tailPart.y, this.size * (1 - i / this.tail.length), 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    const milkyWay = new MilkyWay();

    // Tạo các thiên hà xoáy
    const spiralGalaxies = [
      new SpiralGalaxy(canvas.width * 0.2, canvas.height * 0.3, 100),
      new SpiralGalaxy(canvas.width * 0.2, canvas.height * 0.3, 100),
      new SpiralGalaxy(canvas.width * 0.7, canvas.height * 0.2, 50),
      new SpiralGalaxy(canvas.width * 0.7, canvas.height * 0.2, 50),
      new SpiralGalaxy(canvas.width * 0.4, canvas.height * 0.6, 70),
      new SpiralGalaxy(canvas.width * 0.4, canvas.height * 0.6, 70),
      new SpiralGalaxy(canvas.width * 0.9, canvas.height * 0.3, 90),
      new SpiralGalaxy(canvas.width * 0.9, canvas.height * 0.3, 90),
    ];

    // Tạo nhiều sao băng hơn
    const meteors = [];
    for (let i = 0; i < 10; i++) {
      meteors.push(new Meteor());
    }

    // Hàm vẽ các ngôi sao trên bầu trời
    const drawStars = () => {
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Hàm hoạt hình chính
    const animate = () => {
      // Xóa canvas mỗi khung hình
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Vẽ các ngôi sao
      drawStars();

      // Cập nhật và vẽ Dải Ngân Hà
      milkyWay.update();
      milkyWay.draw();

      // Cập nhật và vẽ các thiên hà xoáy
      spiralGalaxies.forEach((galaxy) => {
        galaxy.update();
        galaxy.draw();
      });

      // Cập nhật và vẽ các sao băng
      meteors.forEach((meteor) => {
        meteor.update();
        meteor.draw();
      });

      requestAnimationFrame(animate);
    };

    // Khởi tạo nền đen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    // Dọn dẹp sự kiện resize khi component unmount
    return () => {
      console.log('unmount ')
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 w-full h-full pointer-events-none' />;
}
