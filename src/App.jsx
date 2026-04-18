import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DoctorsPage from './pages/DoctorsPage'
import DoctorProfilePage from './pages/DoctorProfilePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import AboutPage from './pages/AboutPage'
import ContactsPage from './pages/ContactsPage'
import PricesPage from './pages/PricesPage'
import PromotionsPage from './pages/PromotionsPage'
import BookingPage from './pages/BookingPage'

function ScrollToTop() {
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vrachi" element={<DoctorsPage />} />
            <Route path="/vrachi/:slug" element={<DoctorProfilePage />} />
            <Route path="/uslugi" element={<ServicesPage />} />
            <Route path="/uslugi/:slug" element={<ServiceDetailPage />} />
            <Route path="/o-klinike" element={<AboutPage />} />
            <Route path="/adresa" element={<ContactsPage />} />
            <Route path="/ceny" element={<PricesPage />} />
            <Route path="/akcii" element={<PromotionsPage />} />
            <Route path="/zapis" element={<BookingPage />} />
            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center pt-20">
      <div className="text-center px-4">
        <div className="text-8xl font-extrabold text-brand-blue/10 mb-4">404</div>
        <h1 className="text-3xl font-extrabold text-brand-dark mb-3">Страница не найдена</h1>
        <p className="text-brand-gray mb-6 max-w-md mx-auto">Возможно, страница была удалена или перемещена. Вернитесь на главную.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/" className="btn-primary">На главную</a>
          <a href="/vrachi" className="btn-secondary">Найти врача</a>
        </div>
      </div>
    </div>
  )
}
