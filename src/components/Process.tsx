import SectionHeading from '@/components/SectionHeading'

export default function Process(){
  return (
    <section id="proces" className="container section">
      <div className="mb-8">
        <SectionHeading
          title="Sollicitatieproces"
          subtitle="Snel en respectvol. We houden van heldere verwachtingen."
          className="mb-6"
        />
      </div>
      <div className="grid gap-3">
        {[['Laat van je horen','Stuur ons je CV en vertel meteen waarom je met óns wilt werken. Wat drijft je? En minstens zo belangrijk: wat denk jij dat jij bij Detapro kunt toevoegen? We lezen alles met aandacht.'], ['Persoonlijke kennismaking','We plannen een korte, informele call. Jij vertelt over je ervaring, ambities en voorkeuren, wij nemen je mee in wie we zijn, waar we voor staan en hoe wij jou kunnen helpen groeien.'], ['Match & voorstel','Tijdens een goede lunch bespreken we of er een match is. We bespreken verwachtingen, scherpen wensen aan en zijn direct eerlijk: is dit een match, dan doen we je een concreet voorstel.'], ['Contract & kick-off','Handtekeningen gezet? Dan gaan we los. We zorgen voor een soepele onboarding en blijven betrokken door middel van regelmatige check-ins, zodat jij het beste uit jezelf haalt.']].map((s,i)=> (

          <div key={i} className="panel">
            <div className="flex items-start gap-3"><span className="pill">{String(i+1).padStart(2,'0')}</span><div><strong>{s[0]}</strong><p className="meta">{s[1]}</p></div></div>
          </div>
        ))}
      </div>
    </section>
  )
}
