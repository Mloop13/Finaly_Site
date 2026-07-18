"use client";

import { type CSSProperties, useEffect, useRef } from "react";

const LAYERS = [
  "ithaka-normal-v5.png",
  "ithaka-xray-v7.png",
  "ithaka-statue-v6.png",
  "ithaka-digital-v5.png",
];

const layerStyle = {
  position: "absolute",
  left: "-38.0137%",
  top: "-23.5445%",
  width: "171.2329%",
  height: "214.0411%",
  maxWidth: "none",
  objectFit: "contain",
  objectPosition: "center bottom",
  pointerEvents: "none",
  userSelect: "none",
} satisfies CSSProperties;

type HeroScanProps = {
  basePath: string;
};

export function HeroScan({ basePath }: HeroScanProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    const masks = Array.from(root.querySelectorAll<HTMLElement>(".scan-layer-mask"));
    let raf = 0;

    const frame = (now: number) => {
      const height = root.getBoundingClientRect().height;
      const duration = 12000;
      const segment = duration / LAYERS.length;
      const cycle = now % duration;
      const phase = Math.floor(cycle / segment);
      const progress = (cycle - phase * segment) / segment;
      const next = (phase + 1) % LAYERS.length;
      const down = phase % 2 === 0;
      const y = down ? progress * height : (1 - progress) * height;
      const nextClip = down ? `inset(0 0 ${height - y}px 0)` : `inset(${y}px 0 0 0)`;

      masks.forEach((mask, index) => {
        if (index === phase) {
          mask.style.opacity = "1";
          mask.style.clipPath = "inset(0 0 0 0)";
          mask.style.zIndex = "1";
          return;
        }

        if (index === next) {
          mask.style.opacity = "1";
          mask.style.clipPath = nextClip;
          mask.style.zIndex = "2";
          return;
        }

        mask.style.opacity = "0";
        mask.style.clipPath = "inset(0 0 100% 0)";
        mask.style.zIndex = "0";
      });

      line.style.transform = `translate3d(0, ${y}px, 0) translateY(-50%)`;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="scan-window" ref={rootRef}>
      {LAYERS.map((name, index) => (
        <div className="scan-layer-mask" key={name} style={{ opacity: index === 0 ? 1 : 0 }}>
          <img className="scan-layer" src={`${basePath}/${name}`} alt="" draggable={false} style={layerStyle} />
        </div>
      ))}
      <div className="scan-tint" />
      <div className="scan-line" ref={lineRef} />
      <div className="scan-cross">+</div>
      <div className="scan-meta">
        <span>SCULPT.EXE</span>
        <span>RENDER PASS_07</span>
        <span>STATUS: OK</span>
      </div>
    </div>
  );
}
