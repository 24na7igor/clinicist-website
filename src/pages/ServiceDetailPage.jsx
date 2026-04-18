import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ChevronRight, Calendar, Phone, CheckCircle, ArrowLeft, Star } from 'lucide-react'
import { serviceCategories } from '../data/services'
import { doctors } from '../data/doctors'
import { siteData } from '../data/siteData'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = serviceCategories.find(s => s.slug === slug)

  useEffect(() => {
    if (service) {
      document.title = service.seoTitle
    }
    window.scrollTo(0, 0)
  }, [slug, service])

  if (!service) return <Navigate to="/uslugi" replace />

  const serviceDoctors = doctors.filter(d => service.doctors.includes(d.id))

  return (
    <div className="pt-20 min-h-screen">
      {/* SEO */}
      <meta name="description" content={service.seoDesc} />

      {/* Breadcrumb */}
      <div className="bg-brand-light border-b border-slate-200">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-sm text-brand-gray">
            <Link to="/" className="hover:text-brand-blue">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/uslugi" className="hover:text-brand-blue">Услуги</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-dark">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className={`bg-gradient-to-br ${service.color} py-16 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container-custom relative z-10">
          <Link to="/uslugi" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Все услуги
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{service.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">{service.name}</h1>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">{service.description}</p>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Services & Prices */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                <span className="w-1 h-7 bg-brand-blue rounded-full inline-block" />
                Услуги и цены
              </h2>
              <div className="space-y-3">
                {service.services.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-3 p-4 bg-brand-light rounded-xl hover:bg-blue-50 transition-colors duration-200 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-teal flex-shrink-0" />
                      <span className="text-brand-dark font-medium text-sm">{item.name}</span>
                    </div>
                    <span className="text-brand-blue font-bold text-sm flex-shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-gray mt-4">* Цены носят информационный характер. Точную стоимость уточняйте по телефону или в регистратуре.</p>
            </div>

            {/* Doctors */}
            {serviceDoctors.length > 0 && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                  <span className="w-1 h-7 bg-brand-teal rounded-full inline-block" />
                  Специалисты
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {serviceDoctors.map((doctor) => {
                    const initials = doctor.name.split(' ').map(p => p[0]).join('').slice(0, 2)
                    return (
                      <Link key={doctor.id} to={`/vrachi/${doctor.slug}`} className="flex items-start gap-3 p-4 bg-brand-light rounded-xl hover:bg-blue-50 hover:shadow-card transition-all duration-200 group">
                        {doctor.photo ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-sm bg-white">
                            <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover object-top"
                              onError={(e) => { e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-[#00AEEF] to-[#0097CC] flex items-center justify-center text-white font-bold">${initials}</div>` }} />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-d flex items-center justify-center text-white font-bold flex-shrink-0">
                            {initials}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-brand-dark text-sm group-hover:text-brand-blue transition-colors">{doctor.name}</div>
                          <div className="text-xs text-brand-gray">{doctor.category}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-semibold">{doctor.rating}</span>
                            {doctor.reviews > 0 && <span className="text-xs text-brand-gray">({doctor.reviews})</span>}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* FAQ-style info */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-brand-dark mb-5 flex items-center gap-2">
                <span className="w-1 h-7 bg-brand-orange rounded-full inline-block" />
                Как подготовиться к приёму?
              </h2>
              <div className="space-y-4 text-sm text-brand-gray leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <p><b className="text-brand-dark">Запишитесь на приём</b> — онлайн на сайте или по телефону +7 (861) 231-1-231. Выберите удобное время и клинику.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <p><b className="text-brand-dark">Возьмите документы</b> — паспорт и полис ОМС (при наличии). При необходимости — предыдущие анализы и выписки.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <p><b className="text-brand-dark">Придите чуть заранее</b> — 5–10 минут до приёма, чтобы заполнить карту пациента.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Book CTA */}
            <div className="card p-5 bg-gradient-to-br from-brand-blue to-brand-blue-d text-white overflow-hidden relative">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
              <div className="relative z-10">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-lg mb-2">Записаться на {service.name.toLowerCase()}</h3>
                <p className="text-white/70 text-sm mb-4">Без очередей, в удобное время, в вашем районе</p>
                <Link to="/zapis" className="block w-full text-center px-4 py-3 bg-white text-brand-blue font-bold rounded-xl hover:bg-brand-light transition-colors duration-200 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Записаться онлайн
                </Link>
                <a href={siteData.phoneHref} className="block w-full text-center px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors duration-200">
                  <Phone className="w-4 h-4 inline mr-2" />
                  {siteData.phone}
                </a>
              </div>
            </div>

            {/* Working hours */}
            <div className="card p-5">
              <h4 className="font-bold text-brand-dark mb-3">Режим работы</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-gray">Пн–Пт</span>
                  <span className="font-semibold text-brand-dark">08:00 – 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray">Суббота</span>
                  <span className="font-semibold text-brand-dark">08:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray">Воскресенье</span>
                  <span className="font-semibold text-brand-dark">08:00 – 15:00</span>
                </div>
              </div>
              <p className="text-xs text-brand-gray mt-3 pt-3 border-t border-slate-100">Клиника УЗИ и хирургии: 07:30–19:30 / 07:30–14:30</p>
            </div>

            {/* Other services */}
            <div className="card p-5">
              <h4 className="font-bold text-brand-dark mb-3">Другие направления</h4>
              <div className="space-y-1">
                {serviceCategories.filter(s => s.id !== service.id).slice(0, 6).map((s) => (
                  <Link key={s.id} to={`/uslugi/${s.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-brand-dark hover:text-brand-blue hover:bg-brand-light transition-all duration-200">
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-brand-gray" />
                  </Link>
                ))}
                <Link to="/uslugi" className="flex items-center gap-2 px-3 py-2 text-sm text-brand-blue font-medium hover:underline">
                  Все услуги <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
