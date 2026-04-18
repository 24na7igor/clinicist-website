import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone, Calendar, ArrowRight, Star, MapPin, ChevronDown,
  Users, Award, Clock, TrendingUp, ChevronRight, ChevronLeft,
  Plus, Minus, Heart, Shield, Zap, Search
} from 'lucide-react'
import { siteData } from '../data/siteData'
import { serviceCategories, promotions } from '../data/services'
import { doctors } from '../data/doctors'
import { clinics } from '../data/clinics'

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const [activeSpec, setActiveSpec] = useState(0)
  const specs = ['Гинекология', 'Кардиология', 'УЗИ-диагностика', 'Неврология', 'Педиатрия', 'ЭКО']

  useEffect(() => {
    const t = setInterval(() => setActiveSpec((s) => (s + 1) % specs.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://mamadeti.ru/upload/iblock/abc/4mpj22w2hlgo09pfr60zdf7p3ag1folf/pc.mp4"
        autoPlay muted loop playsInline
      />
      {/* Overlay: dark + cyan tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003A5C]/85 via-[#00AEEF]/30 to-[#003A5C]/80" />
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#00AEEF]/15 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-[#F47920]/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container-custom relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* LEFT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="text-yellow-400 text-base">🏆</span>
              <span className="text-white/90 text-sm font-medium">Лучшая частная клиника Краснодара 2017</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] mb-4">
              Ваше здоровье —{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-brand-teal to-cyan-300 bg-clip-text text-transparent">наш приоритет</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                  <path d="M2 6C50 2 250 2 298 6" stroke="#00B4A2" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Rotating specialty */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-white/70 text-lg">Специализация:</span>
              <span className="text-white font-semibold text-lg transition-all duration-300 animate-fade-in" key={activeSpec}>
                {specs[activeSpec]}
              </span>
            </div>

            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              87 врачей высшей категории · 6 клиник в Краснодаре · более 20 лет работы ·
              1 000 000+ пациентов которые нам доверяют
            </p>

            {/* Search bar */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 mb-8 max-w-md">
              <Search className="w-5 h-5 text-white/50 ml-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Найти врача или услугу..."
                className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm py-1"
              />
              <button className="px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-d transition-colors">
                Найти
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to="/zapis" className="btn-primary text-base py-3.5 px-7">
                <Calendar className="w-5 h-5" />
                Записаться онлайн
              </Link>
              <a href={siteData.phoneHref} className="flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200 text-base">
                <Phone className="w-5 h-5" />
                {siteData.phone}
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex items-center gap-5 mt-10 pt-8 border-t border-white/10">
              {[
                { value: '1М+', label: 'Пациентов' },
                { value: '87', label: 'Врачей' },
                { value: '4.9', label: 'Рейтинг', suffix: '★' },
                { value: '6', label: 'Клиник' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold text-white">{stat.value}<span className="text-brand-teal">{stat.suffix || ''}</span></div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — floating cards mosaic */}
          <div className="hidden lg:block relative h-[520px]">
            {/* Main doctor card */}
            <div className="absolute top-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-blue flex items-center justify-center flex-shrink-0 text-2xl">
                  👨‍⚕️
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white/50 mb-1">Генеральный директор</div>
                  <div className="font-bold text-white text-base leading-tight mb-1">Федоров Александр Викторович</div>
                  <div className="text-brand-teal text-sm font-medium">УЗИ-диагностика · 40+ лет</div>
                  <div className="flex items-center gap-1 mt-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                    <span className="text-white/60 text-xs ml-1">5.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats cards */}
            <div className="absolute bottom-16 left-8 bg-white rounded-2xl shadow-xl p-4 w-48">
              <div className="text-3xl font-extrabold text-brand-blue">1М+</div>
              <div className="text-sm text-brand-gray mt-1">Довольных пациентов</div>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">↑ ежегодно</span>
              </div>
            </div>

            <div className="absolute bottom-16 right-8 bg-white rounded-2xl shadow-xl p-4 w-48">
              <div className="text-3xl font-extrabold text-brand-teal">5053</div>
              <div className="text-sm text-brand-gray mt-1">Отзывов пациентов</div>
              <div className="flex mt-2 gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                <span className="text-xs text-brand-gray ml-1 self-center">4.9</span>
              </div>
            </div>

            {/* Floating specialty chip */}
            <div className="absolute top-48 right-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 animate-float">
              <div className="text-xs text-brand-gray mb-1">Сегодня принимает</div>
              <div className="font-bold text-brand-blue text-sm">62 специалиста</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="text-xs text-green-600">Доступна запись</span>
              </div>
            </div>

            {/* Award chip */}
            <div className="absolute top-52 left-0 bg-brand-orange/90 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 animate-float" style={{ animationDelay: '3s' }}>
              <div className="text-white font-bold text-lg">🏆</div>
              <div className="text-white text-xs font-semibold mt-1">Клиника года</div>
              <div className="text-white/70 text-xs">Краснодар 2017</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/50 text-xs">Прокрутите вниз</span>
        <ChevronDown className="w-5 h-5 text-white/50" />
      </div>
    </section>
  )
}

// ─── Stats Bar ───────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { icon: Users, value: '1 000 000+', label: 'Пациентов обслужено', color: 'text-brand-blue' },
    { icon: Award, value: '87', label: 'Врачей высшей категории', color: 'text-brand-teal' },
    { icon: MapPin, value: '6', label: 'Клиник в Краснодаре', color: 'text-brand-orange' },
    { icon: Clock, value: '20+', label: 'Лет работы', color: 'text-brand-blue' },
    { icon: TrendingUp, value: '86%', label: 'Рекомендуют друзьям', color: 'text-brand-teal' },
  ]

  return (
    <section className="relative -mt-1 bg-white border-b border-slate-100 shadow-sm">
      <div className="container-custom py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="flex flex-col items-center text-center group">
              <div className={`w-12 h-12 rounded-2xl mb-3 flex items-center justify-center bg-brand-light group-hover:scale-110 transition-transform duration-200 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className={`text-2xl xl:text-3xl font-extrabold ${color} leading-none mb-1`}>{value}</div>
              <div className="text-xs text-brand-gray leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services Section ────────────────────────────────────────────────────────
function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const displayed = serviceCategories.slice(0, 12)

  return (
    <section className="py-20 bg-brand-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="badge bg-brand-blue/10 text-brand-blue mb-3">30+ специализаций</span>
            <h2 className="section-title">Наши услуги и<br/>направления</h2>
            <p className="section-subtitle">Полный спектр медицинской помощи — от профилактики до сложного лечения</p>
          </div>
          <Link to="/uslugi" className="btn-secondary flex-shrink-0">
            Все услуги
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayed.map((service) => (
            <Link
              key={service.id}
              to={`/uslugi/${service.slug}`}
              className="card p-5 group flex items-start gap-4 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 bg-gradient-to-br ${service.color} shadow-sm`}>
                {service.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-brand-dark text-sm leading-tight mb-1 group-hover:text-brand-blue transition-colors duration-200">{service.name}</h3>
                <p className="text-xs text-brand-gray line-clamp-2 leading-relaxed">{service.description.slice(0, 80)}...</p>
                <div className="flex items-center gap-1 mt-2 text-brand-blue text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Подробнее <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All specialties tags */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-brand-gray mb-4 font-medium">Все специальности:</p>
          <div className="flex flex-wrap gap-2">
            {['Аллергология', 'Андрология', 'Ангиохирургия', 'Дерматология', 'Кардиология', 'Маммология',
              'Нефрология', 'Неврология', 'Онкология', 'Офтальмология', 'Педиатрия', 'Проктология',
              'Психотерапия', 'Пульмонология', 'Ревматология', 'Рефлексотерапия', 'Терапия', 'ЛОР',
              'Урология', 'Флебология', 'Хирургия', 'Эндокринология', 'Эндоскопия'].map((sp) => (
              <Link key={sp} to={`/uslugi`} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-brand-dark hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-200">
                {sp}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Doctors Section ─────────────────────────────────────────────────────────
function DoctorsSection() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const featured = doctors.slice(0, 8)
  const visible = 3

  const prev = () => setCurrentIdx((i) => Math.max(0, i - 1))
  const next = () => setCurrentIdx((i) => Math.min(featured.length - visible, i + 1))

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="badge bg-brand-teal/10 text-brand-teal mb-3">87 специалистов</span>
            <h2 className="section-title">Наши врачи</h2>
            <p className="section-subtitle">Кандидаты наук, врачи высшей категории, лучшие специалисты Краснодара</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={prev} disabled={currentIdx === 0} className="w-10 h-10 rounded-xl border-2 border-slate-200 flex items-center justify-center text-brand-dark hover:border-brand-blue hover:text-brand-blue disabled:opacity-30 transition-all duration-200">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} disabled={currentIdx >= featured.length - visible} className="w-10 h-10 rounded-xl border-2 border-slate-200 flex items-center justify-center text-brand-dark hover:border-brand-blue hover:text-brand-blue disabled:opacity-30 transition-all duration-200">
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link to="/vrachi" className="btn-secondary">
              Все врачи
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Doctors grid (desktop: 3 col, mobile: 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.slice(currentIdx, currentIdx + visible).map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* Mobile: show all */}
        <div className="md:hidden grid grid-cols-1 gap-5 mt-5">
          {featured.slice(3, 6).map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* Ratings strip */}
        <div className="mt-10 bg-gradient-to-r from-brand-light to-brand-light/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['👨‍⚕️','👩‍⚕️','👨‍⚕️','👩‍⚕️'].map((e, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center text-lg border-2 border-white shadow">{e}</div>
              ))}
            </div>
            <div>
              <div className="font-bold text-brand-dark">87 врачей в команде</div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                <span className="text-sm text-brand-gray ml-1">4.9 средний рейтинг</span>
              </div>
            </div>
          </div>
          <Link to="/vrachi" className="btn-primary">
            Найти специалиста
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function DoctorAvatar({ doctor, size = 'md' }) {
  const initials = doctor.name.split(' ').map(p => p[0]).join('').slice(0, 2)
  const sizeClass = size === 'lg'
    ? 'w-24 h-24 text-2xl rounded-3xl'
    : 'w-16 h-16 text-lg rounded-2xl'

  return doctor.photo ? (
    <img
      src={doctor.photo}
      alt={doctor.name}
      className={`${sizeClass} object-cover object-top flex-shrink-0 shadow-sm bg-brand-light`}
      onError={(e) => {
        e.target.style.display = 'none'
        e.target.nextSibling.style.display = 'flex'
      }}
    />
  ) : (
    <div className={`${sizeClass} bg-gradient-to-br from-brand-blue to-brand-blue-d flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm`}>
      {initials}
    </div>
  )
}

function DoctorCard({ doctor }) {
  const initials = doctor.name.split(' ').map(p => p[0]).join('').slice(0, 2)
  return (
    <Link to={`/vrachi/${doctor.slug}`} className="card p-5 group flex flex-col hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        {doctor.photo ? (
          <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm bg-brand-light group-hover:shadow-glow transition-shadow duration-300">
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
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-d flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm group-hover:shadow-glow transition-shadow duration-300">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-brand-teal font-semibold mb-0.5">{doctor.specialty}</div>
          <h3 className="font-bold text-brand-dark text-sm leading-tight group-hover:text-brand-blue transition-colors duration-200 mb-1">{doctor.name}</h3>
          <div className="text-xs text-brand-gray">{doctor.category}</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-brand-gray mb-3">
        <span>Стаж: <b className="text-brand-dark">{doctor.experience}+ лет</b></span>
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <b className="text-brand-dark">{doctor.rating}</b>
          {doctor.reviews > 0 && <span>({doctor.reviews})</span>}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {doctor.specialties.slice(0, 2).map((s) => (
          <span key={s} className="px-2 py-0.5 bg-brand-light text-brand-blue text-xs rounded-full">{s}</span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-3 border-t border-slate-100">
        <span className="flex items-center gap-1 text-xs text-brand-gray">
          <MapPin className="w-3 h-3" />
          {doctor.clinic}
        </span>
        <span className="ml-auto text-xs font-semibold text-brand-blue group-hover:gap-2 flex items-center gap-1 transition-all duration-200">
          Записаться <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}

// ─── USP Section ─────────────────────────────────────────────────────────────
function USPSection() {
  const icons = { award: Award, 'map-pin': MapPin, clock: Clock, 'trending-up': TrendingUp, microscope: Shield, heart: Heart }

  return (
    <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue-d overflow-hidden relative">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-14">
          <span className="badge bg-white/10 text-white border border-white/20 mb-4">Почему выбирают нас</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Наши преимущества</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">20 лет строим репутацию на качестве, доступности и уважении к каждому пациенту</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteData.usps.map((usp, i) => {
            const Icon = icons[usp.icon] || Zap
            return (
              <div key={i} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-brand-teal/20 border border-brand-teal/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-6 h-6 text-brand-teal" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{usp.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{usp.text}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link to="/zapis" className="btn-primary text-base py-4 px-8">
            <Calendar className="w-5 h-5" />
            Записаться на приём
          </Link>
          <p className="text-white/40 text-sm mt-3">Запись онлайн 24/7 · Подтверждение через 15 минут</p>
        </div>
      </div>
    </section>
  )
}

// ─── Promotions ───────────────────────────────────────────────────────────────
function PromotionsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="badge bg-brand-orange/10 text-brand-orange mb-3">Специальные предложения</span>
            <h2 className="section-title">Акции и скидки</h2>
          </div>
          <Link to="/akcii" className="btn-secondary flex-shrink-0">
            Все акции <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promotions.map((promo) => (
            <div key={promo.id} className="card overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className={`h-2 bg-gradient-to-r ${promo.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="badge bg-brand-orange/10 text-brand-orange text-xs">{promo.badge}</span>
                  <span className="text-xs text-brand-gray">До {promo.validUntil}</span>
                </div>
                <h3 className="font-bold text-brand-dark text-base leading-tight mb-2 group-hover:text-brand-blue transition-colors duration-200">{promo.title}</h3>
                <p className="text-sm text-brand-gray mb-4 leading-relaxed">{promo.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-brand-gray line-through">{promo.oldPrice}</div>
                    <div className="text-xl font-extrabold text-brand-blue">{promo.newPrice}</div>
                  </div>
                  <Link to="/zapis" className="px-4 py-2 bg-brand-light text-brand-blue font-semibold text-sm rounded-xl hover:bg-brand-blue hover:text-white transition-all duration-200">
                    Записаться
                  </Link>
                </div>

                <div className="flex items-center gap-1.5 mt-3 text-xs text-brand-gray">
                  <MapPin className="w-3 h-3" />
                  {promo.clinic}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Clinics Section ──────────────────────────────────────────────────────────
function ClinicsSection() {
  const [activeClinic, setActiveClinic] = useState(clinics[0].id)
  const active = clinics.find(c => c.id === activeClinic)

  const colorMap = {
    'brand-blue': 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    'brand-teal': 'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
    'brand-orange': 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
  }

  return (
    <section className="py-20 bg-brand-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="badge bg-brand-blue/10 text-brand-blue mb-3">6 адресов</span>
          <h2 className="section-title">Наши клиники</h2>
          <p className="section-subtitle mx-auto">В каждом ключевом районе Краснодара — ЮМР, ГМР, ФМР, ЮЗМ и Центр планирования семьи</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="space-y-3">
            {clinics.map((clinic) => (
              <button
                key={clinic.id}
                onClick={() => setActiveClinic(clinic.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${activeClinic === clinic.id ? 'border-brand-blue bg-white shadow-card' : 'border-transparent bg-white/60 hover:bg-white hover:border-slate-200'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-bold text-brand-dark text-sm mb-0.5">{clinic.fullName}</div>
                    <div className="flex items-center gap-1.5 text-xs text-brand-gray">
                      <MapPin className="w-3 h-3" />
                      {clinic.address}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-brand-dark">{clinic.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs text-brand-gray bg-slate-100 px-2 py-0.5 rounded-full">👨‍⚕️ {clinic.doctors} врачей</span>
                  <span className="text-xs text-brand-gray bg-slate-100 px-2 py-0.5 rounded-full">💬 {clinic.reviews} отзывов</span>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {active && (
            <div className="card p-6 h-fit sticky top-24">
              <div className="mb-5">
                <h3 className="font-extrabold text-brand-dark text-xl mb-1">{active.fullName}</h3>
                <p className="text-brand-gray text-sm">{active.district}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-brand-light rounded-xl">
                  <MapPin className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-brand-gray font-medium mb-0.5">Адрес</div>
                    <div className="font-semibold text-brand-dark text-sm">{active.address}</div>
                    {active.landmark && <div className="text-xs text-brand-gray mt-0.5">{active.landmark}</div>}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-brand-light rounded-xl">
                  <Phone className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-brand-gray font-medium mb-0.5">Телефон</div>
                    <a href={`tel:${active.phone.replace(/\D/g,'')}`} className="font-semibold text-brand-blue text-sm hover:underline">{active.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-brand-light rounded-xl">
                  <Clock className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-brand-gray font-medium mb-1">Режим работы</div>
                    <div className="text-sm text-brand-dark space-y-0.5">
                      <div>{active.hours.weekdays}</div>
                      <div>{active.hours.saturday}</div>
                      <div>{active.hours.sunday}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-brand-light rounded-xl">
                  <div className="text-xs text-brand-gray font-medium mb-2">Ключевые специализации</div>
                  <div className="flex flex-wrap gap-2">
                    {active.features.map((f) => (
                      <span key={f} className="px-2.5 py-1 bg-white border border-slate-200 text-xs font-medium text-brand-dark rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <Link to="/zapis" className="btn-primary flex-1 justify-center text-sm py-2.5">
                  <Calendar className="w-4 h-4" />
                  Записаться
                </Link>
                <a href={active.mapLink} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 justify-center text-sm py-2.5">
                  <MapPin className="w-4 h-4" />
                  На карте
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
function ReviewsSection() {
  const { reviews } = siteData
  const [current, setCurrent] = useState(0)

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="badge bg-yellow-100 text-yellow-700 mb-3">5053 отзыва</span>
          <h2 className="section-title">Что говорят пациенты</h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            <span className="text-lg font-bold text-brand-dark ml-2">4.9</span>
            <span className="text-brand-gray ml-1">из 5 — рейтинг ПроДокторов</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div key={review.id} className="card p-5 flex flex-col">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                <span className="text-xs text-brand-gray ml-auto">{review.date}</span>
              </div>
              <p className="text-sm text-brand-dark leading-relaxed flex-1 mb-4">«{review.text}»</p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-brand-dark text-sm">{review.name}</div>
                  <div className="text-xs text-brand-gray">{review.clinic}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-brand-blue">{review.doctor}</div>
                  <div className="text-xs text-brand-gray">{review.specialty}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-brand-gray/60">{review.platform}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/otzyvy" className="btn-secondary">
            Читать все отзывы <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState(null)
  const { faq } = siteData

  return (
    <section className="py-20 bg-brand-light">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="badge bg-brand-blue/10 text-brand-blue mb-4">Вопрос-Ответ</span>
            <h2 className="section-title mb-4">Часто задаваемые вопросы</h2>
            <p className="text-brand-gray text-lg leading-relaxed mb-8">Если не нашли ответа — позвоните нам, и мы с радостью поможем</p>

            <div className="space-y-3">
              <a href={siteData.phoneHref} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-brand-blue/20 hover:border-brand-blue hover:shadow-card transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-brand-dark text-sm">Позвонить нам</div>
                  <div className="text-brand-blue text-sm font-semibold">{siteData.phone}</div>
                </div>
              </a>
              <Link to="/zapis" className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-brand-orange/20 hover:border-brand-orange hover:shadow-card transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-brand-dark text-sm">Записаться онлайн</div>
                  <div className="text-brand-gray text-xs">Подтверждение через 15 минут</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-3 p-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-semibold text-brand-dark text-sm pr-4">{item.q}</span>
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue transition-transform duration-200" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                {open === i && (
                  <div className="px-5 pb-5 text-sm text-brand-gray leading-relaxed border-t border-slate-100 pt-4 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="relative overflow-hidden bg-gradient-to-r from-brand-blue via-brand-blue-l to-brand-teal rounded-3xl p-8 md:p-12 text-center">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-5xl mb-4">👨‍⚕️</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Не откладывайте своё здоровье
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Запишитесь прямо сейчас — и получите приём у специалиста в удобное для вас время.
              Ежедневно, без очередей, в вашем районе.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/zapis" className="btn-primary text-base py-4 px-8">
                <Calendar className="w-5 h-5" />
                Записаться онлайн
              </Link>
              <a href={siteData.phoneHref} className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200 text-base">
                <Phone className="w-5 h-5" />
                {siteData.phone}
              </a>
            </div>
            <p className="text-white/40 text-sm mt-4">{siteData.workHours}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  useEffect(() => {
    document.title = 'Клиницист — Сеть медицинских центров в Краснодаре | 87 врачей высшей категории'
  }, [])

  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesSection />
      <DoctorsSection />
      <USPSection />
      <PromotionsSection />
      <ClinicsSection />
      <ReviewsSection />
      <FAQSection />
      <CTABanner />
    </>
  )
}
