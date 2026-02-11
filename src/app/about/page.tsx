
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Over ons – detapro",
  description: "Detachering voor Professionals. Ontdek wie we zijn en waar we voor staan.",
};

export default function AboutPage() {
  return (
    <main className="text-neutral-900">
      {/* HERO */}
      <section className="container section border-b border-border">
        <span className="eyebrow">Over ons</span>

        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
          Wij zijn detapro
        </h1>

        <p className="mt-4 text-lg max-w-3xl text-neutral-700">
          Detachering voor Professionals. Wij brengen ervaren specialisten samen
          met organisaties die vooruit willen — helder, betrokken en resultaatgericht.
        </p>

        <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden">
          <Image
            src="/about/hero_detapro.png"
            alt="detapro hero"
            width={1600}
            height={600}
            className="w-full"
            priority
          />
        </div>
      </section>

      {/* ONZE MANIER & WAAR WE VOOR STAAN */}
      <section className="container section">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="panel">
            <h2 className="text-2xl font-semibold mb-3">Onze manier</h2>
            <p className="text-neutral-700 leading-relaxed">
              We geloven in zwart‑wit afspraken en helder communiceren. Voor professionals
              betekent dat ruimte voor groei en opdrachten die echt passen. Voor opdrachtgevers:
              snelheid, kwaliteit en een partner die meedenkt.
            </p>
          </div>

          <div className="panel">
            <h2 className="text-2xl font-semibold mb-3">Waar we voor staan</h2>
            <ul className="list-disc pl-5 text-neutral-700 leading-relaxed">
              <li>Senior resultaat, zonder ruis</li>
              <li>Persoonlijk & betrokken</li>
              <li>Transparante voorwaarden</li>
              <li>Kennis, certificering en vakmanschap</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WAARDEN VISUAL 
      <section className="container py-6">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <Image
            src="/about/values_detapro.png"
            alt="Onze waarden"
            width={1400}
            height={800}
            className="w-full"
          />
        </div>
      </section>
      */}

      {/* TEAM & OFFICE */}
<section className="container section border-t border-b border-border">
  <div className="grid md:grid-cols-2 gap-6">

    {/* Team foto */}
    <figure className="border border-gray-200 rounded-xl overflow-hidden">
      {/* vaste verhouding → gelijke hoogte */}
      <div className="relative aspect-square md:aspect-[4/3] w-full">
        <img src="/about/team_detapro.png" alt="detapro team" className="object-cover w-full h-full" />
      </div>
    </figure>

    {/* Office foto */}
    <figure className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="relative aspect-square md:aspect-[4/3] w-full">
        <img src="/about/office_detapro.png" alt="detapro office" className="object-cover w-full h-full" />
      </div>
    </figure>

  </div>
</section>

      {/* CTA */}
      <section className="container section">
        <div className="panel">
          <h3 className="text-2xl font-bold mb-2">Samenwerken?</h3>
          <p className="text-neutral-700 mb-4">
            Ben je professional of opdrachtgever en wil je kennismaken? Stuur ons een bericht — we reageren
            binnen één werkdag.
          </p>
          <a href="mailto:info@detapro.nl" className="btn btn-solid">Mail detapro</a>
        </div>
      </section>
    </main>
  );
}
