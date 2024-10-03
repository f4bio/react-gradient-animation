export declare class Particle {
  color: RGB;
  shape: ShapeType;
  options: ParticleOptions;
  rgba: string;
  rgbaEdge: string;
  size: number;
  direction: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
  pulseDirection: number;
  constructor(
    color: RGB,
    shape: ShapeType,
    options: ParticleOptions,
    opacity: OpacityConfig
  );
  update(canvasWidth: number, canvasHeight: number): void;
  draw(
    ctx: CanvasRenderingContext2D,
    blending: GlobalCompositeOperation | "none"
  ): void;
}
export type ShapeType = "c" | "s" | "t";
export interface SizeConfig {
  min: number;
  max: number;
  pulse: number;
}
export interface SpeedAxisConfig {
  min: number;
  max: number;
}
export interface SpeedConfig {
  x: SpeedAxisConfig;
  y: SpeedAxisConfig;
}
export interface ColorsConfig {
  background: string;
  particles: string[];
}
export interface OpacityConfig {
  center: number;
  edge: number;
}
export interface GradientBackgroundProps {
  count?: number;
  size?: SizeConfig;
  speed?: SpeedConfig;
  colors?: ColorsConfig;
  blending?: GlobalCompositeOperation | "none";
  opacity?: OpacityConfig;
  skew?: number;
  shapes?: ShapeType[];
  className?: string;
  translateYcorrection?: boolean;
  style?: React.CSSProperties;
}
export interface RGB {
  r: number;
  g: number;
  b: number;
}
export interface ParticleOptions {
  size: SizeConfig;
  count: number;
  speed: SpeedConfig;
  colors: ColorsConfig;
  blending: GlobalCompositeOperation | "none";
  opacity: OpacityConfig;
  skew: number;
  shapes: ShapeType[];
  c: {
    w: number;
    h: number;
  };
}
