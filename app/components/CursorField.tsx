"use client";

import { useEffect, useRef } from "react";

/**
 * Фоновое поле знаков: в покое — едва заметная сетка, под курсором колонки
 * «нагреваются» и с них сыплется код.
 *
 * mode="always" — поле живёт постоянно (главная).
 * mode="hold"   — поле включается только пока зажата кнопка мыши, и плавно
 *                 гаснет после отпускания; в покое панель чистая.
 *
 * Кадры идут лишь пока панель видна и есть что показывать; при reduced-motion
 * поле не запускается вовсе.
 */
const GLYPHS = "01ΔΣΩ<>[]{}/\\=+*#%№ITHAKA".split("");
const rnd = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

export function CursorField({
  radius = 190,
  mode = "always",
}: {
  radius?: number;
  mode?: "always" | "hold";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const STEP = 15;
    const FONT = 11;
    const hold = mode === "hold";

    type Drop = { y: number; speed: number; len: number };
    type Col = { x: number; heat: number; drops: Drop[]; seed: string[] };

    let cols: Col[] = [];
    let W = 0;
    let H = 0;
    let rows = 0;
    let raf = 0;
    let visible = false;
    let pressed = false;
    // общая «видимость» поля: в hold-режиме доводится до 1 нажатием и плавно гаснет
    let pressure = hold ? 0 : 1;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (W < 2 || H < 2) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rows = Math.ceil(H / STEP) + 1;
      const n = Math.ceil(W / STEP) + 1;
      cols = [];
      for (let i = 0; i < n; i++) {
        const seed: string[] = [];
        for (let r = 0; r < rows; r++) seed.push(rnd());
        cols.push({ x: i * STEP, heat: 0, drops: [], seed });
      }
    };

    const frame = () => {
      if (!visible) {
        raf = 0;
        return;
      }
      if (document.body.classList.contains("chaos-game-focus")) {
        ctx.clearRect(0, 0, W, H);
        raf = 0;
        return;
      }
      pressure += ((pressed || !hold ? 1 : 0) - pressure) * 0.12;
      // погасло и никто не жмёт — стоп до следующего нажатия, кадры зря не крутим
      if (hold && !pressed && pressure < 0.01) {
        ctx.clearRect(0, 0, W, H);
        raf = 0;
        return;
      }

      ctx.clearRect(0, 0, W, H);
      ctx.font = `${FONT}px ui-monospace, Consolas, monospace`;

      for (const c of cols) {
        const dx = Math.abs(mouse.x - c.x);
        const near = dx < radius ? 1 - dx / radius : 0;
        c.heat += (near - c.heat) * 0.09;

        ctx.fillStyle = `rgba(1,222,130,${(0.04 + c.heat * 0.05) * pressure})`;
        for (let r = 0; r < rows; r++) {
          if (Math.random() < 0.002 + c.heat * 0.02) c.seed[r] = rnd();
          ctx.fillText(c.seed[r], c.x, r * STEP);
        }

        if (c.heat > 0.12 && Math.random() < c.heat * 0.07 && c.drops.length < 3) {
          c.drops.push({
            y: Math.max(0, mouse.y - 40 - Math.random() * 60),
            speed: 1.4 + Math.random() * 2.6,
            len: 5 + ((Math.random() * 9) | 0),
          });
        }
        for (let d = c.drops.length - 1; d >= 0; d--) {
          const drop = c.drops[d];
          drop.y += drop.speed;
          for (let k = 0; k < drop.len; k++) {
            const y = drop.y - k * STEP;
            if (y < 0 || y > H) continue;
            const fade = (1 - k / drop.len) * Math.min(1, c.heat * 1.6) * pressure;
            ctx.fillStyle =
              k === 0 ? `rgba(241,240,234,${0.9 * fade})` : `rgba(1,222,130,${0.7 * fade})`;
            ctx.fillText(rnd(), c.x, y);
          }
          if (drop.y - drop.len * STEP > H) c.drops.splice(d, 1);
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };
    const onChaosFocusChange = () => {
      if (!document.body.classList.contains("chaos-game-focus")) start();
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (!hold) start();
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      pressed = false;
    };
    const onDown = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      pressed = true;
      start();
    };
    const onUp = () => {
      pressed = false;
      start(); // добежать до нуля плавно, а не оборвать кадр
    };

    build();

    const ro = new ResizeObserver(() => build());
    ro.observe(wrap);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !hold) start();
      },
      { threshold: 0.02 }
    );
    io.observe(wrap);

    // события ловим на панели: сам canvas pointer-events:none, чтобы не
    // перехватывать клики по ссылкам и кнопкам поверх фона
    const host = wrap.parentElement ?? wrap;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    if (hold) {
      host.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
    }
    window.addEventListener("chaos-game-focus-change", onChaosFocusChange);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("chaos-game-focus-change", onChaosFocusChange);
    };
  }, [radius, mode]);

  return (
    <div ref={wrapRef} className="cursor-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
