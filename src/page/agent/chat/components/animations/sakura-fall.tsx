// @ts-nocheck

import { useEffect, useRef } from 'react';


export default function SakuraFall() {
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

    class Flower {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotationSpeed: number;
      rotation: number;
      wobbleSpeed: number;
      wobbleAmount: number;
      wobbleOffset: number;
      opacity: number;
      isGathering: boolean;
      gatheringSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 12 + 8;

        // Sakura colors
        const colors = [
          'hsl(350, 100%, 90%)', // Light pink
          'hsl(350, 100%, 85%)', // Pink
          'hsl(350, 80%, 80%)', // Darker pink
          'hsl(0, 100%, 94%)', // Very light pink
          'hsl(330, 100%, 88%)', // Purplish pink
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        // Chuyển động trôi nổi nhẹ nhàng theo cả hai hướng
        this.speedX = (Math.random() * 0.4 - 0.2) * 0.3;
        this.speedY = (Math.random() * 0.4 - 0.2) * 0.3;

        // Rotation
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() * 0.02 - 0.01) * 0.3;

        // Wobble effect
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleAmount = Math.random() * 2 + 1;
        this.wobbleOffset = Math.random() * Math.PI * 2;

        this.opacity = Math.random() * 0.5 + 0.5;

        // Gathering behavior
        this.isGathering = false;
        this.gatheringSpeed = Math.random() * 0.5 + 1.0;
      }

      update(time: number, gatheringPoint: { x: number; y: number } | null) {
        // If in gathering mode, move toward gathering point
        if (gatheringPoint && this.isGathering) {
          const dx = gatheringPoint.x - this.x;
          const dy = gatheringPoint.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 5) {
            // Add wobble to movement
            const wobbleX = Math.sin(time * this.wobbleSpeed + this.wobbleOffset) * this.wobbleAmount;
            const wobbleY = Math.cos(time * this.wobbleSpeed + this.wobbleOffset) * this.wobbleAmount;

            // Move toward gathering point with easing
            this.x += (dx / distance) * this.gatheringSpeed + wobbleX * 0.02;
            this.y += (dy / distance) * this.gatheringSpeed + wobbleY * 0.02;
          }
        } else {
          // Normal floating behavior
          // Add wobble to movement
          const wobbleX = Math.sin(time * this.wobbleSpeed + this.wobbleOffset) * this.wobbleAmount;
          const wobbleY = Math.cos(time * this.wobbleSpeed + this.wobbleOffset) * this.wobbleAmount;
          this.x += this.speedX + wobbleX * 0.05;
          this.y += this.speedY + wobbleY * 0.05;
        }

        // Rotate the flower
        this.rotation += this.rotationSpeed;

        // Wrap around screen edges
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.y < -20) this.y = canvas.height + 20;
        if (this.y > canvas.height + 20) this.y = -20;
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.rotation);
        ctx!.globalAlpha = this.opacity;

        // Draw complete flower shape
        ctx!.beginPath();
        ctx!.fillStyle = this.color;

        // Draw flower with 5 petals
        for (let i = 0; i < 5; i++) {
          ctx!.save();
          ctx!.rotate((i * Math.PI * 2) / 5);

          // Petal shape
          ctx!.beginPath();
          ctx!.moveTo(0, 0);
          ctx!.bezierCurveTo(this.size / 2, -this.size / 2, this.size, -this.size / 4, this.size, -this.size);
          ctx!.bezierCurveTo(this.size, -this.size * 1.5, this.size / 2, -this.size * 1.5, 0, -this.size);
          ctx!.bezierCurveTo(-this.size / 2, -this.size * 1.5, -this.size, -this.size * 1.5, -this.size, -this.size);
          ctx!.bezierCurveTo(-this.size, -this.size / 4, -this.size / 2, -this.size / 2, 0, 0);
          ctx!.fill();

          ctx!.restore();
        }

        // Add flower center
        ctx!.beginPath();
        ctx!.fillStyle = 'rgba(255, 220, 100, 0.8)';
        ctx!.arc(0, 0, this.size / 4, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.restore();
      }
    }

    const flowers: Flower[] = [];
    for (let i = 0; i < 30; i++) {
      flowers.push(new Flower());
    }

    let time = 0;
    let gatheringPoint: { x: number; y: number } | null = null;
    let gatheringTimer = 0;
    const gatheringInterval = 700; // Time between gatherings
    const gatheringDuration = 350; // How long the gathering lasts

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#1a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;
      gatheringTimer++;

      // Manage gathering behavior
      if (gatheringTimer === gatheringInterval) {
        // Start gathering
        gatheringPoint = {
          x: Math.random() * canvas.width * 0.6 + canvas.width * 0.2,
          y: Math.random() * canvas.height * 0.6 + canvas.height * 0.2,
        };
        flowers.forEach((flower) => {
          flower.isGathering = true;
        });
      } else if (gatheringTimer === gatheringInterval + gatheringDuration) {
        // Stop gathering
        flowers.forEach((flower) => {
          flower.isGathering = false;
        });
        gatheringPoint = null;
        gatheringTimer = 0;
      }

      flowers.forEach((flower) => {
        flower.update(time, gatheringPoint);
        flower.draw();
      });

      requestAnimationFrame(animate);
    };

    // Initial background
    ctx.fillStyle = '#1a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 w-full h-full pointer-events-none' />;
}
