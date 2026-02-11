
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact – detapro",
  description: "Neem contact op met detapro. Detachering voor Professionals.",
};

export default function ContactPage() {
  return (
    <main className="text-neutral-900">
      {/* HERO */}
      <section className="container section border-b border-border">
        <span className="eyebrow">Contact</span>

        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
          Neem contact op<br />met detapro
        </h1>

        <p className="mt-4 text-lg max-w-2xl text-neutral-700">
          We staan in heel Nederland klaar voor professionals én opdrachtgevers. Heb je vragen
          over opdrachten, samenwerking of onze werkwijze? Laat van je horen.
        </p>
      </section>

      {/* CONTACT GRID */}
      <section className="container section">
        <div className="grid md:grid-cols-2 gap-6">

          <div className="panel">
            <h3 className="text-xl font-semibold mb-2">Bezoekadres</h3>
            <p className="text-neutral-700 leading-relaxed">
              Ceresstraat 1<br />
              4811CA Breda
            </p>
          </div>

          <div className="panel">
            <h3 className="text-xl font-semibold mb-2">Telefoon</h3>
            <p className="text-neutral-700 leading-relaxed">076 887 87 31</p>
          </div>

          <div className="panel">
            <h3 className="text-xl font-semibold mb-2">E-mail</h3>
            <p className="leading-relaxed">
              <a href="mailto:info@detapro.nl" className="underline">
                info@detapro.nl
              </a>
            </p>
          </div>

          <div className="panel">
            <h3 className="text-xl font-semibold mb-2">Beschikbaar voor</h3>
            <p className="text-neutral-700 leading-relaxed">
              Talent, teams en iedereen die vooruit wil. 
            </p>
          </div>

        </div>
      </section>

      {/* WHY DETAPRO */}
      <section className="container section border-t border-b border-border">
        <h2 className="text-3xl font-bold mb-4">Waarom detapro?</h2>

        <p className="max-w-3xl text-neutral-700 leading-relaxed">
          We geloven in helderheid, professionaliteit en samenwerking zonder
          ruis. Bij detapro werken we met een senior netwerk van IT- én business
          professionals: van beheerders en analisten tot projectleiders,
          testers en engineers. We houden van duidelijke afspraken, transparante
          communicatie en een hoge standaard in alles wat we doen.
        </p>
      </section>

      {/* CTA */}
      <section className="container section">
        <div className="panel">
          <h3 className="text-2xl font-bold mb-2">Klaar voor een gesprek?</h3>
          <p className="text-neutral-700 mb-4">
            Stuur ons een bericht en we reageren binnen één werkdag.
          </p>

          <a
            href="mailto:info@detapro.nl"
            className="btn btn-solid"
          >
            Mail ons
          </a>
        </div>
      </section>
    </main>
  );
}
