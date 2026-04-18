import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, Phone, Calendar, X } from 'lucide-react'
import { serviceCategories } from '../data/services'
import { siteData } from '../data/siteData'

export default function PricesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = 'Цены на услуги — Клиницист | Прайс-лист клиники Краснодар'
  }, [])

  const allServices = serviceCategories.flatMap(cat =>
    cat.services.map(s => ({ ...s, category: cat.name, categoryId: cat.id, icon: cat.icon }))
  )

  const filtered = allServices.filter(s => {
    const matchCat = activeCategory === 'all' || s.categoryId === activeCategory
    const matchSearch = search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-blue to-brand-blue-d py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link to="/" className="hover:text-white">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Цены</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Прайс-лист</h1>
          <p className="text-white/70 text-lg max-w-xl">Ориентировочные цены на услуги клиники. Точную стоимость уточняйте по телефону.</p>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 mt-8 max-w-md">
            <Search className="w-5 h-5 text-white/50 ml-2 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Найти услугу..."
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
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div className="text-sm text-amber-800">
            <b>Внимание:</b> цены носят информационный характер. Точную стоимость уточняйте по телефону {' '}
            <a href={siteData.phoneHref} className="font-semibold underline hover:no-underline">{siteData.phone}</a>{' '}
            или в регистратуре любой клиники. Диапазон цен: от 180 до 28 590 рублей.
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="card p-3 sticky top-24">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all duration-150 ${activeCategory === 'all' ? 'bg-brand-blue text-white' : 'text-brand-dark hover:bg-brand-light'}`}
              >
                Все услуги
              </button>
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all duration-150 flex items-center gap-2 ${activeCategory === cat.id ? 'bg-brand-blue text-white' : 'text-brand-dark hover:bg-brand-light'}`}
                >
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Price table */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-brand-gray text-sm">Найдено позиций: <b className="text-brand-dark">{filtered.length}</b></p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="font-bold text-brand-dark text-lg mb-2">Ничего не найдено</h3>
                <button onClick={() => { setSearch(''); setActiveCategory('all') }} className="btn-secondary mt-2">Сбросить</button>
              </div>
            ) : (
              <div className="card overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-brand-light border-b border-slate-200 text-xs font-semibold text-brand-gray uppercase tracking-wide">
                  <div className="col-span-1">Раздел</div>
                  <div className="col-span-8">Наименование услуги</div>
                  <div className="col-span-3 text-right">Стоимость</div>
                </div>
                <div className="divide-y divide-slate-100">
                  {filtered.map((service, i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3.5 hover:bg-brand-light transition-colors duration-150 items-center">
                      <div className="col-span-1 text-lg">{service.icon}</div>
                      <div className="col-span-8">
                        <div className="text-sm font-medium text-brand-dark">{service.name}</div>
                        <div className="text-xs text-brand-gray mt-0.5">{service.category}</div>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="font-bold text-brand-blue text-sm">{service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-brand-blue to-brand-teal rounded-2xl text-white text-center">
              <h3 className="font-bold text-lg mb-2">Уточните стоимость у наших специалистов</h3>
              <p className="text-white/70 text-sm mb-4">Позвоните нам или запишитесь онлайн. Мы работаем ежедневно.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={siteData.phoneHref} className="px-6 py-2.5 bg-white text-brand-blue font-bold rounded-xl hover:bg-brand-light transition-colors">
                  <Phone className="w-4 h-4 inline mr-2" />
                  {siteData.phone}
                </a>
                <Link to="/zapis" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-colors">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Записаться онлайн
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
