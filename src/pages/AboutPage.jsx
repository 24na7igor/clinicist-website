import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Award, Users, Heart, TrendingUp, Star, Calendar } from 'lucide-react'
import { siteData } from '../data/siteData'
import { clinics } from '../data/clinics'

export default function AboutPage() {
  useEffect(() => {
    document.title = 'О клинике — Клиницист | Сеть медицинских центров Краснодара с 2003 года'
  }, [])

  const milestones = [
    { year: 2001, text: 'Начало работы медицинских бригад по диагностике ультразвуком в Краснодарском крае и Адыгее' },
    { year: 2003, text: 'Официальное открытие первого медицинского центра «Клиницист» в Краснодаре' },
    { year: 2009, text: 'Открытие клиники в ГМР (Благоева, 24/1) — вторая точка сети' },
    { year: 2011, text: 'Открытие Центра планирования семьи и репродукции. Первый в регионе провёл эхогистеросальпингографию' },
    { year: 2017, text: 'Победа в конкурсе «Лучшая частная клиника года» в Краснодаре 🏆' },
    { year: 2024, text: 'Сеть насчитывает 6 клиник, 87 врачей, более 1 000 000 довольных пациентов' },
  ]

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-blue to-brand-blue-d py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link to="/" className="hover:text-white">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">О клинике</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">О сети «Клиницист»</h1>
          <p className="text-white/70 text-lg max-w-2xl">Крупнейшая сеть частных медицинских центров Краснодара. Более 20 лет качественной медицины рядом с домом.</p>
        </div>
      </div>

      <div className="container-custom py-16 space-y-16">
        {/* Mission */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="badge bg-brand-blue/10 text-brand-blue mb-4">Наша миссия</span>
            <h2 className="section-title mb-4">Качественная медицина доступна каждому</h2>
            <p className="text-brand-gray leading-relaxed text-lg mb-4">
              «Клиницист» — это сеть из 6 многопрофильных медицинских центров в Краснодаре, основанная врачом высшей категории по специальности «Ультразвуковая диагностика».
            </p>
            <p className="text-brand-gray leading-relaxed mb-4">
              Мы начали в 2001 году с медицинских бригад, проводивших УЗИ-диагностику в труднодоступных районах Краснодарского края и Республики Адыгея. Сегодня сеть насчитывает 87 врачей высшей категории и принимает пациентов из всего Кубанского региона.
            </p>
            <p className="text-brand-gray leading-relaxed">
              Наша цель — обеспечить доступность качественной медицинской помощи для жителей всех районов Краснодара: без очередей, с уважением к каждому пациенту, с применением современного оборудования.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, value: '1 000 000+', label: 'Пациентов', color: 'brand-blue' },
              { icon: Award, value: '87', label: 'Врачей высшей категории', color: 'brand-teal' },
              { icon: Heart, value: '6', label: 'Клиник по Краснодару', color: 'brand-orange' },
              { icon: TrendingUp, value: '20+', label: 'Лет на рынке', color: 'brand-blue' },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="card p-5 text-center group hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center mx-auto mb-3 text-${color} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`text-3xl font-extrabold text-${color} mb-1`}>{value}</div>
                <div className="text-xs text-brand-gray">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section>
          <span className="badge bg-brand-teal/10 text-brand-teal mb-4">Руководство</span>
          <h2 className="section-title mb-8">Руководство клиники</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6 flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">АФ</div>
              <div>
                <div className="font-extrabold text-brand-dark text-xl mb-0.5">Федоров Александр Викторович</div>
                <div className="text-brand-teal font-semibold text-sm mb-1">Генеральный директор</div>
                <div className="text-brand-gray text-xs mb-3">Врач высшей категории · УЗИ-диагностика · 40+ лет стажа</div>
                <div className="space-y-1.5 text-sm text-brand-gray">
                  <p>• Региональный лидер Российской ассоциации специалистов УЗД в медицине</p>
                  <p>• Практикует с 1982 года</p>
                  <p>• Основатель сети «Клиницист»</p>
                </div>
                <div className="flex mt-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  <span className="text-sm text-brand-gray ml-2">5.0</span>
                </div>
              </div>
            </div>

            <div className="card p-6 flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-teal to-cyan-400 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">ЛФ</div>
              <div>
                <div className="font-extrabold text-brand-dark text-xl mb-0.5">Федорова Лариса Витальевна</div>
                <div className="text-brand-teal font-semibold text-sm mb-1">Заместитель генерального директора</div>
                <div className="text-brand-gray text-xs mb-3">Врач высшей категории · Терапия · 30+ лет стажа</div>
                <div className="space-y-1.5 text-sm text-brand-gray">
                  <p>• Терапевт высшей квалификационной категории</p>
                  <p>• Ведение сложных терапевтических случаев</p>
                  <p>• Координация работы всех клиник сети</p>
                </div>
                <div className="flex mt-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  <span className="text-sm text-brand-gray ml-2">5.0</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section>
          <span className="badge bg-brand-orange/10 text-brand-orange mb-4">История</span>
          <h2 className="section-title mb-10">Наш путь</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue via-brand-teal to-brand-orange" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex items-start gap-6 pl-8">
                  <div className="absolute left-0 w-16 h-16 rounded-2xl bg-white border-2 border-brand-blue flex flex-col items-center justify-center flex-shrink-0 shadow-card z-10">
                    <span className="text-brand-blue font-extrabold text-sm leading-none">{m.year}</span>
                  </div>
                  <div className="card p-4 flex-1 ml-12">
                    <p className="text-brand-dark text-sm leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Award */}
        <section className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-3xl p-8 text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-2xl font-extrabold text-brand-dark mb-2">Лучшая частная клиника Краснодара</h3>
          <p className="text-brand-gray mb-1">Победитель конкурса «Клиника года — 2017»</p>
          <p className="text-sm text-brand-gray">Рейтинг 4.9/5 · 5053 отзыва на ПроДокторов, 2ГИС, Яндекс</p>
        </section>

        {/* Clinics overview */}
        <section>
          <span className="badge bg-brand-blue/10 text-brand-blue mb-4">6 клиник</span>
          <h2 className="section-title mb-8">Наши адреса</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clinics.map((clinic) => (
              <div key={clinic.id} className="card p-4 hover:-translate-y-0.5 transition-all duration-300">
                <div className="font-bold text-brand-dark text-sm mb-1">{clinic.fullName}</div>
                <div className="text-xs text-brand-gray mb-2">{clinic.address}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brand-gray">👨‍⚕️ {clinic.doctors} врачей</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{clinic.rating}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/adresa" className="btn-secondary">
              Подробнее об адресах <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-brand-light rounded-3xl">
          <h3 className="text-2xl font-bold text-brand-dark mb-3">Записаться в Клиницист</h3>
          <p className="text-brand-gray mb-6 max-w-lg mx-auto">Выберите удобный адрес, врача и время. Без очередей, с подтверждением за 15 минут.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/zapis" className="btn-primary py-3 px-8">
              <Calendar className="w-5 h-5" />
              Записаться онлайн
            </Link>
            <a href={siteData.phoneHref} className="btn-secondary py-3 px-8">📞 {siteData.phone}</a>
          </div>
        </section>
      </div>
    </div>
  )
}
