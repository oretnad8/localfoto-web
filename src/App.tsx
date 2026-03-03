import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MonitorSmartphone, Settings, Zap, Edit3,
  Music, Layers, ShieldCheck, CreditCard,
  Printer, CheckCircle2, QrCode, Usb, Bluetooth, HardDrive,
  LayoutGrid, Columns, Calendar, Scissors, Wallet,
  Phone, BookOpen, Check, Send, Building2, MapPin,
  Menu, X
} from 'lucide-react';

const THEME_COLORS: Record<string, Record<string, string>> = {
  orange: {
    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
    400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
    800: '#9a3412', 900: '#7c2d12', 950: '#431407',
  },
  blue: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
    400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
    800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
  },
  green: {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
    400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
    800: '#166534', 900: '#14532d', 950: '#052e16',
  },
  purple: {
    50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe',
    400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce',
    800: '#6b21a8', 900: '#581c87', 950: '#3b0764',
  },
  red: {
    50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
    400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
    800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a',
  }
};

const EDITORS_DATA = [
  {
    id: 'unitario',
    title: 'Unitario',
    icon: <Edit3 className="w-5 h-5" />,
    description: 'Ajustes de brillo, contraste, saturación y encuadre dinámico.',
    image: '/images/editors/unitario.jpeg'
  },
  {
    id: 'collage',
    title: 'Collage',
    icon: <LayoutGrid className="w-5 h-5" />,
    description: 'Grillas dinámicas con sistema de slots e inteligencia de colisión.',
    image: '/images/editors/collage.jpeg'
  },
  {
    id: 'strips',
    title: 'Photo Strips',
    icon: <Columns className="w-5 h-5" />,
    description: 'Tiras de 2x6" optimizadas para papel 6x8" en DNP DS620A.',
    image: '/images/editors/strips.jpeg'
  },
  {
    id: 'calendarios',
    title: 'Calendarios',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Formatos mensuales y anuales con inyección automática de feriados.',
    image: '/images/editors/calendario.jpeg'
  },
  {
    id: 'albumes',
    title: 'Álbumes Pro',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Gestión de páginas, collage y personalización total.',
    image: '/images/editors/albumes.jpeg'
  },
  {
    id: 'overlays',
    title: 'Overlays',
    icon: <Layers className="w-5 h-5" />,
    description: 'Capas PNG de diseño superior para marcos temáticos y eventos.',
    image: '/images/editors/overlays.jpeg'
  },
  {
    id: 'spotify',
    title: 'Spotify/QR',
    icon: <Music className="w-5 h-5" />,
    description: 'Placas musicales dinámicas y códigos QR con mensajes ocultos.',
    image: '/images/editors/spotify.jpeg'
  },
  {
    id: 'split',
    title: 'Photo Split',
    icon: <Scissors className="w-5 h-5" />,
    description: 'Imagen segmentada en multipaneles decorativos con cálculo de precio.',
    image: '/images/editors/split.jpeg'
  }
];
import MobileSimulationFlow from './MobileSimulationFlow';
import BrandWaves from './BrandWaves';

const App = () => {
  const [theme, setTheme] = useState('blue');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeEditor, setActiveEditor] = useState(EDITORS_DATA[0]);
  const [selectedPlan, setSelectedPlan] = useState<'Mensual' | 'Anual' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imgVariation, setImgVariation] = useState(1);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImgVariation(prev => (prev === 3 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePlanSelect = (plan: 'Mensual' | 'Anual') => {
    setSelectedPlan(plan);
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const safePalette = THEME_COLORS[theme] || THEME_COLORS['blue'];

  // Helper to get RGB from hex for transparent shadows
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const themeStyles = [
    ...Object.entries(safePalette).map(([key, value]) => `--brand-${key}: ${value};`),
    `--brand-rgb: ${hexToRgb(safePalette['500'])};`
  ].join('\n');


  return (
    <div id="top" className="min-h-screen bg-light-bg font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
        :root { ${themeStyles} }
        ::selection {
          background-color: rgba(var(--brand-rgb), 0.25);
          color: inherit;
        }
        .neon-border-selected {
          border-color: var(--brand-500) !important;
          box-shadow: 0 0 20px rgba(var(--brand-rgb), 0.4), 0 0 40px rgba(var(--brand-rgb), 0.1) !important;
          transform: translateY(-4px);
        }
        .nav-link-neon:hover {
          color: var(--brand-500) !important;
          text-shadow: 0 0 8px rgba(var(--brand-rgb), 0.6);
        }
      ` }} />
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-sm border border-gray-100">
                <img src="/favicon.ico?v=2" alt="LocalFoto Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-xl tracking-tight text-deep-800">LocalFoto</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#top" className="text-deep-500 font-medium transition-all nav-link-neon">Inicio</a>
              <a href="#whitelabel" className="text-deep-500 font-medium transition-all nav-link-neon">White Label</a>
              <a href="#features" className="text-deep-500 font-medium transition-all nav-link-neon">Editores</a>
              <a href="#dashboard" className="text-deep-500 font-medium transition-all nav-link-neon">Panel de Control</a>
              <a href="#contacto" className="text-deep-500 font-medium transition-all nav-link-neon">Precios</a>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-deep-800 p-2 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <button onClick={() => scrollToSection('top')} className="block w-full text-left px-3 py-2 text-deep-800 font-bold hover:bg-gray-50 rounded-lg">Inicio</button>
                <button onClick={() => scrollToSection('whitelabel')} className="block w-full text-left px-3 py-2 text-deep-800 font-bold hover:bg-gray-50 rounded-lg">White Label</button>
                <button onClick={() => scrollToSection('features')} className="block w-full text-left px-3 py-2 text-deep-800 font-bold hover:bg-gray-50 rounded-lg">Editores</button>
                <button onClick={() => scrollToSection('dashboard')} className="block w-full text-left px-3 py-2 text-deep-800 font-bold hover:bg-gray-50 rounded-lg">Panel de Control</button>
                <button onClick={() => scrollToSection('contacto')} className="block w-full text-left px-3 py-2 text-deep-800 font-bold hover:bg-gray-50 rounded-lg">Precios</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-0 -mb-48 overflow-hidden">
        <div className="absolute inset-x-0 top-0 bottom-0 z-0 flex justify-center">
          <img
            src="/heroBack.png"
            alt=""
            className="h-full w-auto max-w-none blur-[4px] opacity-90"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left z-10 lg:-mt-120"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Tu Kiosco Fotográfico en el <span className="gradient-text">Bolsillo del Cliente</span>
              </h1>
              <p className="text-lg md:text-xl text-white mb-6 max-w-2xl mx-auto lg:mx-0">
                Sin apps, sin cables. Escaneo de QR para acceder al Software y realizar la edición profesional instantánea.
                Optimiza tu flujo de trabajo y elimina las filas en el mostrador.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 text-sm font-medium text-deep-800">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <MonitorSmartphone className="w-4 h-4 text-primary-500" />
                  <span>PC/Kiosco Táctil</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <Phone className="w-4 h-4 text-accent-500" />
                  <span>Smartphones</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <Usb className="w-4 h-4 text-secondary-500" />
                  <span>USB/Memorias</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <Bluetooth className="w-4 h-4 text-primary-500" />
                  <span>Bluetooth</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="gradient-bg text-white px-10 py-4 rounded-xl font-bold text-xl hover:opacity-90 transition-all shadow-xl flex items-center justify-center gap-3 group overflow-hidden relative"
                  style={{ '--hover-glow': 'rgba(var(--brand-rgb), 0.5)' } as any}
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"
                    style={{ backgroundColor: 'var(--brand-500)' }}></div>

                  <Zap className="w-6 h-6 group-hover:animate-pulse" />
                  Solicitar Servicio

                  <style dangerouslySetInnerHTML={{
                    __html: `
                    .gradient-bg:hover {
                      box-shadow: 0 20px 40px -10px rgba(var(--brand-rgb), 0.5);
                      transform: translateY(-2px);
                    }
                  ` }} />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 lg:mt-0 relative"
            >
              {/* Mockup Composition */}
              <div className="relative mx-auto max-w-md lg:max-w-none flex flex-col items-center">

                {/* Phone Mockup Foreground */}
                <div className="relative z-10 mx-auto transform hover:-translate-y-2 transition-transform duration-500 -translate-x-22 lg:translate-x-0">
                  <MobileSimulationFlow />

                  {/* Theme Switcher - Centered on Mobile */}
                  <div className="flex flex-row lg:flex-col absolute -top-2 left-1/2 -translate-x-1/2 lg:left-auto lg:-right-24 lg:top-1/2 lg:-translate-y-1/2 gap-3 lg:gap-4 z-30 w-full justify-center lg:w-auto">
                    {Object.keys(THEME_COLORS).map((colorKey) => (
                      <button
                        key={colorKey}
                        onClick={() => setTheme(colorKey)}
                        title={`Cambiar a tema ${colorKey}`}
                        className={`w-10 h-10 rounded-full shadow-lg border-2 transition-all hover:scale-110 ${theme === colorKey ? 'border-deep-800 scale-110 ring-2 ring-deep-800/20' : 'border-white'}`}
                        style={{ backgroundColor: THEME_COLORS[colorKey]['500'] }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* White Label Section */}
      <section id="whitelabel" className="py-24 bg-light-bg relative scroll-mt-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 lg:p-16 border border-gray-100 overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-deep-100 rounded-full opacity-50"></div>

            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-deep-900 mb-6">Identidad White Label Absoluta</h2>
                <p className="text-lg text-deep-500 mb-6">
                  Tu negocio es el protagonista. Tras la activación por <strong className="text-deep-800">licencia (HWID)</strong>,
                  nuestro sistema muta automáticamente para heredar la identidad visual de tu local.
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center shrink-0">
                      <img src="/src/assets/tulogo.png" alt="Logo" className="w-10 h-10 grayscale opacity-80" />
                    </div>
                    <div>
                      <h4 className="font-bold text-deep-800 text-sm">Inyección de Logotipo</h4>
                      <p className="text-xs text-deep-500 mt-1">Incorporación tu Logo en interfaz de escritorio y movil.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                    <div className="w-10 h-10 gradient-bg rounded-lg shadow flex items-center justify-center shrink-0">
                      <div className="w-4 h-4 rounded-full bg-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-deep-800 text-sm">Selección de Colores</h4>
                      <p className="text-xs text-deep-500 mt-1">Personalización de colores corporativos.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                    <div className="w-10 h-10 gradient-bg rounded-lg shadow flex items-center justify-center shrink-0">
                      <span className="font-arial text-xs font-bold text-white  ">Hola!</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-deep-800 text-sm">Mensaje de Bienvenida</h4>
                      <p className="text-xs text-deep-500 mt-1">Personaliza el mensaje de bienvenida que verán tus clientes.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow flex items-center justify-center shrink-0">
                      <span className="font-mono text-xs font-bold text-deep-500">.cl</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-deep-800 text-sm">Sub-dominio Propio</h4>
                      <p className="text-xs text-deep-500 mt-1">Configuración de subdominio para mantener a tus clientes bajo tu URL.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware and Payments Info Blocks side */}
              <div className="space-y-6">

                {/* Hardware Block */}
                <div className="bg-deep-800 text-white rounded-2xl p-8 shadow-lg transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Printer className="w-5 h-5 text-primary-500" /> Compatibles con hotfolders de:
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="bg-white border border-deep-500/30 h-25 px-4 rounded-xl text-center flex items-center justify-center">
                        <img src="/fuji_logo.jpg" alt="FUJIFILM" className="max-h-25 w-auto object-contain" />
                      </div>
                      <p className="text-center text-xs text-gray-400 font-medium tracking-wide">DX100 / DE100</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="bg-white border border-deep-500/30 h-25 px-4 rounded-xl text-center flex items-center justify-center">
                        <img src="/dnp_logo.svg" alt="DNP" className="max-h-25 w-auto object-contain" />
                      </div>
                      <p className="text-center text-xs text-gray-400 font-medium tracking-wide">DS-620A / DS-820</p>
                    </div>
                  </div>
                </div>

                {/* Payments Block */}
                <div className="bg-white border-2 border-primary-100 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-deep-900 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-secondary-500" /> Flujo Híbrido de Pagos
                  </h3>
                  <p className="text-sm text-deep-500 mb-4">
                    Adaptable a las necesidades de tu mostrador. Delega el cobro o contrólalo tú mismo a traves de el sistema Validador de ordenes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 font-medium text-sm">
                    <span className="flex-1 px-5 py-3 bg-[#009ee3] text-white rounded-lg flex flex-col items-center justify-center gap-2 text-center">
                      <img src="/mp_logo.png" alt="MercadoPago" className="h-8 w-auto" />
                      MercadoPago Checkout
                    </span>
                    <span className="flex-1 px-5 py-3 gradient-bg text-white rounded-lg flex flex-col items-center justify-center gap-2 text-center">
                      <Wallet className="w-5 h-5" />
                      Pago en Caja (Efectivo/POS)
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Editor Showcase Section */}
      <section id="features" className="py-24 bg-light-bg relative overflow-hidden scroll-mt-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-deep-900 mb-6">
              Motores de <span className="gradient-text">Edición Pro</span>
            </h2>
            <p className="text-lg text-deep-600">
              Ocho editores independientes optimizados para hardware profesional, funcionando nativamente en el navegador.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Column: Editor Cards - 2 Grid columns */}
            <div className="w-full lg:w-[60%] grid md:grid-cols-2 gap-3">
              {EDITORS_DATA.map((editor) => (
                <motion.div
                  key={editor.id}
                  onHoverStart={() => setActiveEditor(editor)}
                  onClick={() => setActiveEditor(editor)}
                  className={`cursor-pointer p-4 rounded-3xl border-2 transition-all duration-300 flex items-start gap-3 group ${activeEditor.id === editor.id
                    ? 'bg-white shadow-[0_15px_30px_rgba(var(--brand-rgb),0.1)]'
                    : 'bg-white/60 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-lg'
                    }`}
                  style={activeEditor.id === editor.id ? { borderColor: 'var(--brand-600)' } : {}}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${activeEditor.id === editor.id ? 'text-white' : 'bg-gray-100 text-gray-400 group-hover:text-deep-800'
                      }`}
                    style={activeEditor.id === editor.id ? { backgroundColor: 'var(--brand-600)' } : {}}
                  >
                    {editor.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-bold transition-colors ${activeEditor.id === editor.id ? 'text-deep-900' : 'text-deep-800'
                      }`}>
                      {editor.title}
                    </h3>
                    <p className="text-xs text-deep-500 line-clamp-2 mt-0.5 transition-colors leading-snug">
                      {editor.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Sticky Mockup */}
            <div className="w-full lg:w-[40%] lg:sticky lg:top-12 lg:self-start flex flex-col items-center">
              <div className="relative w-full max-w-[255px] aspect-[9/19.5] bg-deep-900 rounded-[2rem] border-4 border-deep-800 shadow-2xl overflow-hidden p-1.5">
                {/* Screen Content */}
                <div className="w-full h-full bg-black rounded-[1.2rem] overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeEditor.id}-${imgVariation}`}
                      src={activeEditor.image.replace('.jpeg', `${imgVariation === 1 ? '' : imgVariation}.jpeg`)}
                      alt={activeEditor.title}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Gestión Centralizada y Control Operativo Section */}
      <section id="dashboard" className="py-24 bg-white relative overflow-hidden scroll-mt-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-deep-900 mb-6">
              Gestión <span className="gradient-text">Centralizada</span> y Control Operativo
            </h2>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">
              Potencia administrativa y agilidad operativa en una sola plataforma diseñada para el mundo real.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Bloque 1: Panel de Administración */}
            <div className="bg-gray-50 rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-deep-900 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Settings className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-deep-900">Panel de Administración</h3>
                  <p className="text-brand-600 font-semibold text-xs uppercase tracking-wider">Gestión Estratégica</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center text-deep-800">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-deep-900 text-sm">Control de Flujos de Trabajo</h4>
                    <p className="text-xs text-deep-600 mt-1">Habilitación instantánea del módulo de "Laboratorio Local" para órdenes externas.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center text-deep-800">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-deep-900 text-sm">Activación de Hardware Inkjet</h4>
                    <p className="text-xs text-deep-600 mt-1">Switch maestro para compatibilidad Fujifilm Inkjet en el flujo de laboratorio.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center text-deep-800">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-deep-900 text-sm">Pasarela de Pagos</h4>
                    <p className="text-xs text-deep-600 mt-1">Gestión dinámica de métodos activos (Efectivo/Caja o MercadoPago) según el día.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center text-deep-800">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-deep-900 text-sm">Gestión de Errores y Reproceso</h4>
                    <p className="text-xs text-deep-600 mt-1">Reprocesa órdenes directamente desde el panel en caso de atascos o errores de hardware.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center text-deep-800">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-deep-900 text-sm">Seguridad por Jerarquía</h4>
                    <p className="text-xs text-deep-600 mt-1">Acceso protegido por contraseña administrativa única para cada licencia.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloque 2: Dashboard del Validador */}
            <div className="bg-deep-900 rounded-[2rem] p-6 md:p-8 text-white shadow-2xl transition-all duration-500 group relative overflow-hidden"
              style={{ boxShadow: '0 25px 50px -12px rgba(var(--brand-rgb), 0.15)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full opacity-20"
                style={{ backgroundColor: 'var(--brand-500)' }}></div>

              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'var(--brand-500)', boxShadow: '0 10px 15px -3px rgba(var(--brand-rgb), 0.3)' }}>
                  <MonitorSmartphone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Dashboard del Validador</h3>
                  <p className="font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--brand-400)' }}>Operación en Mostrador</p>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"
                    style={{ color: 'var(--brand-400)' }}>
                    <Usb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Monitor de Impresoras Real-Time</h4>
                    <p className="text-xs text-gray-400 mt-1">Estatus de múltiples impresoras DNP simultáneas (Lista, Sin Papel, Error).</p>
                  </div>
                </div>

                <div className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"
                    style={{ color: 'var(--brand-400)' }}>
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Validación de Pedidos</h4>
                    <p className="text-xs text-gray-400 mt-1">Interfaz simplificada para confirmar pagos y liberar colas de impresión al instante.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"
                    style={{ color: 'var(--brand-400)' }}>
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Gestión de Almacenamiento</h4>
                    <p className="text-xs text-gray-400 mt-1">Purga automática tras 3 días, garantizando reimpresiones rápidas sin saturar el disco.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"
                    style={{ color: 'var(--brand-400)' }}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Acceso Operativo Diferenciado</h4>
                    <p className="text-xs text-gray-400 mt-1">Contraseña única para operarios, protegiendo los ajustes sensibles del negocio.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" style={{ color: 'var(--brand-500)' }} />
                </div>
                <p className="text-xs text-gray-300">
                  <strong className="text-white block mb-0.5">Tecnología de Alta Disponibilidad</strong>
                  Diseñado para operar 24/7 sin degradación de performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planes y Contacto Section */}
      <section id="contacto" className="py-24 bg-white relative overflow-hidden scroll-mt-7">
        <BrandWaves height={240} className="top-0 rotate-180 opacity-30" mirrored={true} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-deep-900 mb-6">
              ¿Listo para llevar tu Local de Impresiones al <span className="gradient-text">siguiente nivel?</span>
            </h2>
            <p className="text-lg text-deep-600 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tu volumen de trabajo. Todos nuestros planes incluyen soporte técnico especializado para tus impresoras DNP y Fujifilm.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            {/* Plan Mensual */}
            <motion.div
              whileHover={{ y: -10 }}
              className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer bg-white flex flex-col ${selectedPlan === 'Mensual' ? 'neon-border-selected' : 'border-gray-100'}`}
              style={selectedPlan === 'Mensual' ? {} : { borderColor: 'rgba(var(--brand-rgb), 0.1)' }}
              onClick={() => handlePlanSelect('Mensual')}
            >
              <h3 className="text-2xl font-bold text-deep-900 mb-2">Plan Mensual</h3>
              <p className="text-deep-500 mb-6 flex-1">Ideal para flexibilidad total. Sin compromisos a largo plazo.</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-deep-900">$XX,XXX</span>
                <span className="text-deep-500"> /mes</span>
              </div>
              <button
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${selectedPlan === 'Mensual' ? 'gradient-bg text-white shadow-lg' : 'text-deep-800'}`}
                style={selectedPlan === 'Mensual' ? {} : { backgroundColor: 'var(--brand-50)' }}
              >
                {selectedPlan === 'Mensual' && <Check className="w-5 h-5" />}
                Seleccionar Plan Mensual
              </button>
            </motion.div>

            {/* Plan Anual */}
            <motion.div
              whileHover={{ y: -10 }}
              className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer bg-white flex flex-col relative ${selectedPlan === 'Anual' ? 'neon-border-selected shadow-2xl' : 'shadow-xl'}`}
              style={selectedPlan === 'Anual' ? {} : {
                borderColor: 'rgba(var(--brand-rgb), 0.3)',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)'
              }}
              onClick={() => handlePlanSelect('Anual')}
            >
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg"
                style={{ backgroundColor: 'var(--brand-400)' }}
              >
                Popular / Mejor Valor
              </div>
              <h3 className="text-2xl font-bold text-deep-900 mb-2">Plan Anual</h3>
              <p className="text-deep-500 mb-6 flex-1">La mejor opción para laboratorios establecidos. Incluye un descuento exclusivo por pago adelantado.</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-deep-900">$XXX,XXX</span>
                <span className="text-deep-500"> /año</span>
              </div>
              <button
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-white shadow-lg ${selectedPlan === 'Anual' ? 'gradient-bg' : ''}`}
                style={selectedPlan === 'Anual' ? {} : { backgroundColor: 'var(--brand-400)' }}
              >
                {selectedPlan === 'Anual' && <Check className="w-5 h-5" />}
                Seleccionar Plan Anual
              </button>
            </motion.div>
          </div>

          <div id="contact-form" className="max-w-3xl mx-auto scroll-mt-24">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm"
                >
                  {selectedPlan && (
                    <div className="mb-8 p-4 bg-primary-500/10 border border-primary-500/20 rounded-2xl flex items-center gap-3">
                      <Zap className="w-5 h-5" style={{ color: 'var(--brand-500)' }} />
                      <p className="font-bold text-deep-900">
                        Estás solicitando información para el plan <span className="text-primary-600">{selectedPlan}</span>
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-deep-800 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-deep-400" />
                          Nombre del Local / Empresa
                        </label>
                        <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 transition-all outline-none text-deep-900" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-deep-800 flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-deep-400" />
                          Nombre de Contacto
                        </label>
                        <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 transition-all outline-none text-deep-900" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-deep-800 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-deep-400" />
                          WhatsApp / Teléfono
                        </label>
                        <input required type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 transition-all outline-none text-deep-900" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-deep-800 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-deep-400" />
                          Ciudad
                        </label>
                        <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 transition-all outline-none text-deep-900" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-deep-800 flex items-center gap-2">
                        <Printer className="w-4 h-4 text-deep-400" />
                        Modelos de impresoras actuales (DNP / Fuji DX100 / DE100)
                      </label>
                      <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 transition-all outline-none text-deep-900" placeholder="DS620, DX100, etc..." />
                    </div>

                    <button type="submit" className="w-full gradient-bg text-white py-5 rounded-2xl font-bold text-xl hover:scale-[1.02] transition-all shadow-xl shadow-primary-500/25 flex items-center justify-center gap-3">
                      <Send className="w-6 h-6" />
                      Enviar solicitud de presupuesto
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-primary-500 shadow-2xl shadow-primary-500/20"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-lg">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-deep-900 mb-4">¡Gracias!</h3>
                  <p className="text-xl text-deep-600 max-w-md mx-auto leading-relaxed">
                    Un técnico de LocalFoto se contactará contigo a la brevedad para finalizar tu configuración.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-10 text-primary-600 font-bold hover:underline"
                  >
                    Volver a los planes
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-900 py-12 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-sm">
              <img src="/favicon.ico?v=2" alt="LocalFoto Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white/90">LocalFoto</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LocalFoto Software. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
