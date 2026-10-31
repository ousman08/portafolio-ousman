import TechnologyIcon from '../icons/Technologies.jsx'
import { STACK } from '../data/stack.js'

/** Fila horizontal de logos monocromos. En móvil se desplaza en horizontal. */
export default function StackRow() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="border-y border-line">
      <div className="shell py-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
          <h2
            id="stack-title"
            className="flex-none font-mono text-[0.58rem] uppercase tracking-[0.22em] text-faint"
          >
            Herramientas
          </h2>

          <ul className="flex items-center gap-7 overflow-x-auto pb-1 [scrollbar-width:none] xl:w-full xl:justify-between xl:gap-4 xl:overflow-visible xl:pb-0 [&::-webkit-scrollbar]:hidden">
            {STACK.map((tech) => (
              <li key={tech.id} className="flex flex-none items-center gap-2.5">
                <span className="text-white/90">
                  <TechnologyIcon id={tech.id} />
                </span>
                <span className="whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.12em] text-neutral-300">
                  {tech.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
