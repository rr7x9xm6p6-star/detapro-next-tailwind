'use client'
import { useEffect, useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="nav relative">

      {/* LEFT: Logo */}
      <a
        href="/"
        className="justify-self-start flex items-center gap-2"
        aria-label="Home"
      >
        <span className="inline-block w-6 h-6 rounded-md bg-black" aria-hidden="true" />
        <span className="brand">detapro</span>
      </a>

      {/* CENTER: Desktop menu */}
      <nav className="hidden md:flex justify-self-center">
        <ul className="flex gap-6 text-[15px] font-medium">
          <li><a href="/#latest-jobs">Latest jobs</a></li>
          <li><a href="/#proces">Proces</a></li>
          <li><a href="/#faq">FAQ</a></li>
          <li><a href="/#solliciteer">Solliciteer</a></li>
          <li><a href="./about/">Over ons</a></li>
          <li><a href="./contact/">Contact</a></li>
        </ul>
      </nav>

      {/* RIGHT: CTA */}
      <div className="hidden md:block justify-self-end">
        <a href="/#solliciteer" className="btn btn-solid">Solliciteer</a>
      </div>

      {/* MOBILE BUTTON */}
      <button
        className="btn btn-ghost md:hidden justify-self-end"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        Menu
      </button>

      {/* MOBILE MENU */}
      {open && (
        <ul
          id="mobile-nav"
          className="md:hidden absolute left-0 right-0 top-16 bg-white border-y border-border p-5 grid gap-4 text-lg font-medium"
        >
          <li><a href="/#latest-jobs">Latest jobs</a></li>
          <li><a href="/#proces">Proces</a></li>
          <li><a href="/#faq">FAQ</a></li>
          <li><a href="/#solliciteer">Solliciteer</a></li>
          <li><a href="./about/">Over ons</a></li>
          <li><a href="./contact/">Contact</a></li>

        </ul>
      )}

    </div>
  )
}
