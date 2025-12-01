import React from 'react'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'

export const AboutSection: React.FC = () => {
  return (
    <Section id="me" ariaLabel="Sobre mim">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-6 md:p-8 lg:p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900 dark:text-white">
              Me
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                Senior Mobile Developer com 6+ anos de experiência construindo aplicações acessíveis, 
                escaláveis e de alta performance para Android e iOS, especializada em React Native e 
                arquiteturas frontend modernas. Projeto e implemento fluxos mobile robustos com práticas 
                a11y-first, garantindo experiências compatíveis com WCAG validadas através de TalkBack, 
                VoiceOver e auditorias de acessibilidade end-to-end.
              </p>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                Experiente em arquitetura modular de apps, armazenamento seguro, padrões offline-first, 
                e otimização de performance em sistemas de design complexos e ambientes multi-marca. 
                Prática com React Native, TypeScript, React, Redux/Zustand, GraphQL, REST, Jest/React 
                Testing Library, Maestro E2E, pipelines CI/CD (GitHub Actions, GitLab CI, Fastlane), 
                e ferramentas de observabilidade.
              </p>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Colaboro de perto com produto, design, QA e cibersegurança para construir codebases 
                mantíveis, fundações de UI escaláveis e pipelines de release confiáveis. Habilidosa 
                em diagnosticar inconsistências de leitores de tela, resolver problemas de gerenciamento 
                de foco, implementar bibliotecas de componentes semânticos, e impulsionar melhorias de 
                acessibilidade que impactam milhões de usuários globalmente.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Location</h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-300">Brazil</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Resume</h3>
                <a
                  href="#"
                  className="text-lg text-primary-600 dark:text-primary-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
