
export default function Process(){
  return (
    <section id="proces" className="container section">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-semibold">Sollicitatieproces</h2>
        <p className="text-neutral-600 max-w-2xl">Snel en respectvol. We houden van heldere verwachtingen.</p>
      </div>
      <div className="grid gap-3">
        {[['Stuur je CV','Na het  versturen van je CV, zullen we deze zorgvuldig beoordelen. Pro Tip: Vermeld in je sollicitatie je motivatie om bij ons te komen werken en wat je denkt dat je voor Detapro kunt betekenen.'], ['Telefonische kennismaking','Korte call over je ervaring, voorkeuren en doelen. Wij vertellen je natuurlijk ook graag over wie wij zijn en wat wij voor jou kunnen betekenen.'], ['Match & voorstel','Tijdens een zakenlunch stemmen we elkaars wensen verder af en zullen we direct uitspreken of we een voorstel kunnen doen.'], ['Contract en Start','Wanneer de inkt opgedroogd is starten we jouw onboarding, daarna periodieke check‑ins.']].map((s,i)=> (
          <div key={i} className="panel">
            <div className="flex items-start gap-3"><span className="pill">{String(i+1).padStart(2,'0')}</span><div><strong>{s[0]}</strong><p className="meta">{s[1]}</p></div></div>
          </div>
        ))}
      </div>
    </section>
  )
}
