"use client";

/**
 * Hero-портрет со сканирующим квадратом (принцип из demo.html пакета ассетов v2):
 * сам портрет статичен, а рентген и статуя проявляются ТОЛЬКО внутри зелёного
 * HUD-квадрата — вслед за белой линией, бегущей сверху вниз и обратно.
 * Область эффекта задана clip-path по тем же координатам, что и квадрат,
 * поэтому варианты нигде за его границы не выходят.
 */
export function ScanPortrait({ basePath }: { basePath: string }) {
  return (
    <div className="scan-portrait" aria-hidden="true">
      <div className="scan-frame">
        <img className="scan-base" src={`${basePath}/ithaka-hero.webp`} alt="" draggable={false} />
        <img className="scan-variant scan-variant--xray" src={`${basePath}/ithaka-hero-xray.webp`} alt="" draggable={false} />
        <img className="scan-variant scan-variant--statue" src={`${basePath}/ithaka-hero-statue.webp`} alt="" draggable={false} />
        <div className="scan-hud">
          <span className="scan-cross">+</span>
          <span className="scan-meta">
            SCULPT.EXE
            <br />
            RENDER PASS_07
            <br />
            STATUS: OK
          </span>
        </div>
      </div>
    </div>
  );
}
