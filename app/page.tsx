"use client";

import { useLanguage } from "./i18n/context";
import { homeDict } from "./i18n/home";
import { LanguageToggle } from "./components/LanguageToggle";
import { Deck } from "./components/Deck";

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
          <a href={`${basePath}/play/`}>PLAY</a>
        </nav>
        <div className="header-actions">
          <LanguageToggle />
          <a className="header-cta" href="https://github.com/Mloop13" target="_blank" rel="noreferrer">
            GitHub <span>↗</span>
          </a>
        </div>
      </header>

      <Deck>
        {/* Панель 0 — Hero + ticker */}
        <div className="deck-panel hero-panel">
          <section className="hero" id="top">
            <div className="hero-status status-line">
              <span className="status-dot" /> SYSTEM ONLINE
              <span className="status-detail">PORTFOLIO / BUILD 01</span>
            </div>

            <div className="hero-word" aria-label="ITHAKA">
              ITHAKA
            </div>

            <div className="hero-copy">
              <div className="eyebrow">IT × HAKA / THE WAY TO A WORKING SYSTEM</div>
              <h1>
                {t.hero.lines.map((line) => (
                  <span key={line}>{line}</span>
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
                src={`${basePath}/ithaka-hero.webp`}
                alt=""
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
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

        {/* Панели 1–4 — Кейсы как под-слайды */}
        {projects.map((project, i) => (
          <section
            key={project.index}
            className={`deck-panel case-panel${project.className ? ` ${project.className}` : ""}`}
            id={i === 0 ? "projects" : undefined}
          >
            <div className="case-inner">
              <div className="case-head">
                <div className="case-tag">
                  <span className="section-index">/ 01 · SELECTED WORK</span>
                  <p className="eyebrow">PROOF OF PROCESS</p>
                </div>
                <span className="case-count">
                  <strong>{project.index}</strong> / 04
                </span>
              </div>

              {i === 0 && <p className="case-chapter">{t.projectsSection.intro}</p>}

              <div className="case-body">
                <div className="case-visual" aria-hidden="true">
                  <span className="project-orbit" />
                  <span className="project-glyph">{project.index}</span>
                  <span className="project-grid-lines" />
                </div>
                <div className="case-copy">
                  <div className="case-code">{project.code}</div>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <div className="case-meta">
                    <span>{project.meta}</span>
                    <span>{project.status}</span>
                  </div>
                  {project.href ? (
                    <a
                      className="button button-primary case-cta"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {lang === "ru" ? "Открыть проект" : "Open project"} <span>↗</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Панель 5 — Метод */}
        <section className="deck-panel method section" id="method">
          <div className="method-title">
            <span className="section-index">/ 02</span>
            <p className="eyebrow">OPERATING PRINCIPLES</p>
            <h2>
              {t.method.heading[0]}<br />{t.method.heading[1]}
            </h2>
            <div className="method-note">
              <span>AI ASSISTED</span>
              <span>HUMAN DIRECTED</span>
              <span>RESULT VERIFIED</span>
            </div>
          </div>
          <div className="capability-list">
            {capabilities.map((item) => (
              <article className="capability" key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <i>+</i>
              </article>
            ))}
          </div>
        </section>

        {/* Панель 6 — Обо мне */}
        <section className="deck-panel about section" id="about">
          <div className="about-art" aria-hidden="true">
            <div className="about-code">
              01001001<br />01010100<br />01001000<br />01000001<br />01001011<br />01000001
            </div>
            <div className="about-circle">Σ</div>
          </div>
          <div className="about-copy">
            <span className="section-index">/ 03</span>
            <p className="eyebrow">SERGEY TIMOSHENKO / BUILDER IN PROGRESS</p>
            <h2>{t.about.heading}</h2>
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
            <div className="contact-top">
              <span className="status-line"><span className="status-dot" /> OPEN CHANNEL</span>
              <span>BUILD 01 / 2026</span>
            </div>
            <h2>
              {t.contact.heading[0]}<br />{t.contact.heading[1]}<br />{t.contact.heading[2]}
            </h2>
            <a className="contact-action" href="https://telegram.me/Wand33rlust" target="_blank" rel="noreferrer">
              <span>{t.contact.action}</span>
              <strong>↗</strong>
            </a>
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
