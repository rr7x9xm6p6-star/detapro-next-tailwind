
export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-5 py-10">
      <div className="space-y-2">
        <div className="flex items-center gap-2 brand"><span className="inline-block w-6 h-6 rounded-md bg-black" /> detapro</div>
        <p className="text-neutral-600 text-sm">Engineering‑first. Zwart‑wit afspraken. Senior resultaten.</p>
      </div>
      <div className="space-y-2 text-right">
        <div className="space-x-2">
          <a href="#latest-jobs">Laatste vacatures</a>
          <span>·</span>
          <a href="#proces">Proces</a>
          <span>·</span>
          <a href="#solliciteer">Solliciteer</a>
        </div>
        <small className="text-neutral-600">© {year} detapro.nl</small>
      </div>
    </div>
  )
}
