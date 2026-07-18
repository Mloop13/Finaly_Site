"use client";

import { useEffect, useRef } from "react";

const LAYERS = [
  "ithaka-normal-v5.png",
  "ithaka-xray-v7.png",
  "ithaka-statue-v6.png",
  "ithaka-digital-v5.png",
];

type HeroScanProps = {
  basePath: string;
};

export function HeroScan({ basePath }: HeroScanProps) {
  const scannerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scanner = scannerRef.current;
    const canvas = canvasRef.current;
    const line = lineRef.current;
    const portrait = scanner?.closest(".hero-art") as HTMLElement | null;
    const ctx = canvas?.getContext("2d");

    if (!scanner || !canvas || !line || !portrait || !ctx) return;

    const images = LAYERS.map((name) => {
      const image = new Image();
      image.decoding = "async";
      image.src = `${basePath}/${name}`;
      return image;
    });

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let start = 0;

    const geometry = () => {
      const rect = scanner.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (image: HTMLImageElement | undefined) => {
      if (!image?.naturalWidth || !image.naturalHeight || !width || !height) return false;

      const portraitRect = portrait.getBoundingClientRect();
      const scannerRect = scanner.getBoundingClientRect();
      if (!portraitRect.width || !portraitRect.height || !scannerRect.width || !scannerRect.height) return false;

      const sx = ((scannerRect.left - portraitRect.left) / portraitRect.width) * image.naturalWidth;
      const sy = ((scannerRect.top - portraitRect.top) / portraitRect.height) * image.naturalHeight;
      const sw = (scannerRect.width / portraitRect.width) * image.naturalWidth;
      const sh = (scannerRect.height / portraitRect.height) * image.naturalHeight;

      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
      return true;
    };

    const drawClipped = (
      image: HTMLImageElement | undefined,
      x: number,
      y: number,
      rectWidth: number,
      rectHeight: number,
    ) => {
      if (rectWidth <= 0 || rectHeight <= 0) return true;

      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, rectWidth, rectHeight);
      ctx.clip();
      const drawn = draw(image);
      ctx.restore();

      return drawn;
    };

    const frame = (now: number) => {
      if (!width || !height || !images.length || images.some((image) => !image.complete || !image.naturalWidth)) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const phaseDuration = 2600;
      const t = (now - start) % (phaseDuration * LAYERS.length);
      const phase = Math.floor(t / phaseDuration) % images.length;
      const progress = (t % phaseDuration) / phaseDuration;
      const down = phase % 2 === 0;
      const y = down ? progress * height : (1 - progress) * height;
      const next = (phase + 1) % images.length;
      const currentImage = images[phase];
      const nextImage = images[next];

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      if (!currentImage?.naturalWidth || !nextImage?.naturalWidth) {
        raf = requestAnimationFrame(frame);
        return;
      }

      if (down) {
        drawClipped(nextImage, 0, 0, width, y);
        drawClipped(currentImage, 0, y, width, height - y);
      } else {
        drawClipped(currentImage, 0, 0, width, y);
        drawClipped(nextImage, 0, y, width, height - y);
      }

      line.style.transform = `translate3d(0, ${y}px, 0) translateY(-50%)`;
      raf = requestAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(geometry);
    resizeObserver.observe(portrait);
    resizeObserver.observe(scanner);

    Promise.allSettled(images.map((image) => image.decode())).then(() => {
      geometry();
      start = performance.now();
      raf = requestAnimationFrame(frame);
    });

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [basePath]);

  return (
    <div className="scan-window" ref={scannerRef}>
      <canvas ref={canvasRef} />
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
