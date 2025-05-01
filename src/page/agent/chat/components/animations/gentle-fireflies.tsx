// @ts-nocheck

import { useEffect, useRef } from 'react';

export default function GentleFireflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full size of container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Firefly class
    class Firefly {
      x: number;
      y: number;
      bodyLength: number;
      wingSize: number;
      color: string;
      glowColor: string;
      speedX: number;
      speedY: number;
      pulseSpeed: number;
      pulseOffset: number;
      maxOpacity: number;
      minOpacity: number;
      opacity: number;
      targetX: number;
      targetY: number;
      changeTargetCounter: number;
      angle: number;
      wingAngle: number;
      wingSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Tăng kích thước đom đóm
        this.bodyLength = Math.random() * 5 + 8; // Thân dài hơn
        this.wingSize = Math.random() * 4 + 6; // Kích thước cánh lớn hơn

        // Màu thân đom đóm
        this.color = 'hsl(40, 100%, 50%)'; // Màu vàng cam cho thân

        // Màu phát sáng
        const glowColors = [
          'hsl(60, 100%, 75%)', // Yellow
          'hsl(120, 100%, 75%)', // Green
          'hsl(90, 100%, 75%)', // Yellow-green
        ];
        this.glowColor = glowColors[Math.floor(Math.random() * glowColors.length)];

        // Very slow movement
        this.speedX = 0;
        this.speedY = 0;

        // Pulsing glow effect
        this.pulseSpeed = Math.random() * 0.05 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;

        this.maxOpacity = Math.random() * 0.4 + 0.6;
        this.minOpacity = Math.random() * 0.1;
        this.opacity = this.maxOpacity;

        // Target-based movement
        this.targetX = this.x;
        this.targetY = this.y;
        this.changeTargetCounter = 0;

        // Angle for direction
        this.angle = Math.random() * Math.PI * 2;

        // Wing animation
        this.wingAngle = 0;
        this.wingSpeed = Math.random() * 0.2 + 0.1;
      }

      update(time: number) {
        // Pulse opacity for the glow
        this.opacity =
          this.minOpacity +
          ((Math.sin(time * this.pulseSpeed + this.pulseOffset) + 1) / 2) * (this.maxOpacity - this.minOpacity);

        // Occasionally change target
        this.changeTargetCounter++;
        if (this.changeTargetCounter > Math.random() * 200 + 100) {
          this.targetX = Math.random() * canvas.width;
          this.targetY = Math.random() * canvas.height;
          this.changeTargetCounter = 0;
        }

        // Move slowly toward target
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
          this.speedX = (dx / distance) * 0.2;
          this.speedY = (dy / distance) * 0.2;
          // Update angle based on movement direction
          this.angle = Math.atan2(this.speedY, this.speedX);
        } else {
          this.speedX *= 0.95;
          this.speedY *= 0.95;
        }

        // Add slight random movement
        this.speedX += (Math.random() - 0.5) * 0.1;
        this.speedY += (Math.random() - 0.5) * 0.1;

        // Dampen speed
        this.speedX *= 0.98;
        this.speedY *= 0.98;

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Update wing animation
        this.wingAngle += this.wingSpeed;

        // Keep within bounds
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width) this.x = canvas.width;
        if (this.y < 0) this.y = 0;
        if (this.y > canvas.height) this.y = canvas.height;
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.angle);

        // Draw glow effect
        ctx!.globalAlpha = this.opacity;
        const gradient = ctx!.createRadialGradient(0, 0, 0, 0, 0, this.bodyLength * 3);
        gradient.addColorStop(0, this.glowColor);
        gradient.addColorStop(1, this.glowColor.replace('hsl', 'hsla').replace(')', ', 0)'));

        ctx!.beginPath();
        ctx!.fillStyle = gradient;
        ctx!.arc(this.bodyLength / 2, 0, this.bodyLength * 2, 0, Math.PI * 2);
        ctx!.fill();

        // Draw body
        ctx!.globalAlpha = 1;
        ctx!.beginPath();
        ctx!.fillStyle = this.color;
        ctx!.ellipse(0, 0, this.bodyLength, this.bodyLength / 2, 0, 0, Math.PI * 2);
        ctx!.fill();

        // Draw head
        ctx!.beginPath();
        ctx!.fillStyle = '#000';
        ctx!.arc(-this.bodyLength * 0.7, 0, this.bodyLength / 3, 0, Math.PI * 2);
        ctx!.fill();

        // Draw wings with animation
        ctx!.globalAlpha = 0.7;

        // Top wing
        ctx!.beginPath();
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx!.save();
        ctx!.rotate(Math.sin(this.wingAngle) * 0.3); // Wing flapping
        ctx!.ellipse(0, -this.bodyLength / 2, this.wingSize, this.wingSize / 2, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();

        // Bottom wing
        ctx!.beginPath();
        ctx!.save();
        ctx!.rotate(Math.sin(this.wingAngle + Math.PI) * 0.3); // Opposite flapping
        ctx!.ellipse(0, this.bodyLength / 2, this.wingSize, this.wingSize / 2, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();

        ctx!.restore();
      }
    }

    const fireflies: Firefly[] = [];
    for (let i = 0; i < 30; i++) {
      fireflies.push(new Firefly());
    }

    let time = 0;

    const animate = () => {
      // Xóa hoàn toàn canvas mỗi khung hình để không còn vết mờ
      ctx.fillStyle = '#0a1a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      fireflies.forEach((firefly) => {
        firefly.update(time);
        firefly.draw();
      });

      requestAnimationFrame(animate);
    };

    // Initial dark green background
    ctx.fillStyle = '#0a1a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 w-full h-full pointer-events-none' />;
}
