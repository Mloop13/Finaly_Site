"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./i18n/context";
import { homeDict } from "./i18n/home";
import { LanguageToggle } from "./components/LanguageToggle";
import { Deck } from "./components/Deck";
import { ChaosSystem } from "./components/ChaosSystem";
import { GlitchText } from "./components/GlitchText";
import { CursorField } from "./components/CursorField";

const projectsMeta = [
  {
    index: "01",
    code: "KVT / ADMISSION",
    meta: "PROCESS LOGIC · DATA · GOOGLE SHEETS",
    status: "CASE IN PREPARATION",
    className: "project--wide",
  },
  {
    index: "02",
    code: "MEDCENTER / 2026",
    meta: "WEB APP · DATABASE · UX",
    status: "COMPLETED",
    href: "http://155.212.224.183",
  },
  {
    index: "03",
    code: "M207 / 2026",
    meta: "WEBSITE · ART DIRECTION · DELIVERY",
    status: "LIVE",
    href: "https://mloop13.github.io/m207soft/",
  },
  {
    index: "04",
    code: "AGENT LAB / R&D",
    meta: "AI AGENTS · TELEGRAM · KNOWLEDGE",
    status: "IN PROGRESS",
  },
];

const capabilityNumbers = ["01", "02", "03", "04"];

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const { lang } = useLanguage();
  const t = homeDict[lang];

  const [openCap, setOpenCap] = useState<number | null>(0);
  const toggleCap = (i: number) => setOpenCap((prev) => (prev === i ? null : i));

  // ITHAKA-подложку равняем по самой длинной строке заголовка. Считать константой
  // в CSS нельзя: у ru и en разные тексты («в работающую» / «into a working»),
  // а строки заголовка nowrap и выходят за свой блок — эталон только фактический текст.
  const wordRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const word = wordRef.current;
    const heading = headingRef.current;
    if (!word || !heading) return;

    const textWidth = (el: Element) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return range.getBoundingClientRect().width;
    };

    const fit = () => {
      let widest = 0;
      for (const line of heading.querySelectorAll("span")) widest = Math.max(widest, textWidth(line));
      const size = parseFloat(getComputedStyle(word).fontSize);
      const width = textWidth(word);
      if (!widest || !width || !size) return;
      // ширина слова линейна по font-size — снимаем коэффициент и решаем под нужную ширину
      word.style.fontSize = `${widest / (width / size)}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(heading);
    return () => ro.disconnect();
  }, [lang]);

  const projects = projectsMeta.map((meta, i) => ({ ...meta, ...t.projects[i] }));
  const capabilities = capabilityNumbers.map((number, i) => ({ number, ...t.capabilities[i] }));

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ITHAKA — наверх">
          ITHAKA<span className="brand-slash">/</span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#projects">{t.nav.projects}</a>
          <a href="#method">{t.nav.method}</a>
          <a href="#about">{t.nav.about}</a>
        </nav>
        <div className="header-actions">
          <span className="header-status status-line">
            <span className="status-dot" /> SYSTEM ONLINE
            <span className="status-detail">PORTFOLIO / BUILD 01</span>
          </span>
          <LanguageToggle />
          <a className="header-cta" href="https://github.com/Mloop13" target="_blank" rel="noreferrer">
            GitHub <span>↗</span>
          </a>
        </div>
      </header>

      <Deck hint={lang === "ru" ? "листай" : "scroll"}>
        {/* Панель 0 — Hero + ticker */}
        <div className="deck-panel hero-panel">
          <section className="hero" id="top">
            <CursorField />

            <div className="hero-word" ref={wordRef} aria-label="ITHAKA" data-text="ITHAKA">
              ITHAKA
              {/* третий канал глитча: ::before/::after заняты минтом и маджентой */}
              <span className="hero-word-layer" data-text="ITHAKA" aria-hidden="true" />
            </div>

            <div className="hero-copy">
              <div className="eyebrow">IT × HAKA / THE WAY TO A WORKING SYSTEM</div>
              <h1 className="glitch-h" ref={headingRef}>
                {t.hero.lines.map((line, i) => (
                  <span key={line} className={i === t.hero.lines.length - 1 ? "h-accent" : undefined}>
                    {line}
                  </span>
                ))}
              </h1>
              <p>{t.hero.paragraph}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  {t.hero.ctaPrimary} <span>↓</span>
                </a>
                <a className="text-link" href="https://telegram.me/Wand33rlust" target="_blank" rel="noreferrer">
                  {t.hero.ctaSecondary} <span>↗</span>
                </a>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="hero-chevron">›</div>
              <img
                className="hero-portrait"
                src={`${basePath}/ithaka-hero.webp`}
                alt=""
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <img className="hero-variant hero-variant-xray" src={`${basePath}/ithaka-hero-xray.webp`} alt="" draggable={false} />
              <img className="hero-variant hero-variant-statue" src={`${basePath}/ithaka-hero-statue.webp`} alt="" draggable={false} />
              <div className="scan-square">
                <span>SCULPT.EXE</span>
                <span>RENDER PASS_07</span>
                <span>STATUS: OK</span>
              </div>
              <div className="crosshair">+</div>
            </div>

            <div className="hero-side" aria-hidden="true">
              <span className="side-serif">MYTH</span>
              <span className="side-mono">/ METHOD</span>
              <span className="side-index">001—ITH</span>
            </div>

            <div className="hero-index">
              <span>ISSUE INDEX</span>
              <strong>01</strong>
              <span>/ 04</span>
            </div>
          </section>

          <div className="ticker" aria-label="Текущие направления">
            <div className="ticker-track">
              <span>AVAILABLE FOR PROJECTS</span><i>✦</i>
              <span>WEBSITES</span><i>✦</i>
              <span>AUTOMATION</span><i>✦</i>
              <span>AI SYSTEMS</span><i>✦</i>
              <span>B2B LEAD GENERATION / NEXT</span><i>✦</i>
              <span>AVAILABLE FOR PROJECTS</span><i>✦</i>
              <span>WEBSITES</span><i>✦</i>
              <span>AUTOMATION</span><i>✦</i>
            </div>
          </div>
        </div>

        {/* Панель 1 — Кейсы: сетка 2×2 */}
        <section className="deck-panel cases-panel section" id="projects">
          <CursorField mode="hold" />
          <div className="cases-head">
            <div className="cases-title">
              <div className="cases-head-inner">
                <h2>
                  <GlitchText
                    mode="swap"
                    lines={[{ text: t.projectsSection.heading[0] }, { text: t.projectsSection.heading[1], accent: true }]}
                  />
                </h2>
                <div className="cases-kicker">
                  <span className="section-index">/ 01</span>
                  <p className="eyebrow">SELECTED WORK / PROOF OF PROCESS</p>
                </div>
              </div>
            </div>
            <p className="cases-intro">{t.projectsSection.intro}</p>
            <span className="cases-count">
              <strong>04</strong> / 04
            </span>
          </div>
          <div className="cases-grid">
            {projects.map((project) => {
              const inner = (
                <>
                  <div className="case-card-top">
                    <span className="case-card-index">{project.index}</span>
                    <span className="case-card-code">{project.code}</span>
                    <span className="case-card-arrow">{project.href ? "↗" : "·"}</span>
                  </div>
                  <div className="case-card-mid">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="case-card-meta">
                    <span>{project.meta}</span>
                    <span>{project.status}</span>
                  </div>
                </>
              );
              return project.href ? (
                <a
                  key={project.index}
                  className="case-card"
                  data-glyph={project.index}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div key={project.index} className="case-card" data-glyph={project.index}>
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        {/* Панель 5 — Метод */}
        <section className="deck-panel method section" id="method">
          <CursorField mode="hold" />
          <div className="method-title">
            <div className="method-head">
              <h2>
                <GlitchText
                  mode="swap"
                  lines={[{ text: t.method.heading[0] }, { text: t.method.heading[1], accent: true }]}
                />
              </h2>
              <div className="method-kicker">
                <span className="section-index">/ 02</span>
                <p className="eyebrow">OPERATING PRINCIPLES</p>
              </div>
            </div>
            <div className="method-note">
              <span>AI ASSISTED</span>
              <span>HUMAN DIRECTED</span>
              <span>RESULT VERIFIED</span>
            </div>
            <div className="method-figure" aria-hidden="true">
              <span className="method-count">04</span>
              <span className="method-count-label">CORE STEPS</span>
              <span className="method-bars"><i /><i /><i /><i /></span>
            </div>
          </div>
          <div className="method-right">
            <div className="capability-list">
            {capabilities.map((item, i) => {
              const open = openCap === i;
              return (
                <article
                  className={`capability${open ? " is-open" : ""}`}
                  key={item.number}
                  onClick={() => toggleCap(i)}
                  aria-expanded={open}
                >
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <i aria-hidden="true">+</i>
                </article>
              );
            })}
            </div>
          </div>
        </section>

        {/* Панель 6 — Обо мне */}
        <section className="deck-panel about section" id="about">
          <CursorField mode="hold" />
          <div className="about-art">
            <ChaosSystem />
          </div>
          <div className="about-copy">
            <div className="about-kicker">
              <span className="section-index">/ 03</span>
              <p className="eyebrow">SERGEY TIMOSHENKO / BUILDER IN PROGRESS</p>
            </div>
            <h2><GlitchText mode="scramble" lines={[{ text: t.about.heading }]} /></h2>
            <p className="about-lead">{t.about.lead}</p>
            <p>{t.about.paragraph}</p>
            <div className="about-links">
              <a href="https://github.com/Mloop13" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://telegram.me/Wand33rlust" target="_blank" rel="noreferrer">Telegram ↗</a>
            </div>
          </div>
        </section>

        {/* Панель 7 — Контакт + footer */}
        <div className="deck-panel contact-panel">
          <section className="contact section">
            <CursorField mode="hold" />
            <div className="contact-top">
              <span className="status-line"><span className="status-dot" /> OPEN CHANNEL</span>
              <span>BUILD 01 / 2026</span>
            </div>
            <h2 className="glitch-chroma">
              {t.contact.heading[0]}<br />{t.contact.heading[1]}<br /><span className="h-accent">{t.contact.heading[2]}</span>
            </h2>
            <div className="contact-channels">
              <a className="contact-action" href="https://telegram.me/Wand33rlust" target="_blank" rel="noreferrer">
                <span>{t.contact.action}</span>
                <em>@Wand33rlust</em>
                <strong>↗</strong>
              </a>
              <a className="contact-action" href="mailto:ithakawork@gmail.com">
                <span>{t.contact.actionEmail}</span>
                <em>ithakawork@gmail.com</em>
                <strong>↗</strong>
              </a>
              <a className="contact-action" href="https://x.com/Wand33rlust_" target="_blank" rel="noreferrer">
                <span>{t.contact.actionX}</span>
                <em>@Wand33rlust_</em>
                <strong>↗</strong>
              </a>
            </div>
          </section>

          <footer>
            <a className="brand" href="#top">ITHAKA/</a>
            <p>PERSONAL SYSTEM OF SERGEY TIMOSHENKO</p>
            <p>FROM CHAOS TO SYSTEM © 2026</p>
          </footer>
        </div>
      </Deck>
    </main>
  );
}
