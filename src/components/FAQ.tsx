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
        <details className="panel"><summary className="font-semibold">Naar wat voor medewerkers zijn jullie op zoek?</summary><p className="mt-2">We zoeken gedreven professionals met ambitie, eigenaarschap en een proactieve mindset. Je bent zelfstandig, communicatief sterk en denkt mee, zowel met ons als met de klant. Technische kennis is belangrijk, maar je houding en leerbereidheid wegen net zo zwaar.</p></details>
        <details className="panel"><summary className="font-semibold">Hoe solliciteer ik bij Detapro?</summary><p className="mt-2">Stuur je CV en een korte motivatie waarin je vertelt waarom je bij ons wilt werken en wat jij kunt bijdragen. We nemen snel contact op voor een persoonlijke kennismaking om je ervaring, ambities en wensen te bespreken.</p></details>
        <details className="panel"><summary className="font-semibold">Kan ik op meerdere vacatures tegelijk reageren?</summary><p className="mt-2">Ja! Twijfel je welke rol het beste bij je past? Reageer gerust op meerdere vacatures of geef dit aan in je sollicitatie. Zo kunnen we samen de perfecte match vinden.</p></details>
        <details className="panel"><summary className="font-semibold">Welke voordelen biedt Detapro aan medewerkers?</summary><p className="mt-2">Persoonlijke begeleiding, groeimogelijkheden, projecten die bij je passen en een open, energieke cultuur.</p></details>
        <details className="panel"><summary className="font-semibold">Waar werken jullie en is remote mogelijk?</summary><p className="mt-2">Onze medewerkers werken op verschillende klantlocaties in de Randstad. Afhankelijk van het project is hybride of remote werken soms mogelijk. We stemmen dit altijd samen af.</p></details>
        <details className="panel"><summary className="font-semibold">Hoe ziet het onboarding-proces eruit?</summary><p className="mt-2">Na het tekenen van je contract start je onboarding: je maakt kennis met ons als organisatie, je eerste opdrachten en de systemen. We zorgen dat je goed voorbereid bent, en blijven betrokken met regelmatige check-ins.</p></details>
        <details className="panel"><summary className="font-semibold">Wat voor projecten of opdrachtgevers kan ik verwachten?</summary><p className="mt-2">Wij detacheren professionals bij toonaangevende bedrijven in de IT, zoals Azure Cloud projecten en applicatiebeheer. Je krijgt opdrachten die passen bij jouw ervaring en ambitie, zodat je kunt groeien in je vakgebied.</p></details>
       </div>
    </section>
  )
}
