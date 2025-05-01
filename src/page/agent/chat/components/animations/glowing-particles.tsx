// @ts-nocheck

import { useEffect, useRef } from 'react';

export default function GlowingParticles() {
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

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 80%)`;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -1;
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.fillStyle = this.color;
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();

        // Add glow effect
        ctx!.beginPath();
        const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);

        gradient.addColorStop(0, this.color.replace('hsl', 'hsla').replace(')', ', 0.7)'));
        gradient.addColorStop(1, this.color.replace('hsl', 'hsla').replace(')', ', 0)'));

        ctx!.fillStyle = gradient;
        ctx!.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // Connection lines between particles
    function drawConnections(particles: Particle[]) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawConnections(particles);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 w-full h-full pointer-events-none' />;
}
