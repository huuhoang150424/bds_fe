// @ts-nocheck

import { useEffect, useRef } from 'react';

export default function FloatingBubbles() {
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

    // Base class for floating objects
    class FloatingObject {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      wobbleSpeed: number;
      wobbleAmount: number;
      wobbleOffset: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;

        // Slow movement
        this.speedX = (Math.random() * 0.4 - 0.2) * 0.5;
        this.speedY = Math.random() * -0.5 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.5;

        // Wobble effect parameters
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleAmount = Math.random() * 2 + 1;
        this.wobbleOffset = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        // Add a gentle wobble to x position
        const wobble = Math.sin(time * this.wobbleSpeed + this.wobbleOffset) * this.wobbleAmount;
        this.x += this.speedX + wobble * 0.05;
        this.y += this.speedY;

        // Bounce off walls with damping
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -0.8;
        }

        // Reset if off screen
        if (this.y < -50) {
          this.y = canvas.height + 50;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        // To be implemented by subclasses
      }
    }

    // Bubble class
    class Bubble extends FloatingObject {
      radius: number;
      color: string;

      constructor() {
        super();
        this.radius = Math.random() * 30 + 5;

        // Beautiful ocean colors
        const colors = [
          'hsl(195, 100%, 75%)', // Light blue
          'hsl(210, 100%, 80%)', // Sky blue
          'hsl(180, 100%, 85%)', // Cyan
          'hsl(240, 80%, 80%)', // Lavender
          'hsl(220, 100%, 90%)', // Very light blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        ctx!.beginPath();

        // Create gradient for bubble
        const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.8, this.color.replace('hsl', 'hsla').replace(')', ', 0.5)'));
        gradient.addColorStop(1, this.color.replace('hsl', 'hsla').replace(')', ', 0)'));

        ctx!.fillStyle = gradient;
        ctx!.globalAlpha = this.opacity;
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();

        // Highlight
        ctx!.beginPath();
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx!.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.globalAlpha = 1;
      }
    }

    // Soccer ball class
    class SoccerBall extends FloatingObject {
      radius: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        super();
        this.radius = Math.random() * 15 + 20; // Slightly larger than bubbles
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
      }

      update(time: number) {
        super.update(time);
        this.rotation += this.rotationSpeed;
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.rotation);
        ctx!.globalAlpha = this.opacity;

        // Draw soccer ball
        ctx!.beginPath();
        ctx!.fillStyle = 'white';
        ctx!.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx!.fill();

        // Draw pentagon pattern
        ctx!.fillStyle = 'black';
        const pentagonCount = 5;
        const pentagonSize = this.radius * 0.5;

        for (let i = 0; i < pentagonCount; i++) {
          const angle = (i * Math.PI * 2) / pentagonCount;
          const x = Math.cos(angle) * (this.radius * 0.5);
          const y = Math.sin(angle) * (this.radius * 0.5);

          ctx!.beginPath();
          for (let j = 0; j < 5; j++) {
            const pointAngle = angle + (j * Math.PI * 2) / 5;
            const pointX = x + Math.cos(pointAngle) * pentagonSize * 0.4;
            const pointY = y + Math.sin(pointAngle) * pentagonSize * 0.4;

            if (j === 0) {
              ctx!.moveTo(pointX, pointY);
            } else {
              ctx!.lineTo(pointX, pointY);
            }
          }
          ctx!.fill();
        }

        ctx!.restore();
      }
    }

    // Basketball class
    class BasketBall extends FloatingObject {
      radius: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        super();
        this.radius = Math.random() * 15 + 20; // Slightly larger than bubbles
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
      }

      update(time: number) {
        super.update(time);
        this.rotation += this.rotationSpeed;
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.rotation);
        ctx!.globalAlpha = this.opacity;

        // Draw basketball
        ctx!.beginPath();
        ctx!.fillStyle = 'rgb(235, 120, 50)'; // Orange color
        ctx!.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx!.fill();

        // Draw lines
        ctx!.strokeStyle = 'black';
        ctx!.lineWidth = this.radius * 0.05;

        // Horizontal line
        ctx!.beginPath();
        ctx!.moveTo(-this.radius, 0);
        ctx!.lineTo(this.radius, 0);
        ctx!.stroke();

        // Vertical line
        ctx!.beginPath();
        ctx!.moveTo(0, -this.radius);
        ctx!.lineTo(0, this.radius);
        ctx!.stroke();

        // Draw curved lines
        ctx!.beginPath();
        ctx!.arc(0, -this.radius * 0.5, this.radius * 0.5, 0, Math.PI);
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.arc(0, this.radius * 0.5, this.radius * 0.5, Math.PI, Math.PI * 2);
        ctx!.stroke();

        ctx!.restore();
      }
    }

    // Create a mix of objects
    const floatingObjects: FloatingObject[] = [];

    // Add bubbles
    for (let i = 0; i < 10; i++) {
      floatingObjects.push(new Bubble());
    }

    // Add soccer balls
    for (let i = 0; i < 3; i++) {
      floatingObjects.push(new SoccerBall());
    }

    // Add basketballs
    for (let i = 0; i < 3; i++) {
      floatingObjects.push(new BasketBall());
    }

    let time = 0;

    const animate = () => {
      // Xóa hoàn toàn canvas mỗi khung hình để không còn vết mờ
      ctx.fillStyle = '#062035';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      floatingObjects.forEach((object) => {
        object.update(time);
        object.draw();
      });

      requestAnimationFrame(animate);
    };

    // Initial deep blue background
    ctx.fillStyle = '#062035';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 w-full h-full pointer-events-none' />;
}
