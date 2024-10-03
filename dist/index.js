"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect, useRef } from "react";
import { debounce, hexToRgb, isValidBlendingMode } from "./gradientUtils";
import { Particle, } from "./types/types";
var GradientBackground = function (_a) {
    var _b = _a.count, count = _b === void 0 ? 12 : _b, _c = _a.size, size = _c === void 0 ? { min: 1000, max: 1200, pulse: 0.1 } : _c, _d = _a.speed, speed = _d === void 0 ? { x: { min: 0.6, max: 3 }, y: { min: 0.6, max: 3 } } : _d, _e = _a.colors, colors = _e === void 0 ? {
        background: "transparent",
        particles: ["#ff681c", "#87ddfe", "#231efe"],
    } : _e, _f = _a.blending, blending = _f === void 0 ? "overlay" : _f, _g = _a.opacity, opacity = _g === void 0 ? { center: 0.45, edge: 0 } : _g, _h = _a.skew, skew = _h === void 0 ? -1.5 : _h, _j = _a.shapes, initialShapes = _j === void 0 ? ["c"] : _j, _k = _a.className, className = _k === void 0 ? "" : _k, _l = _a.translateYcorrection, translateYcorrection = _l === void 0 ? true : _l, _m = _a.style, style = _m === void 0 ? {} : _m;
    var canvasRef = useRef(null);
    var animationRef = useRef(null);
    var particlesRef = useRef([]);
    var configRef = useRef({
        count: count,
        size: size,
        speed: speed,
        colors: colors,
        blending: blending,
        opacity: opacity,
        skew: skew,
        shapes: initialShapes,
        c: { w: 0, h: 0 },
    });
    var initParticles = function () {
        var _a = configRef.current, count = _a.count, colors = _a.colors, shapes = _a.shapes, opacity = _a.opacity;
        particlesRef.current = [];
        for (var i = 0; i < count; i++) {
            var color = hexToRgb(colors.particles[i % colors.particles.length]);
            var shape = shapes[i % shapes.length];
            particlesRef.current.push(new Particle(color, shape, configRef.current, opacity));
        }
    };
    var animate = function (ctx, canvasWidth, canvasHeight) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        particlesRef.current.forEach(function (particle) {
            particle.update(canvasWidth, canvasHeight);
            particle.draw(ctx, configRef.current.blending);
        });
        animationRef.current = window.requestAnimationFrame(function () {
            return animate(ctx, canvasWidth, canvasHeight);
        });
    };
    var adjustCanvasSize = function (canvas, ctx) {
        var parent = canvas.parentElement;
        if (!parent)
            return;
        var dpr = window.devicePixelRatio || 1;
        configRef.current.c.w = parent.clientWidth;
        configRef.current.c.h = parent.clientHeight;
        canvas.width = configRef.current.c.w * dpr;
        canvas.height = configRef.current.c.h * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    };
    var computeStyles = function () {
        var translateY = translateYcorrection
            ? "translateY(-".concat(Math.ceil(Math.tan((Math.abs(configRef.current.skew) * Math.PI) / 180) *
                (configRef.current.c.w / 2)), "px)")
            : "";
        var skewValue = "skewY(".concat(configRef.current.skew, "deg) ").concat(translateY);
        var dynamicStyles = {
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
        };
        return __assign(__assign({}, dynamicStyles), style);
    };
    var handleResize = function () {
        var canvas = canvasRef.current;
        if (canvas) {
            var ctx = canvas.getContext("2d");
            if (!ctx)
                return;
            if (animationRef.current) {
                window.cancelAnimationFrame(animationRef.current);
            }
            adjustCanvasSize(canvas, ctx);
            initParticles();
            var c = configRef.current.c;
            animate(ctx, c.w, c.h);
        }
    };
    useEffect(function () {
        configRef.current = __assign(__assign({}, configRef.current), { count: count, size: size, speed: speed, colors: colors, blending: blending, opacity: opacity, skew: skew, shapes: initialShapes });
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        var parent = canvas.parentElement;
        if (!parent)
            return;
        adjustCanvasSize(canvas, ctx);
        var validBlending = isValidBlendingMode(blending)
            ? blending
            : "source-over";
        ctx.globalCompositeOperation = validBlending;
        initParticles();
        animate(ctx, configRef.current.c.w, configRef.current.c.h);
        var computedStyles = computeStyles();
        Object.entries(computedStyles).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            canvas.style[key] = value;
        });
        var debouncedHandleResize = debounce(handleResize, 100);
        window.addEventListener("resize", debouncedHandleResize);
        return function () {
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
        className,
        translateYcorrection,
    ]);
    return React.createElement("canvas", { ref: canvasRef, className: className });
};
export { GradientBackground };
