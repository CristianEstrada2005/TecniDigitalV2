import { useState, useEffect, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Menu,
  X,
  Wrench,
  Settings,
  Printer,
  Cpu,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Send,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (!supabase) {
      // Simulación en local si no hay Supabase configurado
      setTimeout(() => {
        setSubmitStatus('success');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
      return;
    }

    try {
      const { error } = await supabase.from('contacts').insert([formData]);
      if (error) throw error;
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const services = [
    {
      icon: Wrench,
      title: 'Mantenimiento Preventivo',
      description: 'Revisiones programadas para evitar fallas y prolongar la vida útil de tus equipos.',
    },
    {
      icon: Settings,
      title: 'Mantenimiento Correctivo',
      description: 'Diagnóstico y reparación de fallas existentes con repuestos de calidad.',
    },
    {
      icon: Printer,
      title: 'Servicio de Impresoras',
      description: 'Mantenimiento completo para impresoras láser e inyección de tinta.',
    },
    {
      icon: Cpu,
      title: 'Venta de Componentes',
      description: 'Comercialización de piezas y accesorios para equipos de cómputo.',
    },
  ];

  const features = [
    'Técnicos especialistas con experiencia real en laboratorio',
    'Diagnósticos claros, realistas y sin cargos ocultos',
    'Componentes originales y piezas de reemplazo garantizadas',
    'Garantía real por escrito en cada intervención técnica',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#inicio" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-cyan rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-navy font-bold text-lg">TD</span>
              </div>
              <span className="text-white font-bold text-xl">
                Tecni<span className="text-cyan">Digital</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link font-medium">
                  {link.label}
                </a>
              ))}
              <a href="#contacto" className="btn-primary text-sm">
                Contactar
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menú"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-navy/95 backdrop-blur-md rounded-lg mt-2 p-4 animate-fade-in">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-gray-300 hover:text-cyan transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#contacto" className="btn-primary w-full mt-4 text-sm" onClick={() => setIsMenuOpen(false)}>
                Contactar
              </a>
            </div>
          )}
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="inicio"
          className="relative min-h-screen flex items-center bg-gradient-navy overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-10 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan/3 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan/5 rounded-full" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight opacity-0 animate-fade-in-up">
                Mantenimiento de Alto Nivel para tu{' '}
                <span className="text-gradient">Infraestructura Tecnológica</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
                Somos una propuesta nueva impulsada por técnicos con amplia experiencia real en laboratorios de hardware. Diagnósticos transparentes, repuestos originales y soporte de confianza a tu alcance.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animate-delay-400">
                <a href="#servicios" className="btn-primary group">
                  Ver Servicios
                  <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#contacto" className="btn-secondary">
                  Contáctanos
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-cyan/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-cyan rounded-full" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-20 md:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-title">Nuestros Servicios</h2>
              <p className="section-subtitle">
                Soluciones completas para mantener tu tecnología en óptimas condiciones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="card-service group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-cyan/10 rounded-xl flex items-center justify-center mb-5 transition-colors group-hover:bg-cyan/20">
                    <service.icon className="w-7 h-7 text-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - CON TARJETAS REALISTAS CORREGIDAS EN TU PROPIO TEMA OSCURO */}
        <section id="nosotros" className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Información Escrita Izquierda */}
              <div className="order-2 lg:order-1">
                <span className="text-cyan font-semibold uppercase tracking-wider text-sm">
                  Trayectoria y Transparencia
                </span>
                <h2 className="section-title mt-3 text-left">
                  Una marca joven construida por manos expertas
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  En TecniDigital no ocultamos que somos un emprendimiento que está emergiendo. Creemos que la honestidad es la base de todo soporte técnico. Aunque nuestro nombre comercial es nuevo, nuestro equipo técnico acumula años de experiencia resolviendo problemas críticos de hardware y software en laboratorios avanzados.
                </p>

                <div className="mt-8 space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <a href="#contacto" className="btn-primary mt-10 inline-flex">
                  Solicitar Servicio
                  <ChevronRight className="ml-2 w-4 h-4" />
                </a>
              </div>

              {/* Bloque Derecho - Cuadrícula con Datos Reales usando el Tema Original de Bolt */}
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-cyan/5 rounded-2xl" />
                  {/* bg-navy es tu clase original, esto asegura que el fondo azul oscuro aparezca */}
                  <div className="relative bg-navy rounded-2xl p-8 md:p-12 shadow-xl">
                    <div className="grid grid-cols-2 gap-6">
                      
                      <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-cyan">90 Días</div>
                        <div className="text-gray-400 mt-2 text-sm">Garantía real por escrito</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-cyan">100%</div>
                        <div className="text-gray-400 mt-2 text-sm">Transparencia técnica</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-cyan">95%</div>
                        <div className="text-gray-400 mt-2 text-sm">Éxito en diagnóstico</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-cyan">24h</div>
                        <div className="text-gray-400 mt-2 text-sm">Dictamen rápido</div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-20 md:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-title">Contáctanos</h2>
              <p className="section-subtitle">
                Estamos listos para ayudarte. Envíanos un mensaje y te responderemos pronto.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-navy font-medium mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-navy font-medium mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-navy font-medium mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-field min-h-[140px] resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg animate-fade-in">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>¡Mensaje enviado correctamente! Te contactaremos pronto.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg animate-fade-in">
                      <X className="w-5 h-5" />
                      <span>Ocurrió un error. Por favor intenta nuevamente.</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy text-lg">Teléfono</h3>
                      <p className="text-gray-600 mt-1">+57 322-8135582</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy text-lg">Email</h3>
                      <p className="text-gray-600 mt-1">tecnidigital@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy text-lg">Ubicación</h3>
                      <p className="text-gray-600 mt-1">Servicio a domicilio disponible</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-navy rounded-xl">
                  <h3 className="text-white font-semibold text-lg mb-2">Horario de atención</h3>
                  <p className="text-gray-400">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-400 mt-1">Sábados: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan rounded-lg flex items-center justify-center">
                <span className="text-navy font-bold text-sm">TD</span>
              </div>
              <span className="text-white font-bold text-lg">
                Tecni<span className="text-cyan">Digital</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#inicio" className="text-gray-400 hover:text-cyan transition-colors">
                Inicio
              </a>
              <a href="#servicios" className="text-gray-400 hover:text-cyan transition-colors">
                Servicios
              </a>
              <a href="#nosotros" className="text-gray-400 hover:text-cyan transition-colors">
                Nosotros
              </a>
              <a href="#contacto" className="text-gray-400 hover:text-cyan transition-colors">
                Contacto
              </a>
            </div>

            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TecniDigital. Todo el respaldo de la experiencia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;