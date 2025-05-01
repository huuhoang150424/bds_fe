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
      isGathering: boolean;
      gatheringSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.bodyLength = Math.random() * 5 + 8;
        this.wingSize = Math.random() * 4 + 6;

        this.color = 'hsl(40, 100%, 50%)';

        const glowColors = ['hsl(60, 100%, 75%)', 'hsl(120, 100%, 75%)', 'hsl(90, 100%, 75%)'];
        this.glowColor = glowColors[Math.floor(Math.random() * glowColors.length)];

        // Slower initial movement for smoother effect
        this.speedX = 0;
        this.speedY = 0;

        this.pulseSpeed = Math.random() * 0.05 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;

        this.maxOpacity = Math.random() * 0.4 + 0.6;
        this.minOpacity = Math.random() * 0.1;
        this.opacity = this.maxOpacity;

        this.targetX = this.x;
        this.targetY = this.y;
        this.changeTargetCounter = 0;

        this.angle = Math.random() * Math.PI * 2;

        this.wingAngle = 0;
        this.wingSpeed = Math.random() * 0.2 + 0.1;

        // Gathering behavior
        this.isGathering = false;
        this.gatheringSpeed = Math.random() * 0.5 + 1.5; // Faster when gathering
      }

      update(time: number, gatheringPoint: { x: number; y: number } | null) {
        // Pulse opacity for the glow
        this.opacity =
          this.minOpacity +
          ((Math.sin(time * this.pulseSpeed + this.pulseOffset) + 1) / 2) * (this.maxOpacity - this.minOpacity);

        // If in gathering mode, move toward gathering point
        if (gatheringPoint && this.isGathering) {
          const dx = gatheringPoint.x - this.x;
          const dy = gatheringPoint.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 5) {
            // Move toward gathering point with easing
            this.speedX = (dx / distance) * this.gatheringSpeed * 0.05;
            this.speedY = (dy / distance) * this.gatheringSpeed * 0.05;
            this.angle = Math.atan2(this.speedY, this.speedX);
          } else {
            // Slow down when close to gathering point
            this.speedX *= 0.95;
            this.speedY *= 0.95;
          }
        } else {
          // Normal wandering behavior
          this.changeTargetCounter++;
          if (this.changeTargetCounter > Math.random() * 200 + 100) {
            this.targetX = Math.random() * canvas.width;
            this.targetY = Math.random() * canvas.height;
            this.changeTargetCounter = 0;
          }

          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 1) {
            // Smoother acceleration with easing
            this.speedX += (dx / distance) * 0.01;
            this.speedY += (dy / distance) * 0.01;

            // Limit maximum speed for smoother movement
            const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            if (currentSpeed > 0.5) {
              this.speedX = (this.speedX / currentSpeed) * 0.5;
              this.speedY = (this.speedY / currentSpeed) * 0.5;
            }

            // Update angle based on movement direction with smoothing
            const targetAngle = Math.atan2(this.speedY, this.speedX);
            const angleDiff = targetAngle - this.angle;

            // Normalize angle difference to -PI to PI
            let normalizedDiff = angleDiff;
            while (normalizedDiff > Math.PI) normalizedDiff -= Math.PI * 2;
            while (normalizedDiff < -Math.PI) normalizedDiff += Math.PI * 2;

            // Smooth angle change
            this.angle += normalizedDiff * 0.1;
          } else {
            this.speedX *= 0.98;
            this.speedY *= 0.98;
          }

          // Add very slight random movement for natural feel
          this.speedX += (Math.random() - 0.5) * 0.01;
          this.speedY += (Math.random() - 0.5) * 0.01;
        }

        // Apply damping for smoother movement
        this.speedX *= 0.95;
        this.speedY *= 0.95;

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Update wing animation
        this.wingAngle += this.wingSpeed;

        // Keep within bounds with smooth bounce
        if (this.x < 0) {
          this.x = 0;
          this.speedX *= -0.5;
        }
        if (this.x > canvas.width) {
          this.x = canvas.width;
          this.speedX *= -0.5;
        }
        if (this.y < 0) {
          this.y = 0;
          this.speedY *= -0.5;
        }
        if (this.y > canvas.height) {
          this.y = canvas.height;
          this.speedY *= -0.5;
        }
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
        ctx!.rotate(Math.sin(this.wingAngle) * 0.3);
        ctx!.ellipse(0, -this.bodyLength / 2, this.wingSize, this.wingSize / 2, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();

        // Bottom wing
        ctx!.beginPath();
        ctx!.save();
        ctx!.rotate(Math.sin(this.wingAngle + Math.PI) * 0.3);
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
    let gatheringPoint: { x: number; y: number } | null = null;
    let gatheringTimer = 0;
    const gatheringInterval = 500; // Time between gatherings
    const gatheringDuration = 300; // How long the gathering lasts

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0a1a0a';
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
        fireflies.forEach((firefly) => {
          firefly.isGathering = true;
        });
      } else if (gatheringTimer === gatheringInterval + gatheringDuration) {
        // Stop gathering
        fireflies.forEach((firefly) => {
          firefly.isGathering = false;
        });
        gatheringPoint = null;
        gatheringTimer = 0;
      }

      // Update and draw fireflies
      fireflies.forEach((firefly) => {
        firefly.update(time, gatheringPoint);
        firefly.draw();
      });

      requestAnimationFrame(animate);
    };

    // Initial background
    ctx.fillStyle = '#0a1a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute inset-0 w-full h-full pointer-events-none' />;
}
