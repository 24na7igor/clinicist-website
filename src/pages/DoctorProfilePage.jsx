import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Star, MapPin, Clock, Calendar, Phone, ChevronRight, Award, CheckCircle, ArrowLeft } from 'lucide-react'
import { doctors } from '../data/doctors'
import { siteData } from '../data/siteData'

export default function DoctorProfilePage() {
  const { slug } = useParams()
  const doctor = doctors.find(d => d.slug === slug)

  useEffect(() => {
    if (doctor) {
      document.title = `${doctor.name} — ${doctor.specialty} | Клиницист Краснодар`
    }
    window.scrollTo(0, 0)
  }, [slug, doctor])

  if (!doctor) return <Navigate to="/vrachi" replace />

  const initials = doctor.name.split(' ').map(p => p[0]).join('').slice(0, 2)
  const relatedDoctors = doctors.filter(d => d.id !== doctor.id && d.specialty === doctor.specialty).slice(0, 3)

  return (
    <div className="pt-20 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-brand-light border-b border-slate-200">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-sm text-brand-gray">
            <Link to="/" className="hover:text-brand-blue transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/vrachi" className="hover:text-brand-blue transition-colors">Врачи</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-dark font-medium">{doctor.name}</span>
          </nav>
        </div>
      </div>

      {/* SEO meta-description block (hidden) */}
      <meta name="description" content={`${doctor.name} — ${doctor.specialty}. ${doctor.category}. Стаж ${doctor.experience}+ лет. Рейтинг ${doctor.rating}/5 (${doctor.reviews} отзывов). Запись в клинике Клиницист, Краснодар: ${siteData.phone}`} />

      <div className="container-custom py-10">
        <Link to="/vrachi" className="inline-flex items-center gap-2 text-brand-blue text-sm font-medium hover:underline mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Все врачи
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Doctor Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              {/* Photo / initials */}
              {/* Photo / Initials */}
              {doctor.photo ? (
                <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-lg mx-auto mb-4 bg-brand-light">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-[#00AEEF] to-[#0097CC] flex items-center justify-center text-white font-bold text-3xl">${initials}</div>`
                    }}
                  />
                </div>
              ) : (
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-d flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-4">
                  {initials}
                </div>
              )}

              <div className="text-center mb-5">
                <div className="text-brand-teal text-sm font-semibold mb-1">{doctor.specialty}</div>
                <h1 className="text-xl font-extrabold text-brand-dark leading-tight mb-1">{doctor.name}</h1>
                {doctor.position && <div className="text-sm text-brand-gray">{doctor.position}</div>}
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-brand-light rounded-full">
                  <Award className="w-3.5 h-3.5 text-brand-blue" />
                  <span className="text-xs font-semibold text-brand-blue">{doctor.category}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-slate-100">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-brand-blue">{doctor.experience}+</div>
                  <div className="text-xs text-brand-gray mt-0.5">лет стажа</div>
                </div>
                <div className="text-center border-x border-slate-100">
                  <div className="flex items-center justify-center gap-0.5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-extrabold text-brand-dark">{doctor.rating}</span>
                  </div>
                  <div className="text-xs text-brand-gray mt-0.5">рейтинг</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-brand-blue">{doctor.reviews || '—'}</div>
                  <div className="text-xs text-brand-gray mt-0.5">отзывов</div>
                </div>
              </div>

              {/* Clinic & hours */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-sm">
                  <MapPin className="w-4 h-4 text-brand-gray flex-shrink-0" />
                  <span className="text-brand-dark">{doctor.clinic}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Clock className="w-4 h-4 text-brand-gray flex-shrink-0" />
                  <span className="text-brand-dark">{siteData.workHours}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2">
                <Link to="/zapis" className="btn-primary w-full justify-center py-3">
                  <Calendar className="w-4 h-4" />
                  Записаться на приём
                </Link>
                <a href={siteData.phoneHref} className="btn-secondary w-full justify-center py-3">
                  <Phone className="w-4 h-4" />
                  {siteData.phone}
                </a>
              </div>

              <p className="text-center text-xs text-brand-gray mt-3">Подтверждение через 15 минут</p>
            </div>
          </div>

          {/* RIGHT: Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-brand-blue rounded-full inline-block" />
                О враче
              </h2>
              <p className="text-brand-gray leading-relaxed">{doctor.description}</p>

              {/* Education */}
              {doctor.education && (
                <div className="mt-5 p-4 bg-brand-light rounded-xl">
                  <div className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-2">Образование</div>
                  <div className="font-medium text-brand-dark text-sm">{doctor.education}</div>
                  {doctor.experienceSince && (
                    <div className="text-xs text-brand-gray mt-1">Практикует с {doctor.experienceSince} года</div>
                  )}
                </div>
              )}
            </div>

            {/* Specializations */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-brand-teal rounded-full inline-block" />
                Специализации
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {doctor.specialties.map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-brand-light text-brand-blue text-sm font-medium rounded-full">{s}</span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {doctor.achievements?.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-brand-orange rounded-full inline-block" />
                  Достижения и квалификация
                </h2>
                <div className="space-y-3">
                  {doctor.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                      <span className="text-brand-dark text-sm">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {doctor.services?.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-brand-blue rounded-full inline-block" />
                  Услуги и процедуры
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {doctor.services.map((service) => (
                    <div key={service} className="flex items-center gap-2 p-2.5 bg-brand-light rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                      <span className="text-sm text-brand-dark">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA inline */}
            <div className="bg-gradient-to-r from-brand-blue to-brand-teal rounded-2xl p-6 text-white">
              <h3 className="font-bold text-xl mb-2">Записаться к {doctor.name.split(' ')[1]}</h3>
              <p className="text-white/70 text-sm mb-4">Запись онлайн или по телефону — без ожидания в очереди</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/zapis" className="px-5 py-2.5 bg-white text-brand-blue font-bold rounded-xl hover:bg-brand-light transition-colors duration-200">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Записаться онлайн
                </Link>
                <a href={siteData.phoneHref} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-colors duration-200">
                  <Phone className="w-4 h-4 inline mr-2" />
                  {siteData.phone}
                </a>
              </div>
            </div>

            {/* Related doctors */}
            {relatedDoctors.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-brand-dark mb-4">Другие {doctor.specialty.toLowerCase()}</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedDoctors.map((d) => {
                    const ini = d.name.split(' ').map(p => p[0]).join('').slice(0, 2)
                    return (
                      <Link key={d.id} to={`/vrachi/${d.slug}`} className="card p-4 hover:-translate-y-0.5 transition-all duration-300 group">
                        {d.photo ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden mb-3 shadow-sm bg-brand-light">
                            <img src={d.photo} alt={d.name} className="w-full h-full object-cover object-top"
                              onError={(e) => { e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-[#00AEEF] to-[#0097CC] flex items-center justify-center text-white font-bold">${ini}</div>` }} />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-d flex items-center justify-center text-white font-bold text-base mb-3 shadow-sm">
                            {ini}
                          </div>
                        )}
                        <div className="text-xs text-brand-blue font-semibold mb-0.5">{d.specialty}</div>
                        <div className="font-bold text-brand-dark text-sm group-hover:text-brand-blue transition-colors">{d.name}</div>
                        <div className="text-xs text-brand-gray mt-1">{d.experience}+ лет</div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
