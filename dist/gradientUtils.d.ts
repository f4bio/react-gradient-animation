import { RGB } from "./types";
export declare const isValidBlendingMode: (mode: string) => mode is GlobalCompositeOperation;
export declare const debounce: (func: (...args: any[]) => void, wait: number) => (...args: any[]) => void;
export declare const hexToRgb: (hex: string) => RGB;
export declare const getRandom: (min: number, max: number) => number;
export declare const getRandomDirection: () => number;
