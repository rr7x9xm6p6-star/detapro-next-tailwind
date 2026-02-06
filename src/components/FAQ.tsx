import SectionHeading from '@/components/SectionHeading'

export default function FAQ(){
  return (
    <section id="faq" className="container section">
      <div className="mb-8">
         <SectionHeading
          title="FAQ"
          subtitle="Praktische vragen die we vaak krijgen."
          className="mb-6"
        />
       </div>
      <div className="grid gap-3">
        <details className="panel"><summary className="font-semibold">Naar wat voor medewekers zoeken jullie?</summary><p className="mt-2">We zoeken medewekers die flink wat ervaring opgedaan hebben en nu op zoek zijn naar de volgende stap! Jij kiest wat past.</p></details>
        <details className="panel"><summary className="font-semibold">Hoe solliciteer ik voor een functie bij Detapro?</summary><p className="mt-2">We ondersteunen vast en contract/ZZP. Jij kiest wat past.</p></details>
        <details className="panel"><summary className="font-semibold">Naar welke kwaliteiten en skills zoekt Detapro?</summary><p className="mt-2">Transparante afspraken; tijdige betaling en heldere PO‑processen.</p></details>
        <details className="panel"><summary className="font-semibold">Kan ik op meerdere vacatures tegelijk reageren?</summary><p className="mt-2">Ja, vaak hybride of remote‑first — afhankelijk van opdracht en team.</p></details>
        <details className="panel"><summary className="font-semibold">Welke voordelen bieden jullie medewerkers?</summary><p className="mt-2">Ja, vaak hybride of remote‑first — afhankelijk van opdracht en team.</p></details>
      </div>
    </section>
  )
}
