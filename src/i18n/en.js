/**
 * English dictionary.
 *
 * Same shape as `es.js`. Content is a faithful translation of the verifiable
 * Spanish data: no facts are added or removed.
 */

const SITE = {
  name: 'Ousman Krubally',
  role: 'Full Stack Developer',
  email: 'oman7910@gmail.com',
  github: 'https://github.com/ousman08',
  githubHandle: 'github.com/ousman08',
  availability: 'Available to work and collaborate',
  currently: 'Matta’s Kitchen migrated to Next.js 16, pending deployment.',
}

const NAV = [
  { href: '#proyectos', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#sobre-mi', label: 'About' },
  { href: '#contacto', label: 'Contact' },
]

const STATS = [
  { value: '02', label: 'published projects' },
  { value: '04', label: 'practice repositories' },
  { value: '09', label: 'technologies in use' },
]

const SERVICES = [
  {
    title: 'Business websites',
    text: 'Landing pages, catalogues and orders via WhatsApp or email. No payment gateways or pieces the business does not need.',
  },
  {
    title: 'Custom front-end',
    text: 'React, Next.js and Tailwind. Fast, accessible interfaces that are easy to maintain.',
  },
  {
    title: 'Going live',
    text: 'Build, deployment and performance tuning. From repository to domain, without overpromising.',
  },
]

const PRINCIPLES = [
  {
    title: 'Build before promising',
    text: 'I would rather show code and projects than list capabilities.',
  },
  {
    title: 'Learn in public',
    text: 'Open repositories, even while the result is still imperfect.',
  },
  {
    title: 'Solve real problems',
    text: 'A catalogue, a cart, an order: things someone actually uses.',
  },
]

const PROJECTS = [
  {
    id: 'mattas-kitchen',
    name: "Matta's Kitchen",
    year: '2026',
    kind: 'Business website · catalogue and orders',
    status: 'Live · Next.js pending',
    summary:
      'Website for a catering business: a catalogue of 12 products priced in pounds, a persistent cart and checkout via WhatsApp or email, with no payment gateway.',
    problem:
      'Bring a kitchen business’s catalogue, prices and ordering method together on a single page, without building or paying for a payment gateway.',
    solution:
      'A React application with the catalogue as the single source of truth, a browser-side cart and an order summary sent via WhatsApp or email.',
    tech: ['Next.js 16', 'React 19', 'Vite', 'pnpm', 'Vercel'],
    highlights: [
      'Catalogue kept in a single data file: prices and products are edited without touching the components.',
      'Cart persisted in localStorage, totals calculated and instant feedback on add, with no state library.',
      'Conversational checkout: summary + WhatsApp or email, with no payment integration.',
      'Self-hosted fonts, local images and its own privacy policy.',
      'Migration from Vite + React Router to the Next.js App Router completed in the repository.',
    ],
    pending: [
      'The public URL still serves the Vite build; the Next.js version is finished in the repository but not yet deployed.',
      'Some product photographs are temporary.',
      'The interface is in English; translation remains undecided.',
    ],
    links: [
      { label: 'Live website', href: 'https://mattas-kitchen.vercel.app' },
      { label: 'Code on GitHub', href: 'https://github.com/ousman08/mattas-kitchen' },
    ],
    preview: {
      src: 'img/mattas-kitchen.webp',
      alt: 'Full page of Matta’s Kitchen: home, catalogue and privacy policy.',
      width: 1280,
      height: 2311,
      pan: '-65%',
    },
  },
  {
    id: 'website-cafeteria',
    name: 'Website Cafeteria',
    year: '2026',
    kind: 'Static landing page · HTML, CSS and JavaScript',
    status: 'Live',
    summary:
      'A café page built without frameworks: header, banner, categories and a product catalogue with cards.',
    problem:
      'Practise a complete website from start to finish —structure, styles and behaviour— without relying on frameworks.',
    solution:
      'Semantic HTML5, hand-written CSS and JavaScript for interaction, published as a static site on Vercel.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    highlights: [
      'Zero dependencies: the site is served as static files.',
      'Composed from reusable sections: header, categories and catalogue.',
      'Published with automatic deployments from GitHub.',
    ],
    pending: [
      'The repository has no published description or licence.',
      'The catalogue is in English (a sample café menu).',
    ],
    links: [
      { label: 'Live website', href: 'https://website-cafeteria-ten.vercel.app' },
      { label: 'Code on GitHub', href: 'https://github.com/ousman08/WebsiteCafeteria' },
    ],
    preview: {
      src: 'img/website-cafeteria.webp',
      alt: 'Full page of Website Cafeteria: header, categories and catalogue.',
      width: 1280,
      height: 2133,
      pan: '-62%',
    },
  },
  {
    id: 'este-portafolio',
    name: 'This portfolio',
    year: '2026',
    kind: 'Personal site · React and Tailwind',
    status: 'Local · ready to deploy',
    summary:
      'The page you are looking at: a single route, no router, no analytics and no third-party requests. All the weight is in the content.',
    problem:
      'To have a portfolio that loads fast, works with a keyboard and depends on no external services or database.',
    solution:
      'React 19 and Vite generate a static page; Tailwind provides the visual system. Anchors are native, typography is self-hosted and the form validates before opening your email client.',
    tech: ['React 19', 'Tailwind CSS 4', 'Vite 7', 'Vercel'],
    highlights: [
      'No router: native anchors remove the “skip to content” link bug.',
      'Mobile menu with trapped focus, Escape to close and scroll lock; invisible to the keyboard when closed.',
      'Real full-page screenshots that slide inside each card, using CSS only.',
      'Self-hosted Inter and zero third-party requests: no cookies, no analytics.',
    ],
    pending: [
      'Still need to assign the final domain and complete canonical and Open Graph with absolute URLs.',
      'The portrait photo is 256 px; a high-resolution original is still missing.',
    ],
    links: [
      {
        label: 'Code on GitHub',
        href: 'https://github.com/ousman08/portafolio-ousman',
      },
    ],
    preview: {
      src: 'img/portafolio.webp',
      alt: 'Full page of this portfolio.',
      width: 1280,
      height: 4471,
      pan: '-82%',
    },
  },
]

const LEARNING_REPOS = [
  {
    name: 'jscamp',
    description: 'Content and exercises from the InfoJobs JSCamp.',
    tech: 'JavaScript',
    href: 'https://github.com/ousman08/jscamp',
  },
  {
    name: 'git-fazt',
    description: 'Layout and CSS practice following a course.',
    tech: 'HTML · CSS',
    href: 'https://github.com/ousman08/git-fazt',
  },
  {
    name: 'Laboratorio_ciber',
    description: 'Cybersecurity and Python lab exercises and notes.',
    tech: 'Python',
    href: 'https://github.com/ousman08/Laboratorio_ciber',
  },
  {
    name: 'calculadora-divertida',
    description: 'A small calculator built with HTML and JavaScript.',
    tech: 'HTML · JavaScript',
    href: 'https://github.com/ousman08/calculadora-divertida',
  },
]

export const en = {
  lang: 'en',

  meta: {
    title: 'Ousman Krubally — Full Stack Developer',
    description:
      'Portfolio of Ousman Krubally, full stack developer. Real projects with React, Next.js and Node.js: catalogues, carts and business websites.',
    shortDescription:
      'Real projects with React, Next.js and Node.js. No fluff: problem, solution and what is still missing.',
    ogLocale: 'en_US',
  },

  ui: {
    skipToContent: 'Skip to content',

    // Navigation
    mainNavAria: 'Main navigation',
    mobileNavAria: 'Mobile navigation',
    menuDialogAria: 'Navigation menu',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageLabel: 'Language',
    talk: 'Let’s talk',

    // Hero
    heroLabel: 'Portfolio · 2026',
    heroRoleBefore: 'Full Stack',
    heroRoleHighlight: 'Developer',
    heroIntro:
      'I build business websites and products people actually use: catalogues, carts and orders. React, Next.js and Node.js, with attention to performance and accessibility.',
    seeProjects: 'View projects',
    portrait: 'Portrait',
    portfolioRoman: 'Portfolio · MMXXVI',
    portraitAlt: 'Black and white portrait of Ousman Krubally',

    // Stack
    tools: 'Tools',

    // Projects
    projectsLabel: '01 — Projects',
    projectsTitleBefore: 'Real work,',
    projectsTitleAfter: 'not mockups.',
    projectsIntro:
      'Three real pieces. Each entry tells the problem, the solution and what is still missing, without decoration.',
    practiceTitle: 'Practice repositories',
    practiceNote: 'Exercises and courses. They are not products, but they are open.',
    fullPage: 'Full page',
    technologies: 'Technologies',
    openCase: 'View technical case',
    closeCase: 'Close technical case',
    caseAria: (name) => `Technical case for ${name}`,
    problem: 'Problem',
    solution: 'Solution',
    decisions: 'Decisions',
    pending: 'Pending',

    // About
    aboutLabel: '02 — About me',
    aboutTitle: 'Learn by building.',
    aboutLead:
      'I am Ousman Krubally. I code, read and write. I am interested in the exact point where an idea becomes something another person can use.',
    aboutBodyOne:
      'I work with JavaScript, React and Node.js. I keep learning —courses, exercises and my own projects published on GitHub— and I revisit what I build until I understand why it works. When something fails, I look into it; when it works, too.',
    aboutBodyTwo:
      'I have just migrated Matta’s Kitchen to Next.js 16; that version still needs deploying. Meanwhile, I keep looking after this portfolio: performance, accessibility and code that reads well. Before promising something, I prefer to show it working.',
    servicesLabel: '03 — Services',
    servicesTitle: 'What I can build with you.',
    servicesIntro:
      'Clear scope, no unnecessary pieces. If I do not know how to do something yet, I say so before we start.',
    githubProfile: 'GitHub profile ↗',
    numbersTitle: 'In numbers',
    now: 'Now',

    // Contact
    contactLabel: '04 — Contact',
    contactTitleBefore: 'Shall we build',
    contactTitleAfter: 'something?',
    contactIntro:
      'If you have a business that needs a website, a project to get on track or a junior role where I fit, write to me. I read everything and reply.',
    directEmail: 'Direct email',
    copyEmail: 'Copy email',
    copiedEmail: 'Copied ✓',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'name@domain.com',
    messagePlaceholder: 'What you need, by when, and what budget you have.',
    prepareEmail: 'Prepare email',
    formNote:
      'This form does not send data to any server: it opens your email client with the message ready to review.',
    errorName: 'Enter your name (at least 2 characters).',
    errorEmail: 'Enter a valid email, for example name@domain.com.',
    errorMessage: 'Tell me a bit more: at least 10 characters.',
    statusReview: 'Check the highlighted fields before continuing.',
    statusOpening: 'Opening your email client with the message ready…',
    statusCopyFailed: (email) => `Could not copy. The email is ${email}.`,
    mailSubject: (name) => `Contact from the portfolio — ${name}`,
    mailName: 'Name:',
    mailEmail: 'Email:',

    // Footer
    footerNavAria: 'Footer links',
    footerEmail: 'Email',
    backToTop: 'Back to top ↑',
    footerNote: (year) => `© ${year} · No cookies or analytics`,
  },

  site: SITE,
  nav: NAV,
  stats: STATS,
  services: SERVICES,
  principles: PRINCIPLES,
  projects: PROJECTS,
  learningRepos: LEARNING_REPOS,
}
