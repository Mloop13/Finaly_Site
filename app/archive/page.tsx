import "./archive.css";

const archiveProjects = [
  {
    id: "P-001",
    title: "Рейтинг-листы приёмной кампании",
    type: "DATA PROCESS / KVT",
    status: "CASE_PENDING",
    description:
      "Помощь Колледжу высоких технологий при БГТУ им. В. Г. Шухова: сборка рейтинг-листов из выгрузки примерно на 1200 заявлений, сохранение ручных правок и обработка нестандартных статусов.",
  },
  {
    id: "P-002",
    title: "Онлайн-запись в медицинский центр",
    type: "WEB APP / DATABASE",
    status: "COMPLETED",
    description:
      "Дипломное приложение: каталог специалистов и процедур, запись на приём, личный кабинет, история визитов и бизнес-логика.",
    href: "http://155.212.224.183",
  },
  {
    id: "P-003",
    title: "Сайт компании медицинского ПО",
    type: "WEBSITE / DELIVERY",
    status: "LIVE",
    description:
      "Сайт-визитка с каталогом продуктов: материалы, постановка задачи, визуальная система и итерации с заказчиком.",
    href: "https://mloop13.github.io/m207soft/",
  },
  {
    id: "P-004",
    title: "Личная агентная инфраструктура",
    type: "AI AGENTS / R&D",
    status: "IN_PROGRESS",
    description:
      "Сводки, Telegram-доставка, источники данных и база знаний — полигон для изучения AI-агентов на собственных процессах.",
  },
];

const processSteps = [
  ["01", "DECODE", "Перевожу размытый запрос в требования и сценарии."],
  ["02", "ASSEMBLE", "Собираю сайт, бота или автоматизацию с помощью AI."],
  ["03", "VERIFY", "Проверяю логику, ограничения и краевые случаи."],
  ["04", "DELIVER", "Показываю результат и провожу через итерации."],
];

export default function ArchivePage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <main className="archive-shell" id="archive-top">
      <header className="archive-header">
        <a className="archive-logo" href="#archive-top">ITHAKA_SYS</a>
        <nav aria-label="Навигация архивного режима">
          <a href="#archive-projects">[ PROJECTS ]</a>
          <a href="#archive-method">[ METHOD ]</a>
          <a href="#archive-about">[ IDENTITY ]</a>
        </nav>
        <div className="archive-head-status">
          <span className="archive-pulse" /> SYSTEM ONLINE
          <a href="/" className="archive-mode">MODE_03 ↗</a>
        </div>
      </header>

      <section className="archive-hero">
        <div className="archive-hero-copy">
          <div className="archive-kicker">/ARCHIVE · S-001 · PERSONAL SYSTEM</div>
          <h1>
            <span>FROM</span><span>CHAOS</span><span>TO SYSTEM</span>
          </h1>
          <div className="archive-specs">
            <span>SUBJECT: SERGEY TIMOSHENKO</span>
            <span>FIELD: WEB / AUTOMATION / AI</span>
            <span>VERSION: 01.ARCHIVE</span>
          </div>
          <p>
            Проектирую и собираю сайты, автоматизации и AI-инструменты. Удерживаю
            постановку задачи, бизнес-логику и проверку результата.
          </p>
          <div className="archive-actions">
            <a href="#archive-projects">ENTER THE ARCHIVE <span>→</span></a>
            <a href="https://telegram.me/Wand33rlust" target="_blank" rel="noreferrer">OPEN CHANNEL ↗</a>
          </div>
        </div>

        <div className="archive-portrait" aria-hidden="true">
          <div className="archive-corners" />
          <img src={`${basePath}/ithaka-archive-hero.webp`} alt="" />
          <div className="archive-scale">
            <i>00</i><i>20</i><i>40</i><i>60</i><i>80</i><i>100</i>
          </div>
          <span className="archive-scan-label">SCAN FIELD // 97.2%</span>
        </div>

        <aside className="archive-dashboard" aria-label="Системные показатели">
          <article>
            <span>// INDEX</span><strong>001</strong><small>ENTRY TOTAL / 04</small>
            <div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div>
          </article>
          <article>
            <span>// COORDINATES</span>
            <dl><dt>PATH</dt><dd>IT / HAKA</dd><dt>STATE</dt><dd>BUILDING</dd><dt>MODE</dt><dd>REMOTE</dd></dl>
          </article>
          <article>
            <span>// TIMELINE</span>
            <ol><li>2024 <b>INIT</b></li><li>2025 <b>EXPAND</b></li><li>2026 <b>NOW</b></li></ol>
          </article>
          <article>
            <span>// ACTIVITY</span>
            <div className="mini-graph"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
            <small>▲ PROCESS ACTIVE</small>
          </article>
        </aside>
      </section>

      <section className="archive-projects" id="archive-projects">
        <div className="archive-section-head">
          <div><span>/ 01</span><small>PROJECTS ARCHIVE</small></div>
          <h2>WORKING<br />ARTIFACTS</h2>
          <p>Задачи, которые удалось перевести из неопределённости в работающий результат.</p>
        </div>
        <div className="archive-project-grid">
          {archiveProjects.map((project, index) => {
            const card = (
              <>
                <div className="archive-card-head"><span>{project.id}</span><span>{project.status}</span></div>
                <div className="archive-card-visual" aria-hidden="true">
                  <div className="archive-radar"><i/><i/><i/></div>
                  <strong>0{index + 1}</strong>
                </div>
                <span className="archive-card-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="archive-card-foot"><span>READ ENTRY</span><b>↗</b></div>
              </>
            );
            return project.href ? (
              <a className="archive-card" href={project.href} target="_blank" rel="noreferrer" key={project.id}>{card}</a>
            ) : (
              <article className="archive-card" key={project.id}>{card}</article>
            );
          })}
        </div>
      </section>

      <section className="archive-method" id="archive-method">
        <div className="archive-method-main">
          <div className="archive-section-label">/ 02 · OPERATING PROTOCOL</div>
          <h2>HUMAN<br />DIRECTED_<br />AI ASSISTED</h2>
          <p>
            AI здесь — производственный инструмент. Я отвечаю за постановку задачи,
            логику, проверку и итоговый результат.
          </p>
        </div>
        <div className="archive-protocol">
          {processSteps.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p><b>[+]</b>
            </article>
          ))}
        </div>
      </section>

      <section className="archive-about" id="archive-about">
        <div className="archive-id-card">
          <span>// IDENTITY RECORD</span>
          <strong>ITHAKA</strong>
          <div className="archive-id-symbol">Σ</div>
          <dl><dt>NAME</dt><dd>SERGEY TIMOSHENKO</dd><dt>ROLE</dt><dd>SYSTEM BUILDER / JUNIOR</dd><dt>FOCUS</dt><dd>B2B LEADS / AUTOMATION</dd><dt>STATUS</dt><dd>LEARNING IN PUBLIC</dd></dl>
        </div>
        <div className="archive-about-copy">
          <div className="archive-section-label">/ 03 · PERSON BEHIND THE SYSTEM</div>
          <h2>Путь,<br />а не маска.</h2>
          <p className="archive-lead">
            ITHAKA — личная система Сергея Тимошенко: проекты, эксперименты и путь
            от первых рабочих решений к осознанной инженерной практике.
          </p>
          <p>
            Выпускник Колледжа высоких технологий по направлению «Информационные
            системы и программирование». Изучаю AI-агентов, автоматизацию и разработку
            через реальные задачи. Следующая серия кейсов — B2B-лидогенерация.
          </p>
          <div className="archive-links">
            <a href="https://github.com/Mloop13" target="_blank" rel="noreferrer">GITHUB ↗</a>
            <a href="https://telegram.me/Wand33rlust" target="_blank" rel="noreferrer">TELEGRAM ↗</a>
          </div>
        </div>
      </section>

      <section className="archive-contact">
        <span>// OPEN CHANNEL · READY FOR INPUT</span>
        <h2>INITIATE<br />A PROJECT_</h2>
        <a href="https://telegram.me/Wand33rlust" target="_blank" rel="noreferrer">SEND MESSAGE <b>→</b></a>
      </section>

      <footer className="archive-footer">
        <span>ITHAKA_SYS / ARCHIVE MODE</span><span>FROM CHAOS TO SYSTEM</span><span>© 2026</span>
      </footer>
    </main>
  );
}
