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
    onLoaded?: () => void;
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
