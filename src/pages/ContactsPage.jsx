import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, Clock, MapPin, ChevronRight, Calendar, Star } from 'lucide-react'
import { clinics } from '../data/clinics'
import { siteData } from '../data/siteData'

export default function ContactsPage() {
  const [activeClinic, setActiveClinic] = useState(clinics[0].id)
  const active = clinics.find(c => c.id === activeClinic)

  useEffect(() => {
    document.title = 'Адреса и контакты — Клиницист | 6 клиник в Краснодаре'
  }, [])

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-blue to-brand-blue-d py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link to="/" className="hover:text-white">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Адреса и контакты</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Адреса и контакты</h1>
          <p className="text-white/70 text-lg">6 клиник в ключевых районах Краснодара — удобно для жителей всего города</p>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Quick contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <a href={siteData.phoneHref} className="card p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs text-brand-gray mb-0.5">Единый номер</div>
              <div className="font-bold text-brand-blue text-base">{siteData.phone}</div>
              <div className="text-xs text-brand-gray">{siteData.workHours}</div>
            </div>
          </a>

          <a href={`mailto:${siteData.email}`} className="card p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-brand-teal flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs text-brand-gray mb-0.5">Email</div>
              <div className="font-bold text-brand-dark text-sm">{siteData.email}</div>
              <div className="text-xs text-brand-gray">Для общих вопросов</div>
            </div>
          </a>

          <div className="card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs text-brand-gray mb-0.5">Режим работы</div>
              <div className="font-bold text-brand-dark text-sm">Пн–Пт 08:00–20:00</div>
              <div className="text-xs text-brand-gray">Сб–Вс: 08:00–15:00/18:00</div>
            </div>
          </div>
        </div>

        {/* Clinics list + detail */}
        <h2 className="section-title mb-6">Все клиники</h2>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Clinic tabs */}
          <div className="lg:col-span-2 space-y-2">
            {clinics.map((clinic) => (
              <button
                key={clinic.id}
                onClick={() => setActiveClinic(clinic.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${activeClinic === clinic.id ? 'border-brand-blue bg-white shadow-card' : 'border-transparent bg-white/60 hover:bg-white hover:border-slate-200'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-bold text-brand-dark text-sm">{clinic.fullName}</div>
                    <div className="text-xs text-brand-gray mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {clinic.address}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">{clinic.rating}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-brand-gray">👨‍⚕️ {clinic.doctors} врачей</span>
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-brand-gray">💬 {clinic.reviews}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Clinic detail */}
          <div className="lg:col-span-3">
            {active && (
              <div className="card p-6 h-full">
                <h3 className="text-xl font-extrabold text-brand-dark mb-1">{active.fullName}</h3>
                <p className="text-brand-gray text-sm mb-5">{active.district}</p>

                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div className="p-4 bg-brand-light rounded-xl">
                    <div className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-2">Адрес</div>
                    <div className="font-semibold text-brand-dark text-sm">{active.address}</div>
                    {active.landmark && <div className="text-xs text-brand-gray mt-1">{active.landmark}</div>}
                  </div>

                  <div className="p-4 bg-brand-light rounded-xl">
                    <div className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-2">Телефон</div>
                    <a href={`tel:${active.phone.replace(/\D/g,'')}`} className="font-semibold text-brand-blue text-sm hover:underline block">{active.phone}</a>
                    <div className="text-xs text-brand-gray mt-1">Единый: {siteData.phone}</div>
                  </div>

                  <div className="p-4 bg-brand-light rounded-xl">
                    <div className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-2">Режим работы</div>
                    <div className="text-sm text-brand-dark space-y-0.5">
                      <div>{active.hours.weekdays}</div>
                      <div>{active.hours.saturday}</div>
                      <div>{active.hours.sunday}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-brand-light rounded-xl">
                    <div className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-2">Врачи и рейтинг</div>
                    <div className="text-2xl font-extrabold text-brand-blue">{active.doctors}</div>
                    <div className="text-xs text-brand-gray">специалистов</div>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-brand-dark text-sm">{active.rating}</span>
                      <span className="text-xs text-brand-gray">({active.reviews} отзывов)</span>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-2">Специализации</div>
                  <div className="flex flex-wrap gap-2">
                    {active.features.map((f) => (
                      <span key={f} className="px-3 py-1 bg-white border border-slate-200 text-xs font-medium text-brand-dark rounded-full">{f}</span>
                    ))}
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="h-40 bg-gradient-to-br from-brand-light to-blue-50 rounded-xl flex items-center justify-center border border-slate-200 mb-5">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-brand-blue mx-auto mb-2" />
                    <div className="text-sm font-semibold text-brand-dark">{active.address}</div>
                    <a href={active.mapLink} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-blue hover:underline mt-1 block">Открыть в 2ГИС →</a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link to="/zapis" className="btn-primary flex-1 justify-center py-3">
                    <Calendar className="w-4 h-4" />
                    Записаться
                  </Link>
                  <a href={active.mapLink} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 justify-center py-3">
                    <MapPin className="w-4 h-4" />
                    Маршрут
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
