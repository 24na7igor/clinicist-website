import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, MapPin, Filter, ChevronRight, Calendar, ArrowRight, X } from 'lucide-react'
import { doctors, doctorSpecialties } from '../data/doctors'
import { clinics } from '../data/clinics'
import { siteData } from '../data/siteData'

export default function DoctorsPage() {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('Все специальности')
  const [clinicFilter, setClinicFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    document.title = 'Врачи — Клиницист | 87 специалистов в Краснодаре'
  }, [])

  const filtered = doctors.filter((d) => {
    const matchSearch = search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase())
    const matchSpecialty = specialty === 'Все специальности' || d.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase())) || d.specialty.toLowerCase().includes(specialty.toLowerCase())
    const matchClinic = clinicFilter === 'all' || d.clinicId === clinicFilter || d.clinicId === null
    return matchSearch && matchSpecialty && matchClinic
  })

  const clearFilters = () => {
    setSearch('')
    setSpecialty('Все специальности')
    setClinicFilter('all')
  }

  const hasFilters = search || specialty !== 'Все специальности' || clinicFilter !== 'all'

  return (
    <div className="pt-20 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-brand-blue to-brand-blue-d py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Врачи</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Наши врачи</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            87 специалистов высшей квалификации, кандидаты медицинских наук, врачи с 20–40-летним опытом
          </p>

          {/* Search */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 mt-8 max-w-xl">
            <Search className="w-5 h-5 text-white/50 ml-2 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по имени или специальности..."
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm py-1"
            />
            {search && (
              <button onClick={() => setSearch('')} className="p-1 text-white/60 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="card p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-brand-dark">Фильтры</h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-brand-blue hover:underline">Сбросить</button>
                )}
              </div>

              {/* Specialty filter */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-3 block">Специальность</label>
                <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                  {doctorSpecialties.map((sp) => (
                    <button
                      key={sp}
                      onClick={() => setSpecialty(sp)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${specialty === sp ? 'bg-brand-blue text-white font-semibold' : 'text-brand-dark hover:bg-brand-light'}`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clinic filter */}
              <div>
                <label className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-3 block">Клиника</label>
                <div className="space-y-1">
                  <button
                    onClick={() => setClinicFilter('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${clinicFilter === 'all' ? 'bg-brand-blue text-white font-semibold' : 'text-brand-dark hover:bg-brand-light'}`}
                  >
                    Все клиники
                  </button>
                  {clinics.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setClinicFilter(c.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${clinicFilter === c.id ? 'bg-brand-blue text-white font-semibold' : 'text-brand-dark hover:bg-brand-light'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Doctors Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-brand-gray text-sm">
                Найдено: <b className="text-brand-dark">{filtered.length}</b> специалистов
              </p>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-brand-blue hover:underline flex items-center gap-1">
                  <X className="w-3 h-3" /> Сбросить фильтры
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-bold text-brand-dark text-xl mb-2">Ничего не найдено</h3>
                <p className="text-brand-gray mb-4">Попробуйте изменить параметры поиска</p>
                <button onClick={clearFilters} className="btn-secondary">Сбросить фильтры</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function DoctorCard({ doctor }) {
  const initials = doctor.name.split(' ').map(p => p[0]).join('').slice(0, 2)
  return (
    <div className="card p-5 group hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start gap-4">
        {doctor.photo ? (
          <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm bg-brand-light">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-[#00AEEF] to-[#0097CC] flex items-center justify-center text-white font-bold text-lg">${initials}</div>`
              }}
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-d flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-brand-teal font-semibold mb-0.5">{doctor.specialty}</div>
          <h3 className="font-bold text-brand-dark text-base leading-tight group-hover:text-brand-blue transition-colors duration-200">{doctor.name}</h3>
          {doctor.position && <div className="text-xs text-brand-gray mt-0.5">{doctor.position}</div>}
          <div className="text-xs text-brand-gray mt-0.5">{doctor.category}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {doctor.specialties.map((s) => (
          <span key={s} className="px-2 py-0.5 bg-brand-light text-brand-blue text-xs rounded-full">{s}</span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 py-3 border-t border-b border-slate-100">
        <div className="text-center">
          <div className="font-bold text-brand-dark text-sm">{doctor.experience}+</div>
          <div className="text-xs text-brand-gray">лет стажа</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-brand-dark text-sm">{doctor.rating}</span>
          </div>
          <div className="text-xs text-brand-gray">рейтинг</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-brand-dark text-sm">{doctor.reviews || '—'}</div>
          <div className="text-xs text-brand-gray">отзывов</div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-brand-gray mt-3 mb-4">
        <MapPin className="w-3 h-3" />
        {doctor.clinic}
      </div>

      <div className="flex gap-2">
        <Link to={`/vrachi/${doctor.slug}`} className="btn-ghost text-sm py-2 px-3 flex-1 justify-center border border-slate-200 rounded-xl hover:border-brand-blue">
          Профиль
        </Link>
        <Link to="/zapis" className="btn-primary text-sm py-2 px-3 flex-1 justify-center">
          <Calendar className="w-4 h-4" />
          Записаться
        </Link>
      </div>
    </div>
  )
}
