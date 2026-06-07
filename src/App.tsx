import { useState, useEffect, FormEvent, ReactNode } from 'react';
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
  ShoppingCart,
  Zap,
  HardDrive,
  Maximize2,
} from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

interface Component {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  specs: string;
  status: string;
  description?: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

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
    { href: '#productos', label: 'Productos' },
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
    'Técnicos certificados con amplia experiencia',
    'Atención rápida y eficiente',
    'Precios competitivos y transparentes',
    'Garantía en todos nuestros servicios',
  ];

  const components: Component[] = [
    {
      id: 1,
      name: 'RAM DDR4 16GB',
      category: 'Memoria',
      price: '',
      image: 'https://m.media-amazon.com/images/I/61Iot1pLVDL._AC_UF894,1000_QL80_.jpg',
      specs: 'Velocidad 3200MHz, Compatible múltiples marcas',
      status: 'En stock',
      description: 'Módulo de memoria RAM DDR4 de 16GB con latencia baja. Perfecta para gaming y trabajo profesional. Garantía de 3 años.',
    },
    {
      id: 2,
      name: 'SSD NVMe 1TB',
      category: 'Almacenamiento',
      price: '',
      image: 'https://i.blogs.es/c4d3c2/samsung-ssd-vnand/450_1000.jpg',
      specs: 'Velocidad 3500MB/s, PCIe 4.0',
      status: 'En stock',
      description: 'Unidad de estado sólido NVMe de 1TB con velocidad ultra rápida. Ideal para mejorar el rendimiento de tu PC. Garantía de 5 años.',
    },
    {
      id: 3,
      name: 'Placa Madre B550',
      category: 'Placa Base',
      price: '',
      image: 'https://http2.mlstatic.com/D_NQ_NP_995519-MLA99961602999_112025-O.webp',
      specs: 'Socket AM4, PCIe 4.0, BIOS actualizado',
      status: 'En stock',
      description: 'Placa base AM4 con PCIe 4.0 para máximo rendimiento. Soporta procesadores Ryzen 3000 y 5000. Incluye BIOS actualizado.',
    },
    {
      id: 4,
      name: 'GPU RTX 3060 12GB',
      category: 'Gráficos',
      price: '',
      image: 'https://http2.mlstatic.com/D_NQ_NP_867602-MCO90390719454_082025-O.webp',
      specs: 'CUDA Cores: 3584, GDDR6, Ray Tracing',
      status: 'En stock',
      description: 'Tarjeta gráfica profesional RTX 3060 con 12GB VRAM. Ideal para creadores de contenido y gamers. Refrigeración avanzada.',
    },
    {
      id: 5,
      name: 'Procesador Ryzen 5 5600X',
      category: 'CPU',
      price: '',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGdtka57pjGOwXKm0xYkHHBQRA6BGP3BL9_w&s',
      specs: '6 núcleos, 12 hilos, 4.6GHz boost',
      status: 'En stock',
      description: 'Procesador AMD Ryzen 5 5600X de última generación. Excelente para gaming y multitarea. TDP: 65W.',
    },
    {
      id: 6,
      name: 'Fuente 750W 80+ Gold',
      category: 'Fuente',
      price: '',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOBgFpq1jaeyLRE95tZyGdRul-b4ExlwXNNQ&s',
      specs: '750W, Modular, Certificación 80+ Gold',
      status: 'En stock',
      description: 'Fuente de poder modular de 750W con certificación 80+ Gold. Eficiencia energética superior. Garantía de 10 años.',
    },
  ];

  const handleConsultComponent = (component: Component) => {
    setSelectedComponent(component);
  };

  const handleContactComponent = () => {
    if (selectedComponent) {
      setFormData({
        ...formData,
        message: `Consulta sobre: ${selectedComponent.name} - $${selectedComponent.price}. ${selectedComponent.description}`,
      });
      setSelectedComponent(null);
      // Scroll to contact form
      setTimeout(() => {
        const contactSection = document.getElementById('contacto');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Product Modal */}
      {selectedComponent && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-backdrop-enter"
          onClick={() => setSelectedComponent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden animate-modal-enter shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-72 overflow-hidden bg-gradient-navy group">
              <img
                src={selectedComponent.image}
                alt={selectedComponent.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedComponent(null)}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-2.5 transition-all duration-300 hover:scale-110 border border-white/20 z-10"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category & Status */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                <div>
                  <span className="inline-block bg-cyan/20 backdrop-blur-sm text-cyan px-3 py-1 rounded-full text-xs font-semibold border border-cyan/30 mb-2">
                    {selectedComponent.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{selectedComponent.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm font-medium">{selectedComponent.status}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">{selectedComponent.description}</p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan" />
                  <span className="text-sm text-gray-700">{selectedComponent.specs}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-cyan" />
                  <span className="text-sm text-gray-700">Alta calidad</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan" />
                  <span className="text-sm text-gray-700">Garantía oficial</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan" />
                  <span className="text-sm text-gray-700">Soporte técnico</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-6 p-4 bg-cyan/5 rounded-xl border border-cyan/20">
                <div>
                  
                  <span className="block text-3xl font-bold text-gradient">{selectedComponent.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">IVA incluido</span>
                  <span className="block text-sm text-gray-600">Envío disponible</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-navy font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cerrar
                </button>
                <button
                  onClick={handleContactComponent}
                  className="flex-2 btn-primary flex-1 hover:scale-[1.02] transition-transform"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Consultar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                Mantenimiento Profesional para tus{' '}
                <span className="text-gradient">Equipos de Cómputo e Impresoras</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
                Servicios preventivos y correctivos especializados. También comercializamos componentes de calidad para mantener tu tecnología funcionando al máximo rendimiento.
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

        {/* Components Section */}
        <section id="productos" className="py-20 md:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-title">Componentes Premium Disponibles</h2>
              <p className="section-subtitle">
                Piezas certificadas de las mejores marcas. Todos los componentes incluyen garantía.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {components.map((component, index) => (
                <div
                  key={component.id}
                  className="card-product group rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-cyan/20 hover:-translate-y-2 bg-white border border-gray-100 hover:border-cyan/50 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleConsultComponent(component)}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gradient-navy">
                    <div className="absolute inset-0 bg-cyan/0 group-hover:bg-cyan/10 transition-colors duration-300 z-10" />
                    <img
                      src={component.image}
                      alt={component.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-cyan/50 rounded-full animate-ping" />
                        <span className="relative bg-cyan text-navy px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          {component.status}
                        </span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="bg-navy/80 backdrop-blur-sm text-cyan px-3 py-1 rounded-full text-xs font-semibold">
                        {component.category}
                      </span>
                    </div>

                    {/* View Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    {/* Decorative line animation */}
                    <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan to-cyan-400 group-hover:w-full transition-all duration-500" />

                    <h3 className="text-xl font-bold text-navy mt-2 mb-3 group-hover:text-cyan transition-colors duration-300">
                      {component.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{component.specs}</p>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                          
                        <span className="block text-2xl font-bold text-gradient">{component.price}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConsultComponent(component);
                        }}
                        className="bg-navy text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:bg-cyan hover:text-navy hover:scale-105 hover:shadow-lg hover:shadow-cyan/30 flex items-center gap-2 group/btn"
                      >
                        <ShoppingCart className="w-4 h-4 group-hover/btn:animate-bounce" />
                        Consultar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <p className="text-gray-600 text-lg mb-6">
                ¿Necesitas otro componente? Contáctanos para disponibilidad y precios especiales.
              </p>
              <a href="#contacto" className="btn-primary inline-flex">
                Solicitar Presupuesto
                <ChevronRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="nosotros" className="py-20 md:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-cyan font-semibold uppercase tracking-wider text-sm">
                  ¿Por qué elegirnos?
                </span>
                <h2 className="section-title mt-3 text-left">
                  Expertos en tecnología y soluciones integrales
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  En TecniDigital nos dedicamos a brindar soluciones técnicas de alta calidad para empresas y particulares. Contamos con técnicos especializados, componentes certificados y equipamiento profesional para garantizar el mejor rendimiento de tus equipos.
                </p>

                <div className="mt-8 space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-cyan/5 border-l-4 border-cyan rounded-lg">
                  <p className="text-gray-700 font-medium">
                    Todos nuestros componentes vienen con garantía y soporte técnico incluido.
                  </p>
                </div>

                <a href="#contacto" className="btn-primary mt-10 inline-flex">
                  Solicitar Servicio
                  <ChevronRight className="ml-2 w-4 h-4" />
                </a>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-cyan/5 rounded-2xl" />
                  <div className="relative bg-gradient-to-br from-navy to-navy-800 rounded-2xl p-8 md:p-12">
                    <div className="space-y-8">
                      <div className="border-b border-cyan/20 pb-6">
                        <div className="text-5xl font-bold text-cyan mb-2">10+</div>
                        <div className="text-gray-400 text-lg">Años de experiencia</div>
                      </div>
                      <div className="border-b border-cyan/20 pb-6">
                        <div className="text-5xl font-bold text-cyan mb-2">500+</div>
                        <div className="text-gray-400 text-lg">Clientes satisfechos</div>
                      </div>
                      <div className="border-b border-cyan/20 pb-6">
                        <div className="text-5xl font-bold text-cyan mb-2">1000+</div>
                        <div className="text-gray-400 text-lg">Equipos reparados</div>
                      </div>
                      <div>
                        <div className="text-5xl font-bold text-cyan mb-2">24h</div>
                        <div className="text-gray-400 text-lg">Respuesta garantizada</div>
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
              © {new Date().getFullYear()} TecniDigital. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
