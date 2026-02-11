
import { getRoles } from '@/lib/contentful'
import SectionHeading from '@/components/SectionHeading'


export default async function Roles(){
  const roles = await getRoles(6)
  return (
    <section className="container section">
      <div className="mb-8">
         <SectionHeading
          title="Open rollen"
          subtitle="Niet exact jouw match? Zet jezelf op de radar!"
          className="mb-6"
        />
      
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {roles.map(r => (
          <article key={r.id} className="panel">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <span className="pill">{r.contract || 'Contract'}</span>
            </div>
            <div className="meta mt-1">{r.location} {r.workMode?`• ${r.workMode}`:''}</div>
            <div className="flex gap-2 mt-3">
              <a className="btn btn-solid" href="#solliciteer">Solliciteer</a>
              <a className="btn" href={r.slug?`/jobs/${r.slug}`:'#'}>Bekijk rol</a>
            </div>
          </article>
        ))}
      </div>

      <div className="panel mt-4">
        <strong>Open sollicitatie</strong> — Deel je profiel en voorkeursstack; we pingen je zodra er een match is.
      </div>
    </section>
  )
}
