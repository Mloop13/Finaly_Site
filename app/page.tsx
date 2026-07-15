const projects = [
  {
    index: "01",
    code: "KVT / ADMISSION",
    title: "Рейтинг-листы приёмной кампании",
    description:
      "Помог Колледжу высоких технологий при БГТУ им. В. Г. Шухова собрать рейтинг-листы из выгрузки примерно на 1200 заявлений: разнос данных, сохранение ручных правок и обработка нестандартных статусов.",
    meta: "PROCESS LOGIC · DATA · GOOGLE SHEETS",
    status: "CASE IN PREPARATION",
    className: "project--wide",
  },
  {
    index: "02",
    code: "MEDCENTER / 2026",
    title: "Онлайн-запись в медицинский центр",
    description:
      "Дипломное веб-приложение: специалисты и процедуры, запись на приём, личный кабинет, история визитов и связанная бизнес-логика.",
    meta: "WEB APP · DATABASE · UX",
    status: "COMPLETED",
    href: "http://155.212.224.183",
  },
  {
    index: "03",
    code: "M207 / 2026",
    title: "Сайт компании медицинского ПО",
    description:
      "Сайт-визитка с каталогом продуктов: сбор материалов, постановка задачи, визуальная система под фирменный стиль и итерации с заказчиком.",
    meta: "WEBSITE · ART DIRECTION · DELIVERY",
    status: "LIVE",
    href: "https://mloop13.github.io/m207soft/",
  },
  {
    index: "04",
    code: "AGENT LAB / R&D",
    title: "Личная агентная инфраструктура",
    description:
      "Ежедневные сводки, Telegram-доставка, источники данных и база знаний. Полигон для изучения AI-агентов на собственных процессах.",
    meta: "AI AGENTS · TELEGRAM · KNOWLEDGE",
    status: "IN PROGRESS",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Разобрать",
    text: "Перевожу размытый запрос в понятные требования, сценарии и границы результата.",
  },
  {
    number: "02",
    title: "Собрать",
    text: "Использую AI как производственный инструмент для сайтов, ботов и автоматизаций.",
  },
  {
    number: "03",
    title: "Проверить",
    text: "Ищу неоднозначности и краевые случаи до того, как они превратятся в проблемы.",
  },
  {
    number: "04",
    title: "Довести",
    text: "Показываю рабочий результат, собираю обратную связь и провожу через итерации.",
  },
];

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ITHAKA — наверх">
          ITHAKA<span className="brand-slash">/</span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#projects">Проекты</a>
          <a href="#method">Метод</a>
          <a href="#about">Обо мне</a>
        </nav>
        <a className="header-cta" href="https://github.com/Mloop13" target="_blank" rel="noreferrer">
          GitHub <span>↗</span>
        </a>
      </header>

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
            <span>Из хаоса —</span>
            <span>в работающую</span>
            <span>систему</span>
          </h1>
          <p>
            Проектирую и собираю сайты, автоматизации и AI-инструменты. Разбираю задачу,
            нахожу неоднозначности и довожу идею до рабочего результата.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Смотреть проекты <span>↓</span>
            </a>
            <a className="text-link" href="https://telegram.me/Wand33rlust" target="_blank" rel="noreferrer">
              Обсудить задачу <span>↗</span>
            </a>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-chevron">›</div>
          <img src={`${basePath}/ithaka-hero.webp`} alt="" />
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

      <section className="projects section" id="projects">
        <div className="section-heading">
          <div>
            <span className="section-index">/ 01</span>
            <p className="eyebrow">SELECTED WORK / PROOF OF PROCESS</p>
          </div>
          <h2>Работающие<br />артефакты</h2>
          <p className="section-intro">
            Здесь не коллекция технологий, а задачи, которые удалось превратить в результат.
            Новые кейсы по B2B-лидогенерации будут появляться по мере запуска.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => {
            const content = (
              <>
                <div className="project-top">
                  <span>{project.index}</span>
                  <span>{project.code}</span>
                  <span className="project-arrow">↗</span>
                </div>
                <div className="project-visual" aria-hidden="true">
                  <span className="project-orbit" />
                  <span className="project-glyph">{project.index}</span>
                  <span className="project-grid-lines" />
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-meta">
                  <span>{project.meta}</span>
                  <span>{project.status}</span>
                </div>
              </>
            );

            return project.href ? (
              <a
                className={`project-card ${project.className ?? ""}`}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.index}
              >
                {content}
              </a>
            ) : (
              <article className={`project-card ${project.className ?? ""}`} key={project.index}>
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className="method section" id="method">
        <div className="method-title">
          <span className="section-index">/ 02</span>
          <p className="eyebrow">OPERATING PRINCIPLES</p>
          <h2>Не магия.<br />Метод.</h2>
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

      <section className="about section" id="about">
        <div className="about-art" aria-hidden="true">
          <div className="about-code">
            01001001<br />01010100<br />01001000<br />01000001<br />01001011<br />01000001
          </div>
          <div className="about-circle">Σ</div>
        </div>
        <div className="about-copy">
          <span className="section-index">/ 03</span>
          <p className="eyebrow">SERGEY TIMOSHENKO / BUILDER IN PROGRESS</p>
          <h2>ITHAKA — это путь, а не маска.</h2>
          <p className="about-lead">
            Я выпускник Колледжа высоких технологий по направлению «Информационные системы
            и программирование». Изучаю AI-агентов, автоматизацию и разработку через реальные
            задачи — от сайтов до процессов с данными.
          </p>
          <p>
            Моя сильная сторона — не притворяться всезнающим разработчиком, а быстро разбираться
            в задаче, удерживать её логику и собирать решение с современными инструментами. Сейчас
            углубляю фундамент разработки и превращаю практику в воспроизводимую экспертизу.
          </p>
          <div className="about-links">
            <a href="https://github.com/Mloop13" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://telegram.me/Wand33rlust" target="_blank" rel="noreferrer">Telegram ↗</a>
          </div>
        </div>
      </section>

      <section className="contact section">
        <div className="contact-top">
          <span className="status-line"><span className="status-dot" /> OPEN CHANNEL</span>
          <span>BUILD 01 / 2026</span>
        </div>
        <h2>Есть хаос,<br />который пора<br />собрать?</h2>
        <a className="contact-action" href="https://telegram.me/Wand33rlust" target="_blank" rel="noreferrer">
          <span>Написать в Telegram</span>
          <strong>↗</strong>
        </a>
      </section>

      <footer>
        <a className="brand" href="#top">ITHAKA/</a>
        <p>PERSONAL SYSTEM OF SERGEY TIMOSHENKO</p>
        <p>FROM CHAOS TO SYSTEM © 2026</p>
      </footer>
    </main>
  );
}
