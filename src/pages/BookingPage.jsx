import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Calendar, Phone, CheckCircle, Clock, MapPin } from 'lucide-react'
import { clinics } from '../data/clinics'
import { serviceCategories } from '../data/services'
import { siteData } from '../data/siteData'

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ clinic: '', service: '', name: '', phone: '', date: '', time: '', comment: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Записаться на приём — Клиницист | Онлайн-запись в Краснодаре'
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-brand-light flex items-center justify-center">
        <div className="card p-10 max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-dark mb-3">Заявка принята!</h2>
          <p className="text-brand-gray mb-6 leading-relaxed">
            Наш администратор свяжется с вами в течение 15 минут для подтверждения времени приёма.
          </p>
          <div className="bg-brand-light rounded-2xl p-4 mb-6 text-sm text-brand-gray text-left space-y-2">
            {form.clinic && <div><b>Клиника:</b> {clinics.find(c => c.id === form.clinic)?.name}</div>}
            {form.service && <div><b>Услуга:</b> {serviceCategories.find(s => s.id === form.service)?.name}</div>}
            {form.name && <div><b>Имя:</b> {form.name}</div>}
            {form.phone && <div><b>Телефон:</b> {form.phone}</div>}
          </div>
          <div className="flex gap-3">
            <Link to="/" className="btn-secondary flex-1 justify-center">На главную</Link>
            <button onClick={() => { setSubmitted(false); setStep(1); setForm({ clinic: '', service: '', name: '', phone: '', date: '', time: '', comment: '' }) }} className="btn-primary flex-1 justify-center">
              Ещё запись
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-brand-light">
      <div className="bg-gradient-to-br from-brand-blue to-brand-blue-d py-14 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link to="/" className="hover:text-white">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Запись онлайн</span>
          </nav>
          <h1 className="text-4xl font-extrabold text-white mb-2">Запись на приём</h1>
          <p className="text-white/70">Заполните форму — мы подтвердим запись за 15 минут</p>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-8">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-200 ${step >= s ? 'bg-brand-blue text-white' : 'bg-slate-200 text-brand-gray'}`}>{s}</div>
                    {s < 3 && <div className={`h-0.5 flex-1 transition-all duration-300 ${step > s ? 'bg-brand-blue' : 'bg-slate-200'}`} />}
                  </div>
                ))}
              </div>

              {/* Step 1: Clinic + Service */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-brand-dark mb-4">Выберите клинику и услугу</h2>

                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">Клиника <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {clinics.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setForm({...form, clinic: c.id})}
                          className={`text-left p-3 rounded-xl border-2 transition-all duration-200 ${form.clinic === c.id ? 'border-brand-blue bg-brand-light' : 'border-slate-200 hover:border-brand-blue/40'}`}
                        >
                          <div className="font-semibold text-brand-dark text-sm">{c.name}</div>
                          <div className="text-xs text-brand-gray flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />{c.address.slice(0, 35)}...
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">Специальность / Услуга</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({...form, service: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-brand-dark text-sm focus:outline-none focus:border-brand-blue transition-colors"
                    >
                      <option value="">Не важно / Выберите...</option>
                      {serviceCategories.map((s) => (
                        <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!form.clinic}
                    className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Далее →
                  </button>
                </div>
              )}

              {/* Step 2: Date + Time */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-brand-dark mb-4">Выберите дату и время</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-dark mb-2">Дата <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({...form, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-brand-dark text-sm focus:outline-none focus:border-brand-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-dark mb-2">Удобное время</label>
                      <select
                        value={form.time}
                        onChange={(e) => setForm({...form, time: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-brand-dark text-sm focus:outline-none focus:border-brand-blue transition-colors"
                      >
                        <option value="">Не важно</option>
                        <option>08:00 – 10:00</option>
                        <option>10:00 – 12:00</option>
                        <option>12:00 – 14:00</option>
                        <option>14:00 – 16:00</option>
                        <option>16:00 – 18:00</option>
                        <option>18:00 – 20:00</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center py-3">← Назад</button>
                    <button type="button" onClick={() => setStep(3)} disabled={!form.date} className="btn-primary flex-1 justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed">Далее →</button>
                  </div>
                </div>
              )}

              {/* Step 3: Personal info */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-brand-dark mb-4">Ваши данные</h2>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">Ваше имя <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      placeholder="Иванова Мария Петровна"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-brand-dark text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder-slate-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">Телефон <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                      placeholder="+7 (861) 000-00-00"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-brand-dark text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder-slate-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">Комментарий</label>
                    <textarea
                      value={form.comment}
                      onChange={(e) => setForm({...form, comment: e.target.value})}
                      rows={3}
                      placeholder="Опишите симптомы или укажите предпочтительного врача..."
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-brand-dark text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder-slate-400 resize-none"
                    />
                  </div>
                  <p className="text-xs text-brand-gray">Нажимая «Записаться», вы соглашаетесь с политикой обработки персональных данных</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1 justify-center py-3">← Назад</button>
                    <button type="submit" disabled={!form.name || !form.phone} className="btn-primary flex-1 justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                      <Calendar className="w-4 h-4" />
                      Записаться
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card p-5">
              <h4 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-blue" />
                Режим работы
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-brand-gray">Пн–Пт</span><span className="font-semibold">08:00–20:00</span></div>
                <div className="flex justify-between"><span className="text-brand-gray">Суббота</span><span className="font-semibold">08:00–18:00</span></div>
                <div className="flex justify-between"><span className="text-brand-gray">Воскресенье</span><span className="font-semibold">08:00–15:00</span></div>
              </div>
            </div>
            <div className="card p-5">
              <h4 className="font-bold text-brand-dark mb-3">Позвонить напрямую</h4>
              <a href={siteData.phoneHref} className="flex items-center gap-3 p-3 bg-brand-light rounded-xl text-brand-blue font-semibold hover:bg-brand-blue hover:text-white transition-all duration-200">
                <Phone className="w-5 h-5" />
                {siteData.phone}
              </a>
              <p className="text-xs text-brand-gray mt-3">Ежедневно 07:30 – 20:00</p>
            </div>
            <div className="card p-5 bg-green-50 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-bold text-green-800 text-sm">Без очередей</span>
              </div>
              <p className="text-green-700 text-xs leading-relaxed">Точное время приёма. Вам не придётся ждать в очереди — всё строго по записи.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
