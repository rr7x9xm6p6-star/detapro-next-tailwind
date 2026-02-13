
'use client'
import { useEffect, useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMenu = () => setOpen(false)

  const menuItems = [
    { href: '/#latest-jobs', label: 'Latest jobs' },
    { href: '/#proces', label: 'Proces' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#solliciteer', label: 'Solliciteer' },
    { href: '/about', label: 'Over ons' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header
      style={{ display: 'flex' }}
      className="nav !flex items-center justify-between md:!grid md:grid-cols-[auto,1fr,auto] h-16 px-4 border-b"
    >
      {/* LEFT: Logo */}
      <a href="/" className="flex items-center gap-2" aria-label="Home">
        <span className="inline-block w-6 h-6 rounded-md bg-black" aria-hidden="true" />
        <span className="brand">detapro</span>
      </a>

      {/* CENTER (desktop) */}
      <nav className="hidden md:flex items-center justify-center">
        <ul className="flex items-center gap-6 md:flex-nowrap">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a className="whitespace-nowrap hover:text-neutral-900" href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* RIGHT CTA (desktop) */}
      <div className="hidden md:flex justify-end">
        <a href="/#solliciteer" className="btn btn-solid whitespace-nowrap">Solliciteer</a>
      </div>

      {/* MOBILE BUTTON (animated hamburger → X retained) */}
      <button
        className="md:hidden flex items-center gap-2 p-2 ml-auto"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Sluit menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        <span className="relative w-5 h-3" aria-hidden="true">
          <span className={'absolute left-0 top-0 block h-[2px] w-5 bg-neutral-900 transition-transform duration-200 ease-out ' + (open ? 'translate-y-[6px] rotate-45' : '')} />
          <span className={'absolute left-0 top-1/2 -translate-y-1/2 block h-[2px] w-5 bg-neutral-900 transition-opacity duration-150 ' + (open ? 'opacity-0' : 'opacity-100')} />
          <span className={'absolute left-0 bottom-0 block h-[2px] w-5 bg-neutral-900 transition-transform duration-200 ease-out ' + (open ? '-translate-y-[6px] -rotate-45' : '')} />
        </span>
        <span className="text-neutral-900 text-sm font-medium select-none">Menu</span>
      </button>

      {/* MOBILE MENU */}
      {open && (
        <ul
          id="mobile-nav"
          className="md:hidden absolute left-0 right-0 top-16 bg-white border-y border-border p-5 grid gap-4 text-lg font-medium"
        >
          {menuItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={closeMenu}>{item.label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
