import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { siteData } from '../data/siteData'

const footerLinks = {
  services: [
    { label: 'Гинекология', href: '/uslugi/ginekologiya' },
    { label: 'Репродуктология и ЭКО', href: '/uslugi/reproduktologiya' },
    { label: 'Кардиология', href: '/uslugi/kardiologiya' },
    { label: 'УЗИ-диагностика', href: '/uslugi/uzi-diagnostika' },
    { label: 'Гастроэнтерология', href: '/uslugi/gastroenterologiya' },
    { label: 'Неврология', href: '/uslugi/nevrologiya' },
    { label: 'Все услуги →', href: '/uslugi' },
  ],
  clinic: [
    { label: 'О клинике', href: '/o-klinike' },
    { label: 'Наши врачи', href: '/vrachi' },
    { label: 'Цены', href: '/ceny' },
    { label: 'Акции и скидки', href: '/akcii' },
    { label: 'Адреса клиник', href: '/adresa' },
    { label: 'Записаться онлайн', href: '/zapis' },
  ],
  patients: [
    { label: 'Как записаться', href: '/o-klinike#zapis' },
    { label: 'Подготовка к анализам', href: '/patsientam' },
    { label: 'Отзывы пациентов', href: '/otzyvy' },
    { label: 'Вопрос-ответ', href: '/faq' },
    { label: 'Политика конфиденциальности', href: '/privacy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* CTA stripe */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue-d">
        <div className="container-custom py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1">Готовы записаться?</h3>
              <p className="text-white/70">Позвоните или запишитесь онлайн — без ожидания</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={siteData.phoneHref} className="flex items-center gap-2 px-6 py-3 bg-white text-brand-blue font-bold rounded-xl hover:bg-brand-light transition-colors duration-200">
                <Phone className="w-4 h-4" />
                {siteData.phone}
              </a>
              <Link to="/zapis" className="btn-primary">
                Записаться онлайн
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-xl text-white block">Клиницист</span>
                <span className="text-white/50 text-xs">Сеть медицинских центров</span>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Крупнейшая сеть частных медицинских центров Краснодара.
              87 врачей высшей категории, 6 клиник, более 1 000 000 пациентов с 2003 года.
            </p>

            <div className="space-y-3">
              <a href={siteData.phoneHref} className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors duration-200">
                <Phone className="w-4 h-4 text-brand-teal flex-shrink-0" />
                {siteData.phone}
              </a>
              <a href={`mailto:${siteData.email}`} className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors duration-200">
                <Mail className="w-4 h-4 text-brand-teal flex-shrink-0" />
                {siteData.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/70">
                <Clock className="w-4 h-4 text-brand-teal flex-shrink-0" />
                {siteData.workHours}
              </div>
              <div className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <span>6 клиник по всему Краснодару</span>
              </div>
            </div>

            {/* Award badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-yellow-400 text-lg">🏆</span>
              <div>
                <div className="text-xs font-semibold text-white">Лучшая частная клиника</div>
                <div className="text-xs text-white/50">Краснодар, 2017 год</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Услуги</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Клиника</h4>
            <ul className="space-y-2.5">
              {footerLinks.clinic.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patients */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Пациентам</h4>
            <ul className="space-y-2.5">
              {footerLinks.patients.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2003–2026 Сеть медицинских центров «Клиницист». Все права защищены.</p>
          <p>Не является публичной офертой. Лицензия на осуществление медицинской деятельности.</p>
        </div>
      </div>
    </footer>
  )
}
