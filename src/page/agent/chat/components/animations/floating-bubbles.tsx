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
      rotation: number;
      rotationSpeed: number;
      isGathering: boolean;
      gatheringSpeed: number;

      constructor() {
        // Đặt vị trí ban đầu ngẫu nhiên trên màn hình (giống hoa anh đào)
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        // Slow movement
        this.speedX = (Math.random() * 0.4 - 0.2) * 0.3;
        this.speedY = (Math.random() * 0.4 - 0.2) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.5;

        // Wobble effect parameters
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleAmount = Math.random() * 2 + 1;
        this.wobbleOffset = Math.random() * Math.PI * 2;

        // Rotation
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() * 0.02 - 0.01) * 0.3;

        // Gathering behavior
        this.isGathering = false;
        this.gatheringSpeed = Math.random() * 0.5 + 1.0;
      }

      update(time: number, gatheringPoint: { x: number; y: number } | null) {
        // Add a gentle wobble to movement
        const wobbleX = Math.sin(time * this.wobbleSpeed + this.wobbleOffset) * this.wobbleAmount;
        const wobbleY = Math.cos(time * this.wobbleSpeed + this.wobbleOffset) * this.wobbleAmount;

        // If in gathering mode, move toward gathering point
        if (gatheringPoint && this.isGathering) {
          const dx = gatheringPoint.x - this.x;
          const dy = gatheringPoint.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 5) {
            // Move toward gathering point with easing
            this.x += (dx / distance) * this.gatheringSpeed + wobbleX * 0.02;
            this.y += (dy / distance) * this.gatheringSpeed + wobbleY * 0.02;
          }
        } else {
          // Normal floating behavior
          this.x += this.speedX + wobbleX * 0.05;
          this.y += this.speedY + wobbleY * 0.05;
        }

        // Rotate the object
        this.rotation += this.rotationSpeed;

        // Wrap around screen edges
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
      }

      draw() {
        // To be implemented by subclasses
      }
    }

    // Bubble class
    // class Bubble extends FloatingObject {
    //   radius: number
    //   color: string

    //   constructor() {
    //     super()
    //     this.radius = Math.random() * 30 + 5

    //     // Beautiful ocean colors
    //     const colors = [
    //       "hsl(195, 100%, 75%)", // Light blue
    //       "hsl(210, 100%, 80%)", // Sky blue
    //       "hsl(180, 100%, 85%)", // Cyan
    //       "hsl(240, 80%, 80%)", // Lavender
    //       "hsl(220, 100%, 90%)", // Very light blue
    //     ]
    //     this.color = colors[Math.floor(Math.random() * colors.length)]
    //   }

    //   draw() {
    //     ctx!.beginPath()

    //     // Create gradient for bubble
    //     const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)

    //     gradient.addColorStop(0, this.color)
    //     gradient.addColorStop(0.8, this.color.replace("hsl", "hsla").replace(")", ", 0.5)"))
    //     gradient.addColorStop(1, this.color.replace("hsl", "hsla").replace(")", ", 0)"))

    //     ctx!.fillStyle = gradient
    //     ctx!.globalAlpha = this.opacity
    //     ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    //     ctx!.fill()

    //     // Highlight
    //     ctx!.beginPath()
    //     ctx!.fillStyle = "rgba(255, 255, 255, 0.3)"
    //     ctx!.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2)
    //     ctx!.fill()

    //     ctx!.globalAlpha = 1
    //   }
    // }

    // Soccer ball class
    class SoccerBall extends FloatingObject {
      radius: number;

      constructor() {
        super();
        this.radius = Math.random() * 15 + 20;
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

      constructor() {
        super();
        this.radius = Math.random() * 15 + 20;
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

    // Add soccer balls
    for (let i = 0; i < 8; i++) {
      floatingObjects.push(new SoccerBall());
    }

    // Add basketballs
    for (let i = 0; i < 8; i++) {
      floatingObjects.push(new BasketBall());
    }

    let time = 0;
    let gatheringPoint: { x: number; y: number } | null = null;
    let gatheringTimer = 0;
    const gatheringInterval = 600; // Time between gatherings
    const gatheringDuration = 300; // How long the gathering lasts

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#062035';
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
        floatingObjects.forEach((obj) => {
          obj.isGathering = true;
        });
      } else if (gatheringTimer === gatheringInterval + gatheringDuration) {
        // Stop gathering
        floatingObjects.forEach((obj) => {
          obj.isGathering = false;
        });
        gatheringPoint = null;
        gatheringTimer = 0;
      }

      floatingObjects.forEach((object) => {
        object.update(time, gatheringPoint);
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
