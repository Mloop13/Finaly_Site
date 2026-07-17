"use client";

import { useEffect, useRef, useState } from "react";

/**
 * «Из хаоса — в систему» — интерактивное поле частиц для панели About.
 * По умолчанию это песочница: точки мягко тянутся за курсором и так же мягко
 * возвращаются в хаос — свободная лепка без цели. Кнопка «Играть» включает
 * режим задачи: собранные точки фиксируются, цель — прорисовать Δ целиком.
 * Пауза вне вида; статичный символ при reduced-motion.
 */
const HINT_SANDBOX = "веди курсором — лепи Δ";
const HINT_PLAY = "собери Δ целиком";
const HINT_SOLVED = "Δ · система собрана";
const HELP_MESSAGES = [
  "держи курсор ближе к светлому контуру",
  "веди по ребрам Δ, точки фиксируются сами",
  "начни с вершины, потом спускайся по сторонам",
];

export function ChaosSystem() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // песочница — режим по умолчанию; «Играть» включает режим с фиксацией и целью
  const playRef = useRef(false);
  const resetRef = useRef<() => void>(() => {});
  const [playOn, setPlayOn] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const N = 110;

    type P = { hx: number; hy: number; cx: number; cy: number; x: number; y: number; ph: number; order: number; auto: number };
    let particles: P[] = [];
    let W = 0;
    let H = 0;
    // курсор сглаживаем отдельно от сырых событий — иначе точки дёргаются рывками
    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999, active: false };
    let raf = 0;
    let visible = false;
    let solved = false;
    let lastHelpAt = 0;
    let helpIndex = 0;
    let toastTimer = 0;

    const showToast = (text: string) => {
      window.clearTimeout(toastTimer);
      setToast(text);
      toastTimer = window.setTimeout(() => setToast(""), 4200);
    };

    /**
     * Точки цели — равносторонний Δ, построенный геометрией, а не шрифтом:
     * у буквенного Δ в Arial вершина даёт зазубрину и «оторванную» точку сверху.
     * Сэмплируем контур (рёбра) равномерно по периметру — форма читается чище,
     * чем у заливки, и точки распределяются ровно.
     */
    const sampleTriangle = (count: number) => {
      const A = { x: 0.5, y: 0.06 };
      const B = { x: 0.955, y: 0.94 };
      const C = { x: 0.045, y: 0.94 };
      const edges: [typeof A, typeof A][] = [
        [A, B],
        [B, C],
        [C, A],
      ];
      const len = (p: typeof A, q: typeof A) => Math.hypot(q.x - p.x, q.y - p.y);
      const total = edges.reduce((s, [p, q]) => s + len(p, q), 0);
      const pts: { x: number; y: number }[] = [];
      for (const [p, q] of edges) {
        const n = Math.max(2, Math.round((len(p, q) / total) * count));
        for (let i = 0; i < n; i++) {
          const t = i / n;
          pts.push({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
        }
      }
      return pts.slice(0, count);
    };

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
      const glyph = sampleTriangle(N);
      const side = Math.min(W, H) * 0.74;
      const ox = (W - side) / 2;
      const oy = (H - side) / 2;
      const next: P[] = [];
      for (let i = 0; i < glyph.length; i++) {
        const g = glyph[i];
        const prev = particles[i];
        next.push({
          hx: ox + g.x * side,
          hy: oy + g.y * side,
          cx: Math.random() * W,
          cy: Math.random() * H,
          x: prev ? prev.x : Math.random() * W,
          y: prev ? prev.y : Math.random() * H,
          ph: Math.random() * Math.PI * 2,
          order: prev ? prev.order : 0,
          auto: prev ? prev.auto : 0,
        });
      }
      particles = next;
      if (reduce) drawStatic();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(1,222,130,.85)";
      for (const p of particles) ctx.fillRect(p.hx - 2, p.hy - 2, 4, 4);
    };

    const frame = (ts: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      const rad = Math.min(W, H) * 0.18;
      ctx.clearRect(0, 0, W, H);

      // курсор догоняет свою цель плавно — источник «мягкости» всей сцены
      if (mouse.active) {
        mouse.sx += (mouse.x - mouse.sx) * 0.18;
        mouse.sy += (mouse.y - mouse.sy) * 0.18;
      }

      // призрачный контур виден всегда: в игре это цель, в песочнице — подсказка,
      // что здесь вообще есть форма (без него панель читается пустой)
      if (!solved) {
        const base = playRef.current ? 0.13 : 0.07;
        const pulse = base + 0.06 * (0.5 + 0.5 * Math.sin(ts / 900));
        ctx.fillStyle = `rgba(1,222,130,${pulse})`;
        for (const p of particles) ctx.fillRect(p.hx - 1.4, p.hy - 1.4, 2.8, 2.8);
      }

      let ordered = 0;
      for (const p of particles) {
        const dcx = p.cx + Math.cos(ts / 1400 + p.ph) * (W * 0.035);
        const dcy = p.cy + Math.sin(ts / 1600 + p.ph) * (H * 0.035);
        let want = 0;
        if (solved) want = 1;
        else {
          if (playRef.current && p.auto > 0) {
            p.auto = Math.max(0, p.auto - 0.012);
            want = Math.max(want, 0.86);
          }
          if (mouse.active) {
            const d = Math.hypot(mouse.sx - p.hx, mouse.sy - p.hy);
            const raw = 1 - Math.min(1, d / rad);
            want = Math.max(want, raw * raw * (3 - 2 * raw)); // smoothstep: мягкий край радиуса вместо резкой границы
          }
        }
        // притяжение мягкое; в игре собранное держится, в песочнице — плавно тает
        const ease = want > p.order ? 0.12 : playRef.current ? 0 : 0.028;
        p.order += (want - p.order) * ease;
        if (p.order > 0.7) ordered++;
        const o = p.order;
        p.x = dcx + (p.hx - dcx) * o;
        p.y = dcy + (p.hy - dcy) * o;
        const size = 1.8 + o * 2.6;
        ctx.fillStyle = `rgba(1,222,130,${0.3 + o * 0.62 + (solved ? 0.08 : 0)})`;
        if (o > 0.6) ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
        else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (playRef.current && !solved && particles.length && ts - lastHelpAt > 9000 && ordered / particles.length < 0.93) {
        lastHelpAt = ts;
        showToast(HELP_MESSAGES[helpIndex % HELP_MESSAGES.length]);
        helpIndex++;
      }

      // защёлкивается только в режиме игры — песочница это свободная лепка
      if (playRef.current && !solved && particles.length && ordered / particles.length >= 0.93) {
        solved = true;
        wrap.classList.add("is-solved");
        window.clearTimeout(toastTimer);
        setToast("");
        const hint = wrap.querySelector(".chaos-hint");
        if (hint) hint.textContent = HINT_SOLVED;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!reduce && !raf && visible) raf = requestAnimationFrame(frame);
    };

    const doReset = () => {
      const starterCount = playRef.current ? Math.min(20, particles.length) : 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.order = 0;
        p.auto = i < starterCount ? 1 : 0;
        p.cx = Math.random() * W;
        p.cy = Math.random() * H;
        p.x = p.cx;
        p.y = p.cy;
      }
      solved = false;
      lastHelpAt = performance.now();
      window.clearTimeout(toastTimer);
      setToast("");
      wrap.classList.remove("is-solved");
      const hint = wrap.querySelector(".chaos-hint");
      if (hint) hint.textContent = playRef.current ? HINT_PLAY : HINT_SANDBOX;
      if (reduce) drawStatic();
      else start();
    };
    resetRef.current = doReset;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      if (!mouse.active) {
        // первый вход — ставим сглаженную позицию на курсор, иначе точки рванут через всё поле
        mouse.sx = nx;
        mouse.sy = ny;
      }
      mouse.x = nx;
      mouse.y = ny;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.sx = -9999;
      mouse.sy = -9999;
    };

    build();

    const ro = new ResizeObserver(() => build());
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (reduce) drawStatic();
          else start();
        }
      },
      { threshold: 0.04 }
    );
    io.observe(wrap);

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(toastTimer);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const togglePlay = () => {
    const on = !playRef.current;
    playRef.current = on;
    setPlayOn(on);
    resetRef.current();
  };

  return (
    <div ref={wrapRef} className="chaos-field">
      <canvas ref={canvasRef} />
      <div className="chaos-controls">
        <button type="button" className="chaos-btn" onClick={() => resetRef.current()}>
          Сброс
        </button>
        <button
          type="button"
          className={`chaos-btn${playOn ? " is-on" : ""}`}
          onClick={togglePlay}
          aria-pressed={playOn}
        >
          {playOn ? "Играю" : "Играть"}
        </button>
      </div>
      <span className="chaos-hint">{HINT_SANDBOX}</span>
      <span className={`chaos-toast${toast ? " is-visible" : ""}`}>{toast}</span>
    </div>
  );
}
