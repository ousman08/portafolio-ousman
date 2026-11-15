import StatsPanel from '../components/StatsPanel.jsx'
import { useI18n } from '../i18n/LanguageProvider.jsx'

export default function About() {
  const { site, principles, services, ui } = useI18n()

  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-title"
      className="border-t border-line py-20 md:py-28"
    >
      <div className="shell grid gap-12 lg:grid-cols-[1.45fr_0.8fr] lg:gap-16">
        <div>
          <p className="label">{ui.aboutLabel}</p>
          <h2
            id="sobre-mi-title"
            className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl"
          >
            {ui.aboutTitle}
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-sm leading-relaxed text-muted md:text-base">
            <p className="text-base text-white md:text-lg">{ui.aboutLead}</p>
            <p>{ui.aboutBodyOne}</p>
            <p>{ui.aboutBodyTwo}</p>
          </div>

          <ul className="mt-10 max-w-2xl divide-y divide-line border-y border-line">
            {principles.map((principle, index) => (
              <li key={principle.title} className="grid gap-2 py-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                <span className="font-mono text-[0.58rem] tracking-[0.2em] text-ochre">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{principle.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{principle.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 border-t border-line pt-12">
            <p className="label">{ui.servicesLabel}</p>
            <h3 className="mt-4 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
              {ui.servicesTitle}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{ui.servicesIntro}</p>

            <ul className="mt-7 max-w-2xl divide-y divide-line border-y border-line">
              {services.map((service, index) => (
                <li key={service.title} className="grid gap-2 py-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                  <span className="font-mono text-[0.58rem] tracking-[0.2em] text-ochre">
                    0{index + 1}
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-white">{service.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{service.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white underline decoration-ochre/60 decoration-1 underline-offset-4 transition-colors hover:text-ochre"
            >
              {ui.githubProfile}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-white"
            >
              {site.email}
            </a>
          </div>
        </div>

        <StatsPanel />
      </div>
    </section>
  )
}
