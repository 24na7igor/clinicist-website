import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, MapPin, Calendar } from 'lucide-react'
import { promotions } from '../data/services'
import { siteData } from '../data/siteData'

export default function PromotionsPage() {
  useEffect(() => {
    document.title = 'Акции и скидки — Клиницист | Специальные предложения клиники Краснодар'
  }, [])

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-brand-orange to-orange-400 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link to="/" className="hover:text-white">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Акции</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Акции и скидки</h1>
          <p className="text-white/80 text-lg">Специальные предложения и комплексные программы со скидками</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {promotions.map((promo) => (
            <div key={promo.id} className="card overflow-hidden hover:-translate-y-1 transition-all duration-300 group">
              <div className={`h-2 bg-gradient-to-r ${promo.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="badge bg-brand-orange/10 text-brand-orange">{promo.badge}</span>
                  <span className="text-xs text-brand-gray bg-slate-100 px-2 py-1 rounded-full">До {promo.validUntil}</span>
                </div>
                <h2 className="font-bold text-brand-dark text-lg leading-tight mb-2 group-hover:text-brand-blue transition-colors">{promo.title}</h2>
                <p className="text-sm text-brand-gray leading-relaxed mb-5">{promo.description}</p>
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-brand-gray line-through">{promo.oldPrice}</div>
                      <div className="text-2xl font-extrabold text-brand-blue">{promo.newPrice}</div>
                    </div>
                    <div className="text-2xl font-extrabold text-brand-orange bg-orange-50 rounded-xl px-3 py-1">
                      -{promo.discount}%
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-brand-gray mb-4">
                    <MapPin className="w-3 h-3" />
                    {promo.clinic}
                  </div>
                  <Link to="/zapis" className="btn-primary w-full justify-center py-3">
                    <Calendar className="w-4 h-4" />
                    Записаться по акции
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info block */}
        <div className="bg-brand-light rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-brand-dark mb-2">Индивидуальные условия</h3>
          <p className="text-brand-gray mb-5 max-w-lg mx-auto">Узнайте об актуальных акциях для постоянных пациентов, семейных скидках и программах лояльности.</p>
          <a href={siteData.phoneHref} className="btn-primary">📞 {siteData.phone}</a>
        </div>
      </div>
    </div>
  )
}
