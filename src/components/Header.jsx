import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Phone, Menu, X, ChevronDown, Search, Calendar } from 'lucide-react'
import { siteData } from '../data/siteData'

const navItems = [
  { label: 'О клинике', href: '/o-klinike' },
  {
    label: 'Услуги',
    href: '/uslugi',
    children: [
      { label: 'Все специальности', href: '/uslugi' },
      { label: 'Гинекология', href: '/uslugi/ginekologiya' },
      { label: 'Репродуктология и ЭКО', href: '/uslugi/reproduktologiya' },
      { label: 'Кардиология', href: '/uslugi/kardiologiya' },
      { label: 'УЗИ-диагностика', href: '/uslugi/uzi-diagnostika' },
      { label: 'Гастроэнтерология', href: '/uslugi/gastroenterologiya' },
      { label: 'Неврология', href: '/uslugi/nevrologiya' },
      { label: 'Педиатрия', href: '/uslugi/pediatriya' },
      { label: 'Дерматология', href: '/uslugi/dermatologiya' },
    ],
  },
  { label: 'Врачи', href: '/vrachi' },
  { label: 'Цены', href: '/ceny' },
  { label: 'Акции', href: '/akcii' },
  { label: 'Адреса', href: '/adresa' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const headerBg = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
    : 'bg-transparent'
  const textColor = scrolled || !isHome ? 'text-brand-dark' : 'text-white'
  const logoColor = scrolled || !isHome ? 'text-brand-blue' : 'text-white'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              {/* Official Clinicist logo */}
              <img
                src="https://www.clinicist.ru/i/logo.png"
                alt="Клиницист"
                className={`h-10 w-auto transition-all duration-300 ${scrolled || !isHome ? '' : 'brightness-0 invert'}`}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback logo */}
              <div className="hidden items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${scrolled || !isHome ? 'bg-brand-blue' : 'bg-white/20 backdrop-blur-sm'}`}>
                  <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none">
                    <path d="M18 4C12 4 7 9 7 15c0 4 2 7.5 5 9.5L18 32l6-7.5c3-2 5-5.5 5-9.5 0-6-5-11-11-11z" fill="#00AEEF"/>
                    <path d="M18 4C12 4 7 9 7 15c0 4 2 7.5 5 9.5L18 32l6-7.5c3-2 5-5.5 5-9.5 0-6-5-11-11-11z" fill="#F47920" fillOpacity="0.5"/>
                  </svg>
                </div>
                <div>
                  <span className={`font-extrabold text-xl leading-none block transition-colors duration-300 ${logoColor}`} style={{ fontFamily: 'Aqum, Inter, sans-serif' }}>Клиницист</span>
                  <span className={`text-xs leading-none transition-colors duration-300 ${scrolled || !isHome ? 'text-brand-gray' : 'text-white/70'}`}>Сеть медицинских центров</span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive
                        ? (scrolled || !isHome ? 'bg-brand-light text-brand-blue' : 'bg-white/20 text-white')
                        : (scrolled || !isHome ? `${textColor} hover:bg-slate-100` : 'text-white/90 hover:text-white hover:bg-white/10')
                      }`
                    }
                  >
                    {item.label}
                    {item.children && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                  </NavLink>

                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-brand-dark hover:text-brand-blue hover:bg-brand-light transition-colors duration-150"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`hidden md:flex p-2 rounded-lg transition-all duration-200 ${scrolled || !isHome ? 'text-brand-gray hover:text-brand-blue hover:bg-slate-100' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                aria-label="Поиск"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Phone */}
              <a
                href={siteData.phoneHref}
                className={`hidden md:flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 px-3 py-2 rounded-lg ${scrolled || !isHome ? 'text-brand-blue hover:bg-brand-light' : 'text-white hover:bg-white/10'}`}
              >
                <Phone className="w-4 h-4" />
                {siteData.phone}
              </a>

              {/* CTA */}
              <Link
                to="/zapis"
                className="btn-primary text-sm py-2 px-4 hidden sm:inline-flex"
              >
                <Calendar className="w-4 h-4" />
                Записаться
              </Link>

              {/* Mobile Burger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${scrolled || !isHome ? 'text-brand-dark hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
                aria-label="Меню"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <span className="font-extrabold text-lg text-brand-dark">Меню</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors duration-200 mb-1 ${isActive ? 'bg-brand-light text-brand-blue' : 'text-brand-dark hover:bg-slate-50'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <div className="ml-4 mb-2 space-y-1">
                      {item.children.slice(1).map((child) => (
                        <NavLink
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-brand-gray hover:text-brand-blue rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="px-4 py-4 border-t border-slate-100 space-y-3">
              <a href={siteData.phoneHref} className="flex items-center gap-3 px-4 py-3 bg-brand-light rounded-xl font-semibold text-brand-blue">
                <Phone className="w-5 h-5" />
                {siteData.phone}
              </a>
              <Link to="/zapis" className="btn-primary w-full justify-center">
                <Calendar className="w-4 h-4" />
                Записаться на приём
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-up">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <Search className="w-5 h-5 text-brand-gray flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Поиск врача, услуги, направления..."
                className="flex-1 text-base outline-none text-brand-dark placeholder-slate-400"
              />
              <button onClick={() => setSearchOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-brand-gray" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-brand-gray mb-3">Популярные запросы</p>
              <div className="flex flex-wrap gap-2">
                {['Гинеколог', 'УЗИ', 'Кардиолог', 'ЭКО', 'Невролог', 'Дерматолог', 'Педиатр'].map((tag) => (
                  <button key={tag} className="px-3 py-1.5 bg-brand-light text-brand-blue text-sm font-medium rounded-full hover:bg-brand-blue hover:text-white transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
