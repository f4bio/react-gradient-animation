"use client";
import React, { useEffect, useRef } from "react";

import { debounce, hexToRgb, isValidBlendingMode } from "./gradientUtils";
import {
  GradientBackgroundProps,
  Particle,
  ParticleOptions,
} from "./types/types";

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  count = 12,
  size = { min: 1000, max: 1200, pulse: 0.1 },
  speed = { x: { min: 0.6, max: 3 }, y: { min: 0.6, max: 3 } },
  colors = {
    background: "transparent",
    particles: ["#ff681c", "#87ddfe", "#231efe"],
  },
  blending = "overlay",
  opacity = { center: 0.45, edge: 0 },
  skew = -1.5,
  shapes: initialShapes = ["c"],
  className = "",
  translateYcorrection = true,
  style = {},
  onLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const configRef = useRef<ParticleOptions>({
    count,
    size,
    speed,
    colors,
    blending,
    opacity,
    skew,
    shapes: initialShapes,
    c: { w: 0, h: 0 },
  });

  // Compute styles before render
  const computedStyles: React.CSSProperties = React.useMemo(() => {
    // Use a default width during SSR
    const defaultWidth = 1920;

    // Check if window is defined
    const canvasWidth =
      configRef.current.c.w ||
      (typeof window !== "undefined" ? window.innerWidth : defaultWidth);

    const translateY = translateYcorrection
      ? `translateY(-${Math.ceil(
          Math.tan((Math.abs(skew) * Math.PI) / 180) * (canvasWidth / 2)
        )}px)`
      : "";

    const skewValue = `skewY(${skew}deg) ${translateY}`;

    return {
      transform: skewValue,
      WebkitTransform: skewValue,
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: -1,
      pointerEvents: "none",
      backgroundColor: colors.background,
      ...style,
    };
  }, [skew, translateYcorrection, colors.background, style]);

  const initParticles = (): void => {
    const { count, colors, shapes, opacity } = configRef.current;
    particlesRef.current = [];
    for (let i = 0; i < count; i++) {
      const color = hexToRgb(colors.particles[i % colors.particles.length]);
      const shape = shapes[i % shapes.length];
      particlesRef.current.push(
        new Particle(color, shape, configRef.current, opacity)
      );
    }
  };

  const animate = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ): void => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    particlesRef.current.forEach((particle) => {
      particle.update(canvasWidth, canvasHeight);
      particle.draw(ctx, configRef.current.blending);
    });
    animationRef.current = window.requestAnimationFrame(() =>
      animate(ctx, canvasWidth, canvasHeight)
    );
  };

  const adjustCanvasSize = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    configRef.current.c.w = parent.clientWidth;
    configRef.current.c.h = parent.clientHeight;
    canvas.width = configRef.current.c.w * dpr;
    canvas.height = configRef.current.c.h * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.scale(dpr, dpr);
  };

  const handleResize = (): void => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }

      adjustCanvasSize(canvas, ctx);

      initParticles();

      const { c } = configRef.current;
      animate(ctx, c.w, c.h);
    }
  };

  useEffect(() => {
    configRef.current = {
      ...configRef.current,
      count,
      size,
      speed,
      colors,
      blending,
      opacity,
      skew,
      shapes: initialShapes,
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    adjustCanvasSize(canvas, ctx);

    const validBlending = isValidBlendingMode(blending)
      ? blending
      : "source-over";

    ctx.globalCompositeOperation = validBlending;

    initParticles();
    animate(ctx, configRef.current.c.w, configRef.current.c.h);

    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedHandleResize);

    // Call the onLoaded prop if provided
    if (onLoaded) {
      onLoaded();
    }

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    count,
    size,
    speed,
    colors,
    blending,
    opacity,
    skew,
    initialShapes,
    translateYcorrection,
    onLoaded,
  ]);

  return (
    <canvas ref={canvasRef} className={className} style={computedStyles} />
  );
};

export { GradientBackground };
