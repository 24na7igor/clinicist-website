import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, ArrowRight, X } from 'lucide-react'
import { serviceCategories } from '../data/services'

export default function ServicesPage() {
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = 'Услуги и специализации — Клиницист | 30+ направлений в Краснодаре'
  }, [])

  const filtered = serviceCategories.filter((s) =>
    search === '' ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0B3D8A] to-[#0F4C9E] py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Услуги</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Услуги и специализации</h1>
          <p className="text-white/70 text-lg max-w-2xl">30+ медицинских направлений — полный спектр помощи от профилактики до сложного лечения</p>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 mt-8 max-w-md">
            <Search className="w-5 h-5 text-white/50 ml-2 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Найти услугу или направление..."
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

      {/* All specialties quick-links */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2">
            {serviceCategories.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="px-3 py-1.5 bg-brand-light text-brand-blue text-xs font-medium rounded-full hover:bg-brand-blue hover:text-white transition-all duration-200">
                {s.icon} {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-bold text-brand-dark text-xl mb-2">Ничего не найдено</h3>
            <p className="text-brand-gray mb-4">Попробуйте другой запрос или позвоните нам</p>
            <button onClick={() => setSearch('')} className="btn-secondary">Сбросить поиск</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Bottom all specialties */}
        <div className="mt-16 text-center py-12 bg-brand-light rounded-3xl">
          <h3 className="text-2xl font-bold text-brand-dark mb-3">Не нашли нужную специальность?</h3>
          <p className="text-brand-gray mb-6">В наших клиниках работают 30+ специалистов. Позвоните — и мы подберём нужного врача.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+78612311231" className="btn-primary">
              📞 +7 (861) 231-1-231
            </a>
            <Link to="/vrachi" className="btn-secondary">
              Все врачи <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service }) {
  return (
    <div id={service.id} className="card group hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className={`h-1.5 bg-gradient-to-r ${service.color}`} />
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 bg-gradient-to-br ${service.color} shadow-sm group-hover:scale-110 transition-transform duration-200`}>
            {service.icon}
          </div>
          <div>
            <h3 className="font-bold text-brand-dark text-lg group-hover:text-brand-blue transition-colors duration-200">{service.name}</h3>
          </div>
        </div>

        <p className="text-brand-gray text-sm leading-relaxed mb-5">{service.description}</p>

        {/* Top services */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-3">Основные услуги</div>
          <div className="space-y-2">
            {service.services.slice(0, 4).map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                  <span className="text-brand-dark truncate">{s.name}</span>
                </div>
                <span className="text-brand-gray text-xs flex-shrink-0 font-medium">{s.price}</span>
              </div>
            ))}
            {service.services.length > 4 && (
              <div className="text-xs text-brand-blue font-medium mt-1">+{service.services.length - 4} ещё...</div>
            )}
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-slate-100">
          <Link to={`/uslugi/${service.slug}`} className="btn-secondary flex-1 justify-center text-sm py-2">
            Подробнее <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/zapis" className="btn-primary flex-1 justify-center text-sm py-2">
            Записаться
          </Link>
        </div>
      </div>
    </div>
  )
}
