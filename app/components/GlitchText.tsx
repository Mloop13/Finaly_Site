"use client";

type Line = { text: string; accent?: boolean };

export function GlitchText({
  lines,
}: {
  lines: Line[];
  mode?: "scramble" | "swap";
}) {
  return (
    <span className="glitch-text">
      {lines.map((line, i) => (
        <span key={line.text + i} className={`glitch-line${line.accent ? " h-accent" : ""}`}>
          {line.text}
        </span>
      ))}
    </span>
  );
}
