// @ts-nocheck

import { useEffect, useRef } from 'react';

export default function DaySky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number;
    let height: number;

    const setCanvasDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initializeClouds();
    };

    class Cloud {
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;

      constructor() {
        this.width = Math.random() * 100 + 80;
        this.height = this.width * 0.6;
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 0.7);
        this.speed = (Math.random() * 0.1 + 0.05);
      }

      update() {
        this.x -= this.speed;
        if (this.x < -this.width) {
          this.x = width + this.width;
          this.y = Math.random() * (height * 0.7);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        const w = this.width;
        const h = this.height;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.beginPath();
        ctx.moveTo(w * 0.2, h * 0.8);
        ctx.lineTo(w * 0.8, h * 0.8);
        ctx.bezierCurveTo(w * 0.95, h * 0.8, w * 0.95, h * 0.6, w * 0.8, h * 0.55);
        ctx.bezierCurveTo(w * 0.85, h * 0.4, w * 0.75, h * 0.3, w * 0.6, h * 0.35);
        ctx.bezierCurveTo(w * 0.55, h * 0.2, w * 0.45, h * 0.2, w * 0.4, h * 0.35);
        ctx.bezierCurveTo(w * 0.35, h * 0.25, w * 0.15, h * 0.35, w * 0.2, h * 0.55);
        ctx.bezierCurveTo(w * 0.05, h * 0.6, w * 0.05, h * 0.8, w * 0.2, h * 0.8);
        ctx.closePath();

        ctx.fill();

        ctx.restore();
      }
    }

    let clouds: Cloud[] = [];

    function initializeClouds() {
      clouds = [];
      const cloudCount = Math.floor(width / 150); // Dàn đều
      for (let i = 0; i < cloudCount; i++) {
        const cloud = new Cloud();
        cloud.x = (i / cloudCount) * width + Math.random() * 50 - 25;
        cloud.y = Math.random() * (height * 0.6);
        clouds.push(cloud);
      }
    }


    let blink = false;
    let blinkFrame = 0;
    
    function drawSun() {
      const sunX = width * 0.15;
      const sunY = height * 0.2;
      const radius = 60;
    
      // Thân mặt trời
      ctx.beginPath();
      ctx.arc(sunX, sunY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFD700';
      ctx.fill();
      ctx.strokeStyle = '#FFA500';
      ctx.lineWidth = 4;
      ctx.stroke();
    
      // Tia sáng với gradient và đầu bo tròn
      const rayCount = 16;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i * Math.PI * 2) / rayCount;
        const x1 = sunX + Math.cos(angle) * (radius + 10);
        const y1 = sunY + Math.sin(angle) * (radius + 10);
        const x2 = sunX + Math.cos(angle) * (radius + 40);
        const y2 = sunY + Math.sin(angle) * (radius + 40);
    
        // Gradient tia
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
        grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
    
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    
      // Mắt trắng
      const eyeY = sunY - 10;
      const eyeDist = 25;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(sunX - eyeDist, eyeY, 8, 0, 2 * Math.PI);
      ctx.arc(sunX + eyeDist, eyeY, 8, 0, 2 * Math.PI);
      ctx.fill();
    
      // Tính chớp mắt
      blinkFrame++;
      if (blinkFrame % 120 === 0) blink = true;
      if (blinkFrame % 120 === 10) blink = false;
    
      // Vẽ con ngươi hoặc mi mắt
      if (blink) {
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(sunX - eyeDist - 9, eyeY - 2, 18, 6);
        ctx.fillRect(sunX + eyeDist - 9, eyeY - 2, 18, 6);
      } else {
        // Con ngươi di động nhẹ
        const pupilOffset = Math.sin(Date.now() / 300) * 2;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(sunX - eyeDist + pupilOffset, eyeY, 4, 0, 2 * Math.PI);
        ctx.arc(sunX + eyeDist + pupilOffset, eyeY, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    
      // Miệng cười
      ctx.beginPath();
      ctx.arc(sunX, sunY + 18, 20, 0, Math.PI, false);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    
    

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#64b5f6');
      gradient.addColorStop(0.5, '#90caf9');
      gradient.addColorStop(1, '#bbdefb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      drawSun();

      for (const cloud of clouds) {
        cloud.update();
        cloud.draw();
      }

      requestAnimationFrame(animate);
    }

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 w-full h-full pointer-events-none' />;
}
