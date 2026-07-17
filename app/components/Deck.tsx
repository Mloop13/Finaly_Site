"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";

// useLayoutEffect на сервере ругается — на клиенте берём его (снимает мигание до включения дека),
// на сервере откатываемся на useEffect.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const pad = (n: number) => String(n).padStart(2, "0");
const pageLabels = ["MAIN/ITHAKA", "PROJECTS", "METHOD", "ABOUT", "CONTACT"];

/**
 * Горизонтальный дек: каждая прямая дочерняя панель (`.deck-panel`) = один экран.
 * Листание колесом / клавишами / свайпом. На мобиле и при prefers-reduced-motion
 * дек выключается — панели становятся обычным вертикальным потоком (фолбэк).
 */
export function Deck({ children, hint = "листай" }: { children: ReactNode; hint?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(false);

  // Рефы-зеркала состояния — обработчики вешаются один раз и читают актуальные значения.
  const indexRef = useRef(0);
  const countRef = useRef(0);
  const enabledRef = useRef(false);
  const lockRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const go = useCallback((next: number) => {
    const max = countRef.current - 1;
    const clamped = next < 0 ? 0 : next > max ? max : next;
    if (clamped === indexRef.current) return;
    setIndex(clamped);
  }, []);

  // Подсчёт панелей + адаптивное включение дека (desktop + разрешённое движение).
  useIsomorphicLayoutEffect(() => {
    setCount(trackRef.current?.children.length ?? 0);
    const desktop = window.matchMedia("(min-width: 769px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(desktop.matches && !motion.matches);
    sync();
    desktop.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  // Класс на <body> — переводит header в fixed и глушит скролл страницы в режиме дека.
  useEffect(() => {
    document.body.classList.toggle("deck-on", enabled);
    return () => document.body.classList.remove("deck-on");
  }, [enabled]);

  // Активная панель (is-active) + data-index для якорной навигации.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      el.dataset.index = String(i);
      el.classList.toggle("is-active", enabled && i === index);
    });
  }, [index, enabled, count]);

  // Ввод: колесо / клавиатура / тач / клики по якорям. Вешаем один раз.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!enabledRef.current) return;
      e.preventDefault();
      if (lockRef.current) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 16) return;
      lockRef.current = true;
      go(indexRef.current + (delta > 0 ? 1 : -1));
      window.setTimeout(() => {
        lockRef.current = false;
      }, 760);
    };

    const onKey = (e: KeyboardEvent) => {
      if (!enabledRef.current) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          go(indexRef.current + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          go(indexRef.current - 1);
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(countRef.current - 1);
          break;
      }
    };

    let sx = 0;
    let sy = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (!enabledRef.current) return;
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!enabledRef.current) return;
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
        go(indexRef.current + (dx < 0 ? 1 : -1));
      }
    };

    // Якоря (#projects и т.п.) → переход к слайду, где лежит цель.
    const onClick = (e: MouseEvent) => {
      if (!enabledRef.current) return;
      const target = e.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href")!.slice(1);
      if (!id) return;
      const panel = document.getElementById(id)?.closest<HTMLElement>(".deck-panel");
      if (!panel || panel.dataset.index === undefined) return;
      e.preventDefault();
      go(Number(panel.dataset.index));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("click", onClick);
    };
  }, [go]);

  const style = enabled ? ({ "--deck-x": `-${index * 100}vw` } as CSSProperties) : undefined;
  const controlsStyle = {
    "--deck-fill": count > 1 ? `${((index + 1) / count) * 100}%` : "0%",
  } as CSSProperties;
  const headerSlot = typeof document !== "undefined" ? document.getElementById("deck-header-controls") : null;
  const headerControls =
    enabled && count > 1 ? (
      <div className={`deck-header-controls${index === count - 1 ? " is-complete" : ""}`} style={controlsStyle}>
        <nav className="deck-nav" aria-label="Навигация по страницам">
          {Array.from({ length: count }).map((_, i) => {
            const stateClass = `${i < index ? " is-past" : ""}${i <= index ? " is-filled" : ""}${
              i === index ? " is-active" : ""
            }`;
            return (
              <button
                key={i}
                type="button"
                className={`deck-dot${stateClass}`}
                aria-label={`Страница ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
              >
                <span>{pad(i + 1)}</span>
                {pageLabels[i] ?? `PAGE ${pad(i + 1)}`}
              </button>
            );
          })}
        </nav>
      </div>
    ) : null;

  return (
    <div className={`deck${enabled ? " is-enabled" : ""}`} style={style}>
      <div ref={trackRef} className="deck-track">
        {children}
      </div>

      {headerControls && (headerSlot ? createPortal(headerControls, headerSlot) : headerControls)}

      {enabled && count > 1 && (
        <>
          <div className={`deck-hint${index === 0 ? "" : " is-hidden"}`} aria-hidden="true">
            {hint} <span>→</span>
          </div>
        </>
      )}
    </div>
  );
}
