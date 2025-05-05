// @ts-nocheck

import { useEffect, useRef } from 'react';

export default function RainEffect() {
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

    // Raindrop class
    class Raindrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 10 + 5;
        this.opacity = Math.random() * 0.3 + 0.3;
      }

      update() {
        this.y += this.speed;

        // Reset if off screen
        if (this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * -100;
          this.length = Math.random() * 20 + 10;
          this.speed = Math.random() * 10 + 15;
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(200, 230, 255, ${this.opacity})`;
        ctx!.lineWidth = 1;
        ctx!.moveTo(this.x, this.y);
        ctx!.lineTo(this.x, this.y + this.length);
        ctx!.stroke();
      }
    }

    // Ripple class for water ripples
    class Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      opacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 1;
        this.maxRadius = Math.random() * 30 + 20;
        this.speed = Math.random() * 0.5 + 0.5;
        this.opacity = 0.5;
      }

      update() {
        this.radius += this.speed;
        this.opacity -= 0.005;
      }

      draw() {
        if (this.opacity > 0) {
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(200, 230, 255, ${this.opacity})`;
          ctx!.lineWidth = 1;
          ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }

      isFinished() {
        return this.opacity <= 0 || this.radius >= this.maxRadius;
      }
    }

    const raindrops: Raindrop[] = [];
    // const ripples: Ripple[] = [];

    // Create raindrops
    for (let i = 0; i < 200; i++) {
      raindrops.push(new Raindrop());
    }

    // Create a new ripple occasionally
    const createRipple = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      // ripples.push(new Ripple(x, y));
    };

    // Create ripples at intervals
    setInterval(createRipple, 300);

    const animate = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(20, 30, 40, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw raindrops
      raindrops.forEach((raindrop) => {
        raindrop.update();
        raindrop.draw();
      });

      // Update and draw ripples
      // for (let i = ripples.length - 1; i >= 0; i--) {
      //   ripples[i].update();
      //   ripples[i].draw();

      //   if (ripples[i].isFinished()) {
      //     ripples.splice(i, 1);
      //   }
      // }

      requestAnimationFrame(animate);
    };

    // Initial background
    ctx.fillStyle = '#14232D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 w-full h-full pointer-events-none' />;
}
