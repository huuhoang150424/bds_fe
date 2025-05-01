// @ts-nocheck

import { useEffect, useRef } from 'react';

export default function AuroraEffect() {
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

    // Helper function to convert hex to rgb
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    // Aurora parameters
    const auroras = [
      { y: canvas.height * 0.3, height: canvas.height * 0.4, speed: 0.001, frequency: 0.002, color: '#7f00ff' },
      { y: canvas.height * 0.4, height: canvas.height * 0.3, speed: 0.002, frequency: 0.003, color: '#00ffff' },
      { y: canvas.height * 0.5, height: canvas.height * 0.35, speed: 0.0015, frequency: 0.0025, color: '#00ff7f' },
    ];

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      auroras.forEach((aurora) => {
        ctx.beginPath();

        // Create gradient
        const gradient = ctx.createLinearGradient(0, aurora.y, 0, aurora.y + aurora.height);
        const colorRgb = hexToRgb(aurora.color);
        gradient.addColorStop(0, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0)`);
        gradient.addColorStop(0.5, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.4)`);
        gradient.addColorStop(1, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0)`);

        ctx.fillStyle = gradient;

        // Draw aurora wave
        ctx.moveTo(0, aurora.y);

        for (let x = 0; x < canvas.width; x += 5) {
          const wave1 = Math.sin(x * aurora.frequency + time * aurora.speed) * 50;
          const wave2 = Math.sin(x * aurora.frequency * 2 + time * aurora.speed * 1.5) * 25;
          const y = aurora.y + wave1 + wave2;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, aurora.y + aurora.height);
        ctx.lineTo(0, aurora.y + aurora.height);
        ctx.closePath();
        ctx.fill();
      });

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 w-full h-full pointer-events-none' />;
}
