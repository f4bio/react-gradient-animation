import { OpacityConfig, ParticleOptions, RGB, ShapeType } from "./types";
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
    constructor(color: RGB, shape: ShapeType, options: ParticleOptions, opacity: OpacityConfig);
    update(canvasWidth: number, canvasHeight: number): void;
    draw(ctx: CanvasRenderingContext2D, blending: GlobalCompositeOperation | "none"): void;
}
