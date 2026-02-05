
export default function Hero(){
  return (
    <section className="container section border-b border-border">
      <span className="eyebrow">Join detapro — Engineering-first</span>
      <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight">Voor professionals die verder willen.<br/>Zwart‑wit afspraken. Zero ruis.</h1>
      <p className="mt-3 text-lg text-neutral-800 max-w-3xl">Sluit je aan bij een netwerk van <strong>ervaren professionals in IT & Business</strong>. Kies voor een werkgever die bij jou past, met een team dat jouw groei serieus neemt.</p>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="pill">Cloud • Data • Integratie</span>
        <span className="pill">Dev • Ops • Sec</span>
        <span className="pill">Automation & AI</span>
        <span className="pill">Business & Functioneel</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-5">
        <a className="btn" href="#latest-jobs">Bekijk laatste vacatures</a>
        <a className="btn btn-solid" href="#solliciteer">Stuur je profiel</a>
      </div>
    </section>
  )
}
