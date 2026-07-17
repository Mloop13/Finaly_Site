import type { Lang } from "./context";

export type HomeDict = {
  nav: { projects: string; method: string; about: string };
  hero: {
    lines: string[];
    paragraph: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  projectsSection: { heading: string[]; intro: string };
  projects: Array<{ title: string; description: string; proof: string }>;
  method: { heading: string[] };
  capabilities: Array<{ title: string; text: string }>;
  about: { heading: string; lead: string; paragraph: string };
  contact: { heading: string[]; action: string; actionEmail: string; actionX: string };
};

const ru: HomeDict = {
  nav: { projects: "Проекты", method: "Метод", about: "Обо мне" },
  hero: {
    lines: ["Из хаоса —", "в рабочую", "систему"],
    paragraph:
      "Собираю сайты, автоматизации и AI-инструменты для задач, где важны логика, данные и быстрый запуск. Превращаю размытый запрос в рабочий результат, который можно показать клиенту или команде.",
    ctaPrimary: "Смотреть проекты",
    ctaSecondary: "Обсудить задачу",
  },
  projectsSection: {
    heading: ["Работающие", "артефакты"],
    intro:
      "Здесь не коллекция технологий, а задачи, которые удалось превратить в результат. Новые кейсы по B2B-лидогенерации будут появляться по мере запуска.",
  },
  projects: [
    {
      title: "Рейтинг-листы приёмной кампании",
      proof: "≈1200 заявлений переведены в рейтинг-листы",
      description:
        "Помог Колледжу высоких технологий при БГТУ им. В. Г. Шухова собрать рейтинг-листы из выгрузки примерно на 1200 заявлений: разнос данных, сохранение ручных правок и обработка нестандартных статусов.",
    },
    {
      title: "Онлайн-запись в медицинский центр",
      proof: "Полный сценарий записи от процедуры до истории визитов",
      description:
        "Дипломное веб-приложение: специалисты и процедуры, запись на приём, личный кабинет, история визитов и связанная бизнес-логика.",
    },
    {
      title: "Сайт компании медицинского ПО",
      proof: "Живой каталог продуктов с клиентскими итерациями",
      description:
        "Сайт-визитка с каталогом продуктов: сбор материалов, постановка задачи, визуальная система под фирменный стиль и итерации с заказчиком.",
    },
    {
      title: "Личная агентная инфраструктура",
      proof: "Ежедневные сводки, Telegram-доставка и база знаний",
      description:
        "Ежедневные сводки, Telegram-доставка, источники данных и база знаний. Полигон для изучения AI-агентов на собственных процессах.",
    },
  ],
  method: { heading: ["Не магия.", "Метод."] },
  capabilities: [
    { title: "Разобрать", text: "Перевожу размытый запрос в понятные требования, сценарии и границы результата." },
    { title: "Собрать", text: "Использую AI как производственный инструмент для сайтов, ботов и автоматизаций." },
    { title: "Проверить", text: "Ищу неоднозначности и краевые случаи до того, как они превратятся в проблемы." },
    { title: "Довести", text: "Показываю рабочий результат, собираю обратную связь и провожу через итерации." },
  ],
  about: {
    heading: "ITHAKA — это путь, а не маска.",
    lead:
      "Я выпускник Колледжа высоких технологий по направлению «Информационные системы и программирование». Изучаю AI-агентов, автоматизацию и разработку через реальные задачи — от сайтов до процессов с данными.",
    paragraph:
      "Моя сильная сторона — не притворяться всезнающим разработчиком, а быстро разбираться в задаче, удерживать её логику и собирать решение с современными инструментами. Сейчас углубляю фундамент разработки и превращаю практику в воспроизводимую экспертизу.",
  },
  contact: {
    heading: ["Есть хаос,", "который пора", "собрать?"],
    action: "Написать в Telegram",
    actionEmail: "Написать на почту",
    actionX: "Читать в X",
  },
};

const en: HomeDict = {
  nav: { projects: "Projects", method: "Method", about: "About" },
  hero: {
    lines: ["Out of chaos —", "into a working", "system"],
    paragraph:
      "I build websites, automations, and AI tools for tasks where logic, data, and launch speed matter. I turn a vague request into a working result that can be shown to a client or a team.",
    ctaPrimary: "View projects",
    ctaSecondary: "Discuss a project",
  },
  projectsSection: {
    heading: ["Working", "artifacts"],
    intro:
      "Not a stack of technologies — tasks turned into results. New B2B lead-gen cases will land here as they ship.",
  },
  projects: [
    {
      title: "Admission rating sheets",
      proof: "~1,200 applications reshaped into rating sheets",
      description:
        "Helped the College of High Technologies at BSTU named after V. G. Shukhov build rating sheets from a ~1,200-application export: reshaping data, preserving manual edits, and handling non-standard statuses.",
    },
    {
      title: "Online booking for a medical center",
      proof: "Full booking flow from procedure to visit history",
      description:
        "Capstone web app: specialists and procedures, appointment booking, a personal account, visit history, and the business logic behind it.",
    },
    {
      title: "Website for a medical software company",
      proof: "Live product catalog with client-side iteration",
      description:
        "A business-card site with a product catalog: gathering materials, framing the task, a visual system on brand, and iterating with the client.",
    },
    {
      title: "Personal agent infrastructure",
      proof: "Daily digests, Telegram delivery, and a knowledge base",
      description:
        "Daily digests, Telegram delivery, data sources, and a knowledge base. A testbed for learning AI agents on my own workflows.",
    },
  ],
  method: { heading: ["Not magic.", "A method."] },
  capabilities: [
    { title: "Decode", text: "I turn a vague request into clear requirements, scenarios, and the boundaries of the result." },
    { title: "Assemble", text: "I use AI as a production tool for websites, bots, and automations." },
    { title: "Verify", text: "I hunt for ambiguity and edge cases before they turn into problems." },
    { title: "Deliver", text: "I show a working result, gather feedback, and carry it through iterations." },
  ],
  about: {
    heading: "ITHAKA is a path, not a mask.",
    lead:
      "I'm a graduate of the College of High Technologies, Information Systems and Programming track. I'm learning AI agents, automation, and development through real tasks — from websites to data pipelines.",
    paragraph:
      "My strength isn't pretending to be an all-knowing developer — it's getting into a task fast, holding its logic, and assembling a solution with modern tools. Right now I'm deepening the fundamentals and turning practice into reproducible expertise.",
  },
  contact: {
    heading: ["There's chaos,", "that's ready", "to be built?"],
    action: "Message on Telegram",
    actionEmail: "Send an email",
    actionX: "Follow on X",
  },
};

export const homeDict: Record<Lang, HomeDict> = { ru, en };
